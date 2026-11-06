import { useState } from 'react'

interface PipelineNode {
  id: string
  label: string
  sublabel: string
  tech: string
  badge: string
  status: string
  details: {
    command: string
    metric: string
    description: string
    portOrPath: string
  }
}

const pipelineNodes: PipelineNode[] = [
  {
    id: 'git',
    label: 'Git Push',
    sublabel: 'Commit & Push',
    tech: 'GitHub',
    badge: 'main: a4f8e1',
    status: 'Clean',
    details: {
      command: 'git push origin main',
      metric: 'SHA: a4f8e1c · 1 commit',
      description: 'Webhook trigger sends commit payload to GitHub Actions runner.',
      portOrPath: 'refs/heads/main',
    },
  },
  {
    id: 'ci',
    label: 'CI Gates & Tests',
    sublabel: 'xUnit Test Validation',
    tech: 'GitHub Actions',
    badge: '14/14 Passed',
    status: 'Verified',
    details: {
      command: 'dotnet test --no-build -c Release',
      metric: '100% tests green · 1.4s',
      description: 'Automated fail-safe test gate verifies controllers, logic & EF Core fallback before AWS deployment.',
      portOrPath: '.github/workflows/deploy.yml',
    },
  },
  {
    id: 'systemd',
    label: 'AWS EC2 & systemd',
    sublabel: 'Native Kestrel Daemon',
    tech: 'Ubuntu 24.04 LTS',
    badge: 'dotnetapp.service',
    status: 'Active',
    details: {
      command: 'sudo systemctl restart dotnetapp.service',
      metric: 'Uptime: 99.98% · PID: 4912',
      description: 'Native Linux systemd supervisor auto-restarts Kestrel on failure with zero-container overhead.',
      portOrPath: '/etc/systemd/system/dotnetapp.service',
    },
  },
  {
    id: 'nginx',
    label: 'Nginx Gateway',
    sublabel: 'High-Throughput Proxy',
    tech: 'Nginx 1.24',
    badge: 'Port 80/443 → 5000',
    status: '200 OK',
    details: {
      command: 'curl -I https://api.production/health',
      metric: 'Response: 22ms · HTTP 200',
      description: 'SSL termination, client header forwarding, and reverse proxying to Kestrel localhost:5000.',
      portOrPath: '/etc/nginx/sites-available/dotnetapp',
    },
  },
  {
    id: 'db',
    label: 'Pomelo & MySQL',
    sublabel: 'Isolated POSIX 600 Secrets',
    tech: 'MySQL 8.0',
    badge: 'chmod 600',
    status: 'Secured',
    details: {
      command: 'cat /etc/dotnetapp.env (root/www-data only)',
      metric: 'Zero creds in git · AES-256',
      description: 'Production DB credentials injected dynamically at host level, locked to unprivileged service account.',
      portOrPath: '/etc/dotnetapp.env',
    },
  },
]

