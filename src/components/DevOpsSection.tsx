import { useState } from 'react'
import Section from './Section'
import { cardGlow } from '../hooks/usePointerGlow'

interface PipelineStep {
  id: string
  name: string
  tool: string
  status: 'passed' | 'running' | 'queued'
  duration: string
  details: string
  logs: string[]
}

interface InfraNode {
  id: string
  name: string
  category: 'Cloud Infrastructure' | 'CI/CD & Repository' | 'Container & Runtime' | 'Monitoring & OS'
  icon: string
  provider: 'AWS' | 'Azure' | 'Docker/K8s' | 'Linux'
  description: string
  metrics: string
  tags: string[]
}

const pipelineSteps: PipelineStep[] = [
  {
    id: 'source',
    name: 'Code & Version Control',
    tool: 'Git / GitHub / Azure Repos',
    status: 'passed',
    duration: '0.4s',
    details: 'Triggered on git push `main`. Automated commit linting & security secrets scanning active.',
    logs: [
      '$ git log -1 --stat',
      'commit e4f89a2 (head -> main, origin/main)',
      'Author: S. M. Marzanul Hoque <marzanulhoque.cseru@gmail.com>',
      'Secrets Scan: 0 leaks detected via gitleaks',
      'Status: Code repository verified'
    ]
  },
  {
    id: 'build',
    name: 'Build & Unit Testing',
    tool: 'DotNet CLI & Scriban / xUnit',
    status: 'passed',
    duration: '14.2s',
    details: 'Scaffold validation & dotnet build -c Release. Running unit & NetArchTest architecture constraints.',
    logs: [
      '$ dotnet test --configuration Release --logger "console;verbosity=detailed"',
      'Determining projects to restore...',
      'Passed! - Failed: 0, Passed: 42, Skipped: 0, Total: 42',
      'NetArchTest Architecture Rule Verification: 100% compliant',
      'Build succeeded in 14.2s'
    ]
  },
  {
    id: 'container',
    name: 'Containerization & Image Packaging',
    tool: 'Docker, Compose & GHCR',
    status: 'passed',
    duration: '22.8s',
    details: 'Multi-stage Docker build for Frontend & Node REST API, pushed to GitHub Container Registry (GHCR).',
    logs: [
      '$ docker compose build --parallel',
      '[frontend] Building static SPA web layer... Done',
      '[backend]  Building Node.js Express REST API... Done',
      '$ docker push ghcr.io/marzanulhoque/docker-multi-tier-ecommerce/backend:latest',
      'Pushed 4 service containers to GHCR with zero vulnerabilities.'
    ]
  },
  {
    id: 'orchestration',
    name: 'Service Health & Microservices',
    tool: 'Nginx Proxy & Postgres Healthcheck',
    status: 'passed',
    duration: '8.5s',
    details: 'Internal bridge network `app-network` with `service_healthy` dependent startup constraints.',
    logs: [
      '$ docker compose up -d',
      'Creating network "app-network" with driver "bridge"',
      'Creating volume "pg_data" with local driver',
      'Container postgres-db  Healthy (pg_isready -U app_user)',
      'Container backend-api  Started (depends_on: postgres:healthy)',
      'Container nginx-proxy  Started (Port 80:80)'
    ]
  },
  {
    id: 'cloud',
    name: 'AWS EC2 & SSM Secret Provisioning',
    tool: 'AWS EC2, SSM & IMDSv2',
    status: 'passed',
    duration: '6.1s',
    details: 'Idempotent shell deployment script (`deploy-ec2.sh`) pulling secrets from AWS SSM Parameter Store.',
    logs: [
      '$ ./deploy-ec2.sh',
      '[INFO] Auto-detected AWS Region via IMDSv2 metadata token...',
      '[INFO] Retrieved /prod/ecommerce/db_password securely into host memory',
      '[INFO] Application stack healthy at http://ec2-instance-ip/',
      'Deployment successfully completed in 37.4s'
    ]
  }
]

