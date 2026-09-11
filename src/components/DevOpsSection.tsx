import { useState, useEffect } from 'react'
import Section from './Section'
import { cardGlow } from '../hooks/usePointerGlow'

interface DeploymentStage {
  stepNumber: string
  title: string
  tool: string
  description: string
  commands: string[]
  highlights: string[]
}

interface DevOpsProject {
  id: string
  title: string
  subtitle: string
  badge: string
  githubUrl: string
  liveUrl?: string
  healthUrl?: string
  overviewArticle: string[]
  prerequisites: string[]
  tags: string[]
  stages: DeploymentStage[]
}

const devOpsProjects: DevOpsProject[] = [
  {
    id: 'dotnet-devops-tracker',
    title: '.NET 8 DevOps Release Tracker & Multi-Stage Deployment Pipeline',
    subtitle: 'Production ASP.NET Core 8 MVC · Automated GitHub Actions CI/CD · AWS EC2 · systemd · Nginx',
    badge: 'AWS EC2, CI/CD & Linux systemd',
    githubUrl: 'https://github.com/MarzanulHoque/dotnet-devops-release-tracker',
    overviewArticle: [
      'A production-grade ASP.NET Core 8.0 MVC release tracking platform automated with GitHub Actions CI/CD targeting an AWS Linux EC2 instance. The application runs native Kestrel supervised directly by Linux systemd (`dotnetapp.service`) and reverse-proxied with Nginx for zero-container overhead and peak Free Tier throughput.',
      'The architecture enforces a multi-layered security model where zero database passwords or credentials ever touch git source control. Connection strings default to empty, falling back to an in-memory EF Core provider during CI test runs, while production MySQL credentials are read from host-isolated environment files (`/etc/dotnetapp.env`) locked down to POSIX permissions 600 under the unprivileged `www-data` service account.'
    ],
    prerequisites: [
      'AWS EC2 Linux Instance (Ubuntu 24.04 LTS / 22.04 LTS) with Security Group rules for HTTP (80), HTTPS (443), and SSH (22)',
      '.NET 8.0 ASP.NET Core Runtime installed on the host',
      'Nginx Web Server configured as high-throughput reverse proxy',
      'MySQL 8.0 Database Server with Pomelo EF Core provider',
      'GitHub Repository Secrets configured (EC2_HOST, EC2_USERNAME, EC2_SSH_KEY)'
    ],
    tags: ['ASP.NET Core 8', 'C#', 'GitHub Actions', 'CI/CD', 'AWS EC2', 'Linux systemd', 'Nginx', 'MySQL 8.0', 'EF Core', 'xUnit', 'Bash'],
    stages: [
      {
        stepNumber: '01',
        title: 'Automated Fail-Safe CI Gates & xUnit Validation',
        tool: 'GitHub Actions (.github/workflows/deploy.yml) & xUnit',
        description: 'Every push to main triggers automated package restore, Release compilation, and test execution. If model validation, controller logic, or health diagnostics fail, the deployment is aborted immediately before touching AWS.',
        commands: [
          'dotnet restore DotnetProject.sln',
          'dotnet build DotnetProject.sln -c Release --no-restore',
          'dotnet test DotnetProject.sln --no-build --verbosity normal # Automated fail-safe test gate'
        ],
        highlights: [
          '100% automated test execution on every commit to main',
          'Resilient offline testing fallback to EF Core In-Memory provider when DB is absent'
        ]
      },
      {
        stepNumber: '02',
        title: 'Release Packaging & Encrypted SSH/SCP Artifact Transfer',
        tool: 'dotnet publish, appleboy/scp-action & appleboy/ssh-action',
        description: 'The workflow packages the application into production binaries (`dotnet publish -c Release`) and securely transfers the build artifacts directly to `/var/www/dotnetapp` on AWS EC2 over SSH using masked repository secrets.',
        commands: [
          'dotnet publish MVC/DotnetProject.csproj -c Release -o ./publish',
          '# SCP artifact payload to AWS EC2: /var/www/dotnetapp',
          '# Remote SSH execution triggering service reload and post-deploy health check'
        ],
        highlights: [
          'Zero plaintext credentials or SSH keys exposed in CI configuration or logs',
          'Automated transfer and deployment pipeline executing on push to main'
        ]
      },
      {
        stepNumber: '03',
        title: 'Automated Server Provisioning & Least-Privilege Isolation',
        tool: 'setup-ec2.sh, Ubuntu 24.04 LTS & www-data',
        description: 'One-command idempotent bootstrap script installs the .NET 8 runtime, Nginx, and MySQL. It provisions the deployment directory under the unprivileged `www-data` user to guarantee least-privilege host security.',
        commands: [
          'cd deploy && chmod +x setup-ec2.sh && ./setup-ec2.sh',
          'sudo chown -R www-data:www-data /var/www/dotnetapp',
          'sudo chmod -R 755 /var/www/dotnetapp'
        ],
        highlights: [
          'Application executed strictly under unprivileged www-data service account',
          'Idempotent script handles package dependencies and directory permissions'
        ]
      },
      {
        stepNumber: '04',
        title: 'Zero-Credential Source Model & Cryptographic Secret Generation',
        tool: 'OpenSSL & /etc/dotnetapp.env (POSIX 600)',
        description: 'Source control contains an empty connection string (`"DefaultConnection": ""`). The setup script generates dynamic 24-character cryptographic passwords directly on the host using `openssl rand -base64 24` and writes `/etc/dotnetapp.env` with `-rw-------` (600) permissions.',
        commands: [
          'DB_PASS=$(openssl rand -base64 24 | tr -dc "a-zA-Z0-9" | head -c 24)',
          'echo \'ConnectionStrings__DefaultConnection="Server=localhost;Database=devops_tracker;User=dotnet_user;Password=\'${DB_PASS}\';" \' | sudo tee /etc/dotnetapp.env',
          'sudo chmod 600 /etc/dotnetapp.env && sudo chown www-data:www-data /etc/dotnetapp.env'
        ],
        highlights: [
          'Zero database passwords or keys committed to Git or CI workflows',
          'POSIX 600 permission restriction blocking non-root access',
          'ASP.NET Core hierarchical environment override (ConnectionStrings__DefaultConnection)'
        ]
      },
      {
        stepNumber: '05',
        title: 'Linux Daemon Process Supervision & Kernel Sandboxing',
        tool: 'Linux systemd (dotnetapp.service)',
        description: 'ASP.NET Core Kestrel runs natively as a managed background daemon (`dotnetapp.service`). It features automatic crash recovery (`RestartSec=10`), kernel namespace sandboxing (`ProtectSystem=full`), and privilege escalation prevention (`NoNewPrivileges=true`).',
        commands: [
          'sudo systemctl daemon-reload',
          'sudo systemctl enable --now dotnetapp.service',
          'sudo systemctl status dotnetapp.service',
          'sudo journalctl -u dotnetapp.service -f -n 50'
        ],
        highlights: [
          'Automatic self-healing daemon restarts within 10 seconds of abnormal exits',
          'Linux kernel sandboxing isolating /usr, /boot, and /etc',
          'Native Kestrel execution eliminating container memory overhead'
        ]
      },
      {
        stepNumber: '06',
        title: 'High-Throughput Nginx Reverse Proxy & Header Forwarding',
        tool: 'Nginx Reverse Proxy (:80) & Kestrel (:5000)',
        description: 'Nginx binds public port 80, terminates incoming traffic, manages gzip compression, and proxies requests to Kestrel at `http://127.0.0.1:5000` while forwarding client identity (`X-Forwarded-For`, `X-Forwarded-Proto`).',
        commands: [
          'sudo nginx -t # Validate syntax',
          'sudo systemctl restart nginx',
          'curl -I http://localhost/ # Validate 200 OK reverse proxy pass'
        ],
        highlights: [
          'Gzip compression and efficient static asset handling',
          'Secure client IP and protocol forwarding to ASP.NET Core'
        ]
      },
      {
        stepNumber: '07',
        title: 'Observability Endpoint & Database Health Diagnostics',
        tool: 'ASP.NET Core Health Controller (/health) & Diagnostic Probing',
        description: 'Dedicated `/health` diagnostics endpoint executes live connection probes against MySQL, returning JSON diagnostics including server uptime, host environment, and database connectivity for uptime monitors.',
        commands: [
          'curl -s http://localhost/health | jq .',
          'curl -I http://localhost/ # Returns HTTP 200 OK from Nginx reverse proxy'
        ],
        highlights: [
          'Observability dashboard and production-ready /health diagnostics endpoint',
          'Continuous MySQL connectivity verification without sensitive data leaks'
        ]
      }
    ]
  },
  {
    id: 'docker-ecommerce',
    title: 'Multi-Tier Containerized E-Commerce Platform',
    subtitle: 'Production Deployment Procedure & Microservices Architecture on AWS EC2',
    badge: 'AWS EC2 & Docker Deployment',
    githubUrl: 'https://github.com/MarzanulHoque/docker-multi-tier-ecommerce',
    overviewArticle: [
      'This project demonstrates an enterprise-grade, highly available, multi-tier e-commerce web platform deployed on AWS EC2 using Docker, Docker Compose, Nginx Reverse Proxy, Node.js/Express REST API, and PostgreSQL.',
      'The core architectural goal was building a decoupled micro-service system with zero-downtime startup guarantees (`service_healthy` dependent initialization), dynamic memory secret retrieval via AWS SSM Parameter Store (eliminating hardcoded credentials), and containerizing static SPA & backend services into GitHub Container Registry (GHCR).'
    ],
    prerequisites: [
      'AWS EC2 Instance (Ubuntu / Amazon Linux) with HTTP (80) & SSH (22) security groups',
      'Docker Engine v20.10+ & Docker Compose v2.0+',
      'AWS IAM Role attached to EC2 with AmazonSSMReadOnlyAccess',
      'AWS SSM Parameter Store entry configured (/prod/ecommerce/db_password)'
    ],
    tags: ['Docker', 'Docker Compose', 'AWS EC2', 'AWS SSM', 'Nginx', 'Node.js', 'PostgreSQL', 'GHCR', 'Bash', 'Git'],
    stages: [
      {
        stepNumber: '01',
        title: 'Repository Architecture & Pre-Commit Security Audit',
        tool: 'Git & Gitleaks Pre-Commit Hook',
        description: 'Clone the decoupled 4-service repository. Execute local pre-commit security interception hooks scanning staged diffs for regex secret leaks before committing.',
        commands: [
          'git clone https://github.com/MarzanulHoque/docker-multi-tier-ecommerce.git',
          'cd docker-multi-tier-ecommerce',
          './.git/hooks/pre-commit # Verified 0 hardcoded credentials in commit history'
        ],
        highlights: [
          'Gitleaks secret interception active on git commit',
          'Decoupled microservice folder layout (/frontend, /backend, /nginx, docker-compose.yml, deploy-ec2.sh)'
        ]
      },
      {
        stepNumber: '02',
        title: 'GitHub Repository Secrets & Workflow Integration',
        tool: 'GitHub Actions Secrets & appleboy/ssh-action (.github/workflows/deploy.yml)',
        description: 'Encrypted repository secrets are defined under GitHub Settings ➔ Secrets ➔ Actions, then injected dynamically into `.github/workflows/deploy.yml` via `appleboy/ssh-action` to establish passwordless SSH sessions.',
        commands: [
          '# 1. Configured Repository Secrets (GitHub Settings -> Secrets -> Actions):',
          'EC2_HOST = <Elastic_IP> | EC2_USERNAME = ubuntu | EC2_SSH_KEY = <Private_PEM_Key>',
          '',
          '# 2. Consumption in .github/workflows/deploy.yml:',
          '- name: Deploy & Build on EC2 via SSH',
          '  uses: appleboy/ssh-action@v1.0.3',
          '  with:',
          '    host: ${{ secrets.EC2_HOST }}',
          '    username: ${{ secrets.EC2_USERNAME }}',
          '    key: ${{ secrets.EC2_SSH_KEY }}',
          '    script: |',
          '      cd docker-multi-tier-ecommerce && git checkout -- . && git pull origin main',
          '      ./deploy-ec2.sh'
        ],
        highlights: [
          'Zero plaintext SSH credentials committed in YAML workflow files',
          'Encrypted secrets injection (${{ secrets.EC2_HOST }}, ${{ secrets.EC2_SSH_KEY }}) masking private keys in CI logs',
          'Automated SSH remote command execution invoking deploy-ec2.sh upon git push main'
        ]
      },
      {
        stepNumber: '03',
        title: 'Multi-Stage Docker Building & GHCR Image Registry Publishing',
        tool: 'Docker Engine, Multi-Stage Dockerfile & GHCR',
        description: 'Build optimized lightweight multi-stage Docker container images for Node.js REST API and static Frontend SPA, then tag and push OCI artifacts to GitHub Container Registry.',
        commands: [
          '# Build multi-stage Node.js backend & Frontend SPA in parallel',
          'docker compose build --parallel',
          'docker tag ecommerce-backend ghcr.io/marzanulhoque/docker-multi-tier-ecommerce/backend:latest',
          'docker push ghcr.io/marzanulhoque/docker-multi-tier-ecommerce/backend:latest'
        ],
        highlights: [
          'Multi-stage Dockerfile builds reducing production runtime image footprint',
          'Automated container vulnerability scanning prior to GHCR registry publishing'
        ]
      },
      {
        stepNumber: '04',
        title: 'Idempotent Host Setup & Docker Engine Provisioning',
        tool: 'deploy-ec2.sh & AWS EC2 Ubuntu 24.04',
        description: 'Execute `deploy-ec2.sh` on AWS EC2. The script checks for existing Docker Engine binaries; if missing, it automatically installs ca-certificates, curl, gnupg, Docker CE, and enables docker systemd service.',
        commands: [
          'chmod +x deploy-ec2.sh',
          '# Idempotent execution — skips apt packages if Docker binary is already active',
          './deploy-ec2.sh'
        ],
        highlights: [
          'Idempotent installation logic (skips package manager if docker binary exists)',
          'Automated systemctl service configuration and non-root docker group assignment'
        ]
      },
      {
        stepNumber: '05',
        title: 'AWS IMDSv2 Tokening & SSM Parameter Store Secret Ingestion',
        tool: 'AWS EC2 IMDSv2 & AWS SSM Parameter Store',
        description: 'The deployment script requests an IMDSv2 session token from `http://169.254.169.254/latest/api/token` to detect AWS region automatically. It then fetches `/prod/ecommerce/db_password` securely into runtime memory via AWS CLI without saving passwords to disk.',
        commands: [
          'TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 60")',
          'AWS_REGION=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/placement/region)',
          'POSTGRES_PASSWORD=$(aws ssm get-parameter --name "/prod/ecommerce/db_password" --with-decryption --region "$AWS_REGION" --query "Parameter.Value" --output text)',
          'export POSTGRES_PASSWORD'
        ],
        highlights: [
          'Zero hardcoded credentials on host disk or inside Git repo',
          'IMDSv2 token security enforcement preventing SSRF metadata leaks',
          'Non-interactive CI fallback generation (openssl rand -hex 16)'
        ]
      },
      {
        stepNumber: '06',
        title: 'Healthcheck Dependent Stack Orchestration',
        tool: 'Docker Compose, Postgres pg_isready & Bridge Network',
        description: 'Deploy the 4 containerized services onto an isolated bridge network (`app-network`). PostgreSQL initializes first with `pg_isready` healthcheck; backend Node API delays startup via `depends_on postgres condition: service_healthy`.',
        commands: [
          'sudo -E docker compose up --build -d',
          '# Verify container health status:',
          'docker compose ps'
        ],
        highlights: [
          'PostgreSQL healthcheck probe: pg_isready -U app_user -d app_db (10s interval, 5 retries)',
          'Backend service_healthy condition preventing HTTP 500 startup errors',
          'Named volume pg_data enforcing database persistence across container restarts'
        ]
      },
      {
        stepNumber: '07',
        title: 'Nginx Reverse Proxy Ingress & End-to-End Health Probe Audit',
        tool: 'Nginx Alpine & HTTP Health Monitoring',
        description: 'Nginx Reverse Proxy container maps host port 80 to internal bridge network `app-network`, proxying static SPA frontend assets on `/` and routing API endpoints to `/api/*`.',
        commands: [
          'curl -I http://localhost/                # Returns HTTP 200 OK (Nginx Proxy ➔ Frontend)',
          'curl http://localhost/api/health         # Returns HTTP 200 OK (Nginx Proxy ➔ Express API ➔ Postgres DB)'
        ],
        highlights: [
          'Unified ingress entry point on HTTP Port 80',
          'Internal bridge network isolating PostgreSQL DB port 5432 from public internet'
        ]
      }
    ]
  }
]