export default function InteractivePipeline() {
  const [activeNodeId, setActiveNodeId] = useState<string>('systemd')
  const [isSimulating, setIsSimulating] = useState(false)
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null)
  const [simMessage, setSimMessage] = useState<string>('System Live · Telemetry Stream Operational')

  const activeNode = pipelineNodes.find((n) => n.id === activeNodeId) || pipelineNodes[2]

  const runSimulation = () => {
    if (isSimulating) return
    setIsSimulating(true)
    setActiveStepIndex(0)
    setSimMessage('1/5 Triggering commit hook & GitHub Actions runner...')

    const steps = [
      { index: 0, msg: '1/5 Triggering commit hook & GitHub Actions runner...', id: 'git' },
      { index: 1, msg: '2/5 Executing xUnit automated fail-safe CI gates (14/14 tests green)...', id: 'ci' },
      { index: 2, msg: '3/5 Connecting to AWS EC2: Reloading systemd dotnetapp.service...', id: 'systemd' },
      { index: 3, msg: '4/5 Nginx reverse proxy routing validated: HTTP 200 (22ms latency)...', id: 'nginx' },
      { index: 4, msg: '5/5 Isolated secret handshake verified. MySQL 8.0 pool healthy!', id: 'db' },
    ]

    steps.forEach((step, i) => {
      setTimeout(() => {
        setActiveStepIndex(step.index)
        setActiveNodeId(step.id)
        setSimMessage(step.msg)
      }, i * 900)
    })

    setTimeout(() => {
      setIsSimulating(false)
      setActiveStepIndex(null)
      setSimMessage('✓ Deployment Sequence Passed · Zero Downtime Achieved')
    }, steps.length * 900 + 400)
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-panel p-5 shadow-2xl transition-all duration-300 sm:p-6">
      {/* Top Header Bar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-xs font-semibold tracking-wider uppercase text-mut">
            Live Cloud Architecture & CI/CD
          </span>
        </div>

        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold transition-all ${
            isSimulating
              ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 cursor-wait'
              : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:border-emerald-500 hover:bg-emerald-500/20 active:scale-95 shadow-sm'
          }`}
        >
          <span className={isSimulating ? 'animate-spin' : ''}>{isSimulating ? '⟳' : '▶'}</span>
          {isSimulating ? 'Simulating Release...' : 'Simulate Pipeline Run'}
        </button>
      </div>

      {/* Real-time Status Banner */}
      <div className="mb-5 flex items-center justify-between rounded-lg border border-line/60 bg-panel-2/70 px-3.5 py-2 font-mono text-xs">
        <div className="flex items-center gap-2 text-mut truncate">
          <span className="text-emerald-400 font-bold">➜</span>
          <span className="truncate text-fg/90">{simMessage}</span>
        </div>
        <span className="hidden sm:inline-block rounded bg-panel px-2 py-0.5 text-[11px] font-medium text-emerald-400 border border-emerald-500/20 shrink-0">
          AWS EC2 · .NET 8
        </span>
      </div>

      {/* Nodes Flow - Desktop Horizontal / Mobile Vertical */}
      <div className="relative mb-5 grid grid-cols-1 gap-2.5 sm:grid-cols-5 sm:gap-2">
        {pipelineNodes.map((node, index) => {
          const isSelected = activeNode.id === node.id
          const isCurrentSimStep = activeStepIndex === index

          return (
            <button
              key={node.id}
              onClick={() => setActiveNodeId(node.id)}
              className={`group relative flex flex-col items-start rounded-xl border p-3 text-left transition-all duration-200 ${
                isCurrentSimStep
                  ? 'border-emerald-400 bg-emerald-950/30 ring-2 ring-emerald-500/30 scale-[1.02]'
                  : isSelected
                    ? 'border-cyan-500/80 bg-panel-2 shadow-md'
                    : 'border-line bg-panel hover:border-slate-700 hover:bg-panel-2/50'
              }`}
            >
              {/* Step indicator */}
              <div className="mb-2 flex w-full items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-mut">0{index + 1}</span>
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${
                    isCurrentSimStep
                      ? 'bg-emerald-400 animate-ping'
                      : isSelected
                        ? 'bg-cyan-400'
                        : 'bg-mut/40'
                  }`}
                />
              </div>

              {/* Node Title */}
              <div className="font-bold text-xs text-fg group-hover:text-cyan-400 transition-colors">
                {node.label}
              </div>
              <div className="mt-0.5 font-mono text-[11px] text-mut truncate max-w-full">
                {node.tech}
              </div>

              {/* Status Badge */}
              <div className="mt-2.5 w-full rounded bg-panel-2/90 px-1.5 py-0.5 font-mono text-[10px] font-medium text-emerald-400 border border-emerald-500/10 truncate">
                {node.badge}
              </div>
            </button>
          )
        })}
      </div>

      {/* Telemetry Inspector Drawer */}
      <div className="rounded-xl border border-line bg-panel-2 p-4 transition-all">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="rounded bg-cyan-500/10 px-2 py-0.5 font-mono text-xs font-semibold text-cyan-400 border border-cyan-500/20">
              Stage Telemetry
            </span>
            <span className="font-mono text-xs font-bold text-fg">{activeNode.label}</span>
          </div>
          <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {activeNode.details.metric}
          </span>
        </div>

        <p className="mt-2.5 text-xs text-mut leading-relaxed">
          {activeNode.details.description}
        </p>

        {/* Command Box */}
        <div className="mt-3 flex items-center justify-between rounded-lg border border-line/80 bg-ink px-3 py-2 font-mono text-xs text-fg">
          <span className="truncate text-slate-300">
            <span className="text-emerald-400 font-bold">$ </span>
            {activeNode.details.command}
          </span>
          <span className="hidden sm:inline-block text-[11px] text-mut shrink-0 ml-2">
            {activeNode.details.portOrPath}
          </span>
        </div>

        {/* Deep Dive Link to DevOps Section */}
        <div className="mt-3 flex items-center justify-end">
          <a
            href="#devops"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Inspect Full Pipeline Specs</span>
            <span>↓</span>
          </a>
        </div>
      </div>
    </div>
  )
}