const infraNodes: InfraNode[] = [
  {
    id: 'aws-ec2',
    name: 'AWS EC2 & Elastic Beanstalk',
    category: 'Cloud Infrastructure',
    icon: '☁️',
    provider: 'AWS',
    description: 'High-availability compute instances hosting ASP.NET Core & Node services behind auto-scaling groups.',
    metrics: '99.9% Uptime',
    tags: ['Auto Scaling', 'VPC', 'Security Groups']
  },
  {
    id: 'aws-rds',
    name: 'AWS RDS (MySQL & SQL Server)',
    category: 'Cloud Infrastructure',
    icon: '🗄️',
    provider: 'AWS',
    description: 'Managed relational database clusters with automated multi-AZ replication, snapshots & query optimization.',
    metrics: 'Multi-AZ Replication',
    tags: ['MySQL', 'MS SQL', 'Automated Backups']
  },
  {
    id: 'docker-k8s',
    name: 'Docker & Kubernetes (k8s)',
    category: 'Container & Runtime',
    icon: '🐳',
    provider: 'Docker/K8s',
    description: 'Containerizing .NET and React applications with lightweight multi-stage builds and Kubernetes pod management.',
    metrics: 'Zero-Downtime Rollouts',
    tags: ['Microservices', 'Helm', 'Ingress Control']
  },
  {
    id: 'azure-devops',
    name: 'Azure DevOps & GitHub Actions',
    category: 'CI/CD & Repository',
    icon: '🔄',
    provider: 'Azure',
    description: 'Automated CI/CD pipelines connecting Azure Repos & Azure Boards to build, test, and ship code seamlessly.',
    metrics: 'Automated Releases',
    tags: ['Pipelines', 'Azure Boards', 'Artifacts']
  },
  {
    id: 'linux-net',
    name: 'Linux SysAdmin & Networking',
    category: 'Monitoring & OS',
    icon: '🐧',
    provider: 'Linux',
    description: 'Linux environment configuration (Ubuntu/Debian), Nginx reverse proxying, SSL/TLS, and DNS management.',
    metrics: 'Hardened OS',
    tags: ['Nginx', 'Bash Shell', 'SSH/TLS']
  }
]

const terminalPresets = [
  {
    id: 'docker-ecommerce',
    label: 'docker compose ps',
    command: 'docker compose -f docker-compose.yml ps',
    output: [
      'NAME                IMAGE                                                                  COMMAND                  SERVICE    CREATED        STATUS                    PORTS',
      'proxy               nginx:alpine                                                           "/docker-entrypoint.…"   proxy      2 hours ago    Up 2 hours (healthy)      0.0.0.0:80->80/tcp',
      'frontend            ghcr.io/marzanulhoque/docker-multi-tier-ecommerce/frontend:latest      "docker-entrypoint.s…"   frontend   2 hours ago    Up 2 hours                ',
      'backend             ghcr.io/marzanulhoque/docker-multi-tier-ecommerce/backend:latest       "docker-entrypoint.s…"   backend    2 hours ago    Up 2 hours                ',
      'postgres            postgres:16-alpine                                                     "docker-entrypoint.s…"   postgres   2 hours ago    Up 2 hours (healthy)      '
    ]
  },
  {
    id: 'docker',
    label: 'docker ps',
    command: 'docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"',
    output: [
      'NAMES                     STATUS                  PORTS',
      'altios-backend-api        Up 4 days (healthy)     0.0.0.0:5000->8080/tcp',
      'piramids-mysql-db         Up 4 days (healthy)     0.0.0.0:3306->3306/tcp',
      'shiftledger-redis-cache   Up 12 days (healthy)    0.0.0.0:6379->6379/tcp',
      'nginx-reverse-proxy       Up 12 days (healthy)    0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp'
    ]
  },
  {
    id: 'kubectl',
    label: 'kubectl status',
    command: 'kubectl get pods -n production -o wide',
    output: [
      'NAME                             READY   STATUS    RESTARTS   AGE    IP           NODE',
      'dotnet-api-79b8f4d9c4-2xk8l      1/1     Running   0          6d     10.244.1.14  node-aws-az1',
      'dotnet-api-79b8f4d9c4-m9p2w      1/1     Running   0          6d     10.244.2.08  node-aws-az2',
      'frontend-angular-5c6d7e-x4z9q    1/1     Running   0          12d    10.244.1.22  node-aws-az1'
    ]
  },
  {
    id: 'aws',
    label: 'aws status',
    command: 'aws ecs describe-clusters --clusters production-cluster',
    output: [
      '{',
      '  "clusters": [',
      '    {',
      '      "clusterName": "production-cluster",',
      '      "status": "ACTIVE",',
      '      "registeredContainerInstancesCount": 4,',
      '      "runningTasksCount": 8,',
      '      "pendingTasksCount": 0',
      '    }',
      '  ]',
      '}'
    ]
  },
  {
    id: 'azure',
    label: 'azure boards',
    command: 'az devops project show --project "Altios-Platform"',
    output: [
      '{',
      '  "name": "Altios-Platform",',
      '  "visibility": "private",',
      '  "state": "wellFormed",',
      '  "processTemplate": "Agile",',
      '  "activeSprints": "Sprint 24 - Shipped"',
      '}'
    ]
  }
]