export default function DevOpsSection() {
  const [selectedProject, setSelectedProject] = useState<DevOpsProject | null>(null)

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('modal-open')
    } else {
      document.body.style.overflow = ''
      document.body.classList.remove('modal-open')
    }
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('modal-open')
    }
  }, [selectedProject])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Section id="devops" eyebrow="cloud & devops" title="DevOps Architecture & Infrastructure Showcase">
      <p className="mb-6 text-sm text-mut">
        In-depth blueprints of cloud deployments, automated CI/CD pipelines, container orchestration, and server process supervision on AWS.
      </p>

      {/* DevOps Project Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {devOpsProjects.map((project) => (
          <article
            key={project.id}
            onMouseMove={cardGlow}
            onClick={() => setSelectedProject(project)}
            className="glow-card reveal group cursor-pointer rounded-2xl border border-line bg-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-vio/40 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="rounded-full border border-line bg-panel-2 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-vio">
                  {project.badge}
                </span>
                {project.liveUrl && (
                  <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Deployment
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-fg group-hover:text-vio transition-colors">
                {project.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-vio">{project.subtitle}</p>
              <p className="mt-3 text-sm text-mut line-clamp-3 leading-relaxed">
                {project.overviewArticle[0]}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full bg-panel-2 px-2.5 py-0.5 font-mono text-xs text-mut"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4">
              <span className="font-mono text-xs font-semibold text-vio group-hover:underline flex items-center gap-1">
                Explore Architecture & Deployment →
              </span>
              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="font-mono text-xs font-semibold text-emerald-400 hover:underline"
                  >
                    Live Demo ↗
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-mono text-xs font-semibold text-mut hover:text-fg"
                  aria-label="GitHub Repository"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ARTICLE DEPLOYMENT DESCRIPTION MODAL */}
      {selectedProject && (
        <div
          id="devops-modal"
          className="fixed top-16 inset-x-0 bottom-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/95 p-4 sm:p-6 backdrop-blur-md transition-opacity"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glow-card relative my-auto flex flex-col max-h-[calc(100vh-6rem)] w-full max-w-4xl overflow-y-auto rounded-2xl border border-line bg-panel p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dedicated Top Right Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-panel-2 text-sm font-bold text-mut transition-colors hover:bg-line hover:text-fg"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Clean Header */}
            <div className="border-b border-line pb-5 pr-10 flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="inline-block rounded-full border border-line bg-panel-2 px-3 py-1 font-mono text-[10px] font-semibold text-vio mb-2">
                  {selectedProject.badge}
                </span>
                <h2 className="text-2xl font-bold text-fg sm:text-3xl leading-snug">{selectedProject.title}</h2>
                <p className="font-mono text-xs text-mut mt-1">{selectedProject.subtitle}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 font-mono text-xs font-semibold text-emerald-400 transition-transform hover:scale-105 hover:bg-emerald-500/20"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live Demo
                  </a>
                )}
                {selectedProject.healthUrl && (
                  <a
                    href={selectedProject.healthUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-line bg-panel-2 px-3.5 py-2 font-mono text-xs font-semibold text-mut transition-transform hover:scale-105 hover:text-fg"
                  >
                    <span className="text-emerald-400 font-bold">🩺</span> Health Diagnostics
                  </a>
                )}
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-vio px-4 py-2 text-xs font-semibold text-white shadow transition-transform hover:scale-105"
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            {/* Written Technical Overview */}
            <div className="mt-6 space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-vio font-semibold">
                Technical Overview & Architecture Goal
              </h3>
              {selectedProject.overviewArticle.map((para, idx) => (
                <p key={idx} className="text-xs sm:text-sm leading-relaxed text-mut">
                  {para}
                </p>
              ))}

              <div className="rounded-xl border border-line bg-panel-2 p-4">
                <h4 className="font-mono text-xs uppercase tracking-wider text-vio font-semibold mb-2">
                  Deployment Prerequisites
                </h4>
                <ul className="grid gap-1.5 text-xs text-mut sm:grid-cols-2">
                  {selectedProject.prerequisites.map((req, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span> {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* STEP-BY-STEP WRITTEN DEPLOYMENT PROCEDURE */}
            <div className="mt-8">
              <h3 className="font-mono text-xs uppercase tracking-wider text-vio font-semibold mb-4">
                Step-by-Step Production Deployment Procedure
              </h3>

              <div className="space-y-4">
                {selectedProject.stages.map((stage) => (
                  <div key={stage.stepNumber} className="rounded-2xl border border-line bg-panel-2 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
                      <div>
                        <span className="font-mono text-xs text-vio font-bold">STAGE {stage.stepNumber}</span>
                        <h4 className="text-base font-bold text-fg">{stage.title}</h4>
                        <p className="font-mono text-xs text-vio font-semibold">{stage.tool}</p>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-fg leading-relaxed font-medium">
                      {stage.description}
                    </p>

                    {/* Shell Execution Commands */}
                    <div className="mt-3 overflow-hidden rounded-xl border border-line bg-ink/90 p-3 font-mono text-xs text-emerald-400">
                      <div className="text-[10px] text-faint border-b border-line pb-1 mb-2">Shell Commands:</div>
                      {stage.commands.map((cmd, i) => (
                        <p key={i} className="whitespace-pre-wrap text-emerald-400 font-semibold">{cmd}</p>
                      ))}
                    </div>

                    {/* Key Highlights */}
                    <div className="mt-3 pt-2">
                      <ul className="grid gap-1 text-xs text-mut sm:grid-cols-2">
                        {stage.highlights.map((hl, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold">✓</span> {hl}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer Close */}
            <div className="mt-8 flex justify-end border-t border-line pt-4">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="rounded-xl border border-line bg-panel-2 px-5 py-2 text-xs font-semibold text-fg hover:bg-line"
              >
                Close Article Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
