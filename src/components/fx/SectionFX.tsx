import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export type FXVariant = 'network' | 'wave' // extend as you add scenes

type SceneProps = { colors: string[]; isDark: boolean }

function useIsDark() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    const observer = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains('dark')),
    )
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])
  return dark
}

const rand = (spread: number) => (Math.random() - 0.5) * spread

/* plexus network: drifting nodes, edges between close pairs */
function Network({ colors }: SceneProps) {
  const N = 80
  const group = useRef<THREE.Group>(null)
  const points = useRef<THREE.Points>(null)
  const lines = useRef<THREE.LineSegments>(null)
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(N * 3)
    const velocities = new Float32Array(N * 3)
    for (let i = 0; i < N * 3; i += 3) {
      positions[i] = rand(13)
      positions[i + 1] = rand(7)
      positions[i + 2] = rand(4)
      velocities[i] = rand(0.02)
      velocities[i + 1] = rand(0.02)
      velocities[i + 2] = rand(0.01)
    }
    return { positions, velocities }
  }, [])
  const linePositions = useMemo(() => new Float32Array(N * N * 3), [])

  useFrame(() => {
    const bounds = [6.5, 3.5, 2]
    for (let i = 0; i < N * 3; i += 3) {
      for (let a = 0; a < 3; a++) {
        positions[i + a] += velocities[i + a]
        if (Math.abs(positions[i + a]) > bounds[a]) velocities[i + a] *= -1
      }
    }
    let k = 0
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        if (dx * dx + dy * dy + dz * dz < 4.4) {
          linePositions.set(positions.subarray(i * 3, i * 3 + 3), k)
          linePositions.set(positions.subarray(j * 3, j * 3 + 3), k + 3)
          k += 6
        }
      }
    }
    if (points.current) points.current.geometry.attributes.position.needsUpdate = true
    if (lines.current) {
      lines.current.geometry.setDrawRange(0, k / 3)
      lines.current.geometry.attributes.position.needsUpdate = true
    }
    if (group.current) group.current.rotation.y += 0.0007
  })

  return (
    <group ref={group}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.07} color={colors[1]} transparent opacity={0.85} sizeAttenuation />
      </points>
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={colors[0]} transparent opacity={0.22} />
      </lineSegments>
    </group>
  )
}

/* rippling signal wave of points */
function Wave({ colors }: SceneProps) {
  const points = useRef<THREE.Points>(null)
  const { positions, cols, rows } = useMemo(() => {
    const cols = 48,
      rows = 16
    const positions = new Float32Array(cols * rows * 3)
    let k = 0
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        positions[k++] = (i / (cols - 1) - 0.5) * 18
        positions[k++] = (j / (rows - 1) - 0.5) * 7
        positions[k++] = 0
      }
    }
    return { positions, cols, rows }
  }, [])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    let k = 0
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = positions[k],
          y = positions[k + 1]
        positions[k + 2] = Math.sin(x * 0.6 + t * 1.3) * 0.4 + Math.cos(y * 1.1 + t * 0.9) * 0.25
        k += 3
      }
    }
    if (points.current) points.current.geometry.attributes.position.needsUpdate = true
  })
  return (
    <points ref={points} rotation={[-0.3, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color={colors[1]} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

const scenes: Record<FXVariant, (props: SceneProps) => React.JSX.Element> = {
  network: Network,
  wave: Wave,
}

export default function SectionFX({ variant }: { variant: FXVariant }) {
  const dark = useIsDark()
  const colors = useMemo(
    () => (dark ? ['#818cf8', '#c084fc', '#f472b6'] : ['#6366f1', '#9333ea', '#db2777']),
    [dark],
  )
  const Scene = scenes[variant]
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene colors={colors} isDark={dark} />
    </Canvas>
  )
}