export default function DevOpsSection() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'infra' | 'terminal'>('pipeline')
  const [selectedStep, setSelectedStep] = useState<PipelineStep>(pipelineSteps[1])
  const [activeTerminal, setActiveTerminal] = useState(terminalPresets[0])

  return (
    <Section id="devops" eyebrow="cloud & devops" title="DevOps & Infrastructure Showcase">
      {/* Mode Navigation Tabs */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <p className="text-xs font-medium text-mut">Select Representation Mode:</p>
        <div className="inline-flex rounded-xl border border-line bg-panel p-1">
          <button
            type="button"
            onClick={() => setActiveTab('pipeline')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'pipeline'
                ? 'bg-vio text-white shadow-sm'
                : 'text-mut hover:text-fg'
            }`}
          >
            <span>🔄</span> CI/CD Pipeline Visualizer
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('infra')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'infra'
                ? 'bg-vio text-white shadow-sm'
                : 'text-mut hover:text-fg'
            }`}
          >
            <span>☁️</span> Cloud Architecture Map
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'terminal'
                ? 'bg-vio text-white shadow-sm'
                : 'text-mut hover:text-fg'
            }`}
          >
            <span>💻</span> Terminal / CLI Console
          </button>
        </div>
      </div>

      {/* VIEW 1: CI/CD PIPELINE VISUALIZER */}
      {activeTab === 'pipeline' && (
        <div className="reveal space-y-6">
          {/* Horizontal Interactive Pipeline Nodes */}
          <div className="grid gap-3 sm:grid-cols-5">
            {pipelineSteps.map((step, idx) => {
              const isSelected = selectedStep.id === step.id
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setSelectedStep(step)}
                  className={`glow-card relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                    isSelected
                      ? 'border-vio bg-panel-2 ring-1 ring-vio'
                      : 'border-line bg-panel hover:border-mut'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-faint">STEP 0{idx + 1}</span>
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                  </div>
                  <div className="my-3">
                    <h4 className="text-xs font-bold leading-tight text-fg">{step.name}</h4>
                    <p className="mt-1 font-mono text-[10px] text-mut">{step.tool}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-line/60 pt-2 text-[10px] text-faint">
                    <span>{step.duration}</span>
                    <span className="font-semibold text-emerald-400">PASSED</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Selected Stage Detail Panel */}
          <div
            onMouseMove={cardGlow}
            className="glow-card rounded-2xl border border-line bg-panel p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-vio font-semibold">
                  Stage Details & Execution Logs
                </span>
                <h3 className="mt-1 text-lg font-bold text-fg">{selectedStep.name}</h3>
                <p className="text-xs text-mut">{selectedStep.details}</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Pipeline Stage Verified
              </div>
            </div>

            {/* Terminal Window with stage logs */}
            <div className="mt-4 overflow-hidden rounded-xl border border-line bg-[#09090e] p-4 font-mono text-xs text-emerald-400 shadow-inner">
              <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-mut">
                <span>Console Output — {selectedStep.tool}</span>
                <span>Execution Time: {selectedStep.duration}</span>
              </div>
              <div className="space-y-1.5">
                {selectedStep.logs.map((log, idx) => (
                  <p key={idx} className={log.startsWith('$') ? 'text-violet-300 font-bold' : 'text-emerald-400/90'}>
                    {log}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: CLOUD INFRASTRUCTURE MAP */}
      {activeTab === 'infra' && (
        <div className="reveal space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {infraNodes.map((node) => (
              <div
                key={node.id}
                onMouseMove={cardGlow}
                className="glow-card flex flex-col justify-between rounded-2xl border border-line bg-panel p-5 transition-transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{node.icon}</span>
                    <span className="rounded-full bg-panel-2 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-vio border border-line">
                      {node.provider}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-fg">{node.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-mut">{node.description}</p>
                </div>

                <div className="mt-5 border-t border-line/60 pt-3">
                  <div className="mb-2 flex items-center justify-between text-[11px]">
                    <span className="text-mut">Key Highlight:</span>
                    <span className="font-mono font-semibold text-emerald-400">{node.metrics}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {node.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-panel-2 px-2 py-0.5 font-mono text-[10px] text-faint">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: TERMINAL / CLI CONSOLE */}
      {activeTab === 'terminal' && (
        <div className="reveal">
          <div
            onMouseMove={cardGlow}
            className="glow-card overflow-hidden rounded-2xl border border-line bg-[#0c0c14] shadow-2xl"
          >
            {/* Terminal Header */}
            <div className="flex flex-wrap items-center justify-between border-b border-line/60 bg-[#13131e] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-mut">marzanul@devops-node:~</span>
              </div>
              {/* Preset Buttons */}
              <div className="flex flex-wrap gap-1.5">
                {terminalPresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setActiveTerminal(preset)}
                    className={`rounded-md px-2.5 py-1 font-mono text-xs transition-colors ${
                      activeTerminal.id === preset.id
                        ? 'bg-vio text-white font-bold'
                        : 'bg-panel-2 text-mut hover:text-fg'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Screen Body */}
            <div className="p-5 font-mono text-xs">
              <div className="flex items-center gap-2 text-violet-300">
                <span className="text-emerald-400 font-bold">marzanul@devops-node:~$</span>
                <span className="font-semibold text-white">{activeTerminal.command}</span>
              </div>
              <div className="mt-3 space-y-1 text-slate-300/90 leading-relaxed">
                {activeTerminal.output.map((line, i) => (
                  <p key={i} className="whitespace-pre-wrap">{line}</p>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 text-mut">
                <span className="text-emerald-400 font-bold">marzanul@devops-node:~$</span>
                <span className="caret" />
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
