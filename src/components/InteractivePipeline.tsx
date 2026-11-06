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
      metric: 'SHA: a4f8e1 · 1 commit',
      description: 'Webhook trigger sends commit payload to GitHub Actions runner.',
      portOrPath: 'refs/heads/main',
    },
  },
  {
    id: 'ci',
    label: 'CI Gates',
    sublabel: 'xUnit Tests',
    tech: 'GitHub Actions',
    badge: '14/14 Pass',
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
    label: 'AWS EC2',
    sublabel: 'Native Kestrel',
    tech: 'systemd service',
    badge: 'dotnetapp:5000',
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
    label: 'Nginx Proxy',
    sublabel: 'Gateway Route',
    tech: 'Reverse Proxy',
    badge: ':80/443 Proxy',
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
    label: 'Pomelo & DB',
    sublabel: 'Host Isolated',
    tech: 'MySQL 8.0',
    badge: 'POSIX 600',
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
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50 transition-all duration-300 sm:p-6 dark:border-line dark:bg-panel dark:shadow-2xl">
      {/* Top Header Bar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-line">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600 dark:bg-emerald-500" />
          </span>
          <span className="font-mono text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-mut">
            Live Cloud Architecture & CI/CD
          </span>
        </div>

        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold transition-all ${
            isSimulating
              ? 'border-emerald-500/50 bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 cursor-wait'
              : 'border-emerald-600/30 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-600 active:scale-95 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:border-emerald-500 dark:hover:bg-emerald-500/20'
          }`}
        >
          <span className={isSimulating ? 'animate-spin' : ''}>{isSimulating ? '⟳' : '▶'}</span>
          {isSimulating ? 'Simulating Release...' : 'Simulate Pipeline Run'}
        </button>
      </div>

      {/* Real-time Status Banner */}
      <div className="mb-5 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 font-mono text-xs dark:border-line/60 dark:bg-panel-2/70">
        <div className="flex items-center gap-2 truncate text-slate-700 dark:text-mut">
          <span className="font-bold text-emerald-600 dark:text-emerald-400">➜</span>
          <span className="truncate font-medium text-slate-900 dark:text-fg/90">{simMessage}</span>
        </div>
        <span className="hidden sm:inline-block rounded border border-emerald-600/20 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 shrink-0 dark:border-emerald-500/20 dark:bg-panel dark:text-emerald-400">
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
              className={`group relative flex flex-col items-start rounded-xl border p-2 sm:p-2 text-left transition-all duration-200 ${
                isCurrentSimStep
                  ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/30 scale-[1.02] dark:border-emerald-400 dark:bg-emerald-950/30'
                  : isSelected
                    ? 'border-sky-500 bg-sky-50/70 shadow-md ring-1 ring-sky-500/30 dark:border-cyan-500/80 dark:bg-panel-2 dark:ring-0'
                    : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 shadow-xs dark:border-line dark:bg-panel dark:hover:border-slate-700 dark:hover:bg-panel-2/50 dark:shadow-none'
              }`}
            >
              {/* Step indicator */}
              <div className="mb-1.5 flex w-full items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-slate-500 dark:text-mut">0{index + 1}</span>
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${
                    isCurrentSimStep
                      ? 'bg-emerald-500 animate-ping'
                      : isSelected
                        ? 'bg-sky-500 dark:bg-cyan-400'
                        : 'bg-slate-300 dark:bg-mut/40'
                  }`}
                />
              </div>

              {/* Node Title */}
              <div className="font-bold text-xs text-slate-900 group-hover:text-sky-600 dark:text-fg dark:group-hover:text-cyan-400 transition-colors leading-tight">
                {node.label}
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-slate-500 dark:text-mut truncate max-w-full">
                {node.tech}
              </div>

              {/* Status Badge */}
              <div className="mt-2 w-full rounded border border-emerald-200 bg-emerald-50 px-1 py-0.5 font-mono text-[9px] font-semibold text-emerald-800 text-center tracking-tight truncate dark:border-emerald-500/10 dark:bg-panel-2/90 dark:text-emerald-400">
                {node.badge}
              </div>
            </button>
          )
        })}
      </div>

      {/* Telemetry Inspector Drawer */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all shadow-xs dark:border-line dark:bg-panel-2 dark:shadow-none">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 dark:border-line/60">
          <div className="flex items-center gap-2">
            <span className="rounded border border-sky-300 bg-sky-100 px-2 py-0.5 font-mono text-xs font-semibold text-sky-800 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-400">
              Stage Telemetry
            </span>
            <span className="font-mono text-xs font-bold text-slate-900 dark:text-fg">{activeNode.label}</span>
          </div>
          <span className="rounded border border-emerald-300 bg-emerald-100 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
            {activeNode.details.metric}
          </span>
        </div>

        <p className="mt-2.5 text-xs text-slate-600 leading-relaxed dark:text-mut">
          {activeNode.details.description}
        </p>

        {/* Authentic Dark Terminal Command Box (high contrast in both modes) */}
        <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2.5 font-mono text-xs text-slate-100 shadow-inner">
          <span className="truncate text-slate-200">
            <span className="font-bold text-emerald-400">$ </span>
            {activeNode.details.command}
          </span>
          <span className="hidden sm:inline-block text-[11px] text-slate-400 shrink-0 ml-2">
            {activeNode.details.portOrPath}
          </span>
        </div>

        {/* Deep Dive Link to DevOps Section */}
        <div className="mt-3 flex items-center justify-end">
          <a
            href="#devops"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            <span>Inspect Full Pipeline Specs</span>
            <span>↓</span>
          </a>
        </div>
      </div>
    </div>
  )
}
