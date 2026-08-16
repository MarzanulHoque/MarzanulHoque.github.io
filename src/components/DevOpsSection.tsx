import { useState, useEffect } from 'react'
import Section from './Section'
import { cardGlow } from '../hooks/usePointerGlow'

interface DevOpsProject {
  id: string
  title: string
  subtitle: string
  badge: string
  githubUrl: string
  overviewArticle: string[]
  prerequisites: string[]
  tags: string[]
}

const devOpsProject: DevOpsProject = {
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
  tags: ['Docker', 'Docker Compose', 'AWS EC2', 'AWS SSM', 'Nginx', 'Node.js', 'PostgreSQL', 'GHCR', 'Bash', 'Git']
}

const deploymentStages = [
  {
    stepNumber: '01',
    title: 'Repository Checkouts & Security Pre-Commit Interception',
    tool: 'Git & Gitleaks',
    description: 'Clone project repository and execute automated pre-commit security checks to guarantee zero hardcoded passwords exist in commit history.',
    commands: [
      'git clone https://github.com/MarzanulHoque/docker-multi-tier-ecommerce.git',
      'cd docker-multi-tier-ecommerce',
      './.git/hooks/pre-commit # 0 secret leaks detected'
    ],
    highlights: [
      'Gitleaks secret pattern scanning active on pre-commit hook',
      'Clean microservices repository structure with decoupled frontend, backend & nginx directories'
    ]
  },
  {
    stepNumber: '02',
    title: 'Multi-Stage Build & GHCR Publishing',
    tool: 'Docker & GitHub Container Registry',
    description: 'Build lightweight multi-stage container images for both frontend static assets and Node.js REST API backend, then push to GitHub Container Registry.',
    commands: [
      'docker compose build --parallel',
      'docker tag ecommerce-frontend ghcr.io/marzanulhoque/docker-multi-tier-ecommerce/frontend:latest',
      'docker push ghcr.io/marzanulhoque/docker-multi-tier-ecommerce/backend:latest'
    ],
    highlights: [
      'Multi-stage Dockerfile builds reducing production runtime image footprint',
      'Automated security scans performed before container registry push'
    ]
  },
  {
    stepNumber: '03',
    title: 'AWS SSM Secret Retrieval & IMDSv2 Tokening',
    tool: 'AWS SSM Parameter Store & EC2 IMDSv2',
    description: 'The EC2 deployment script uses IMDSv2 metadata tokens to detect region automatically and pulls /prod/ecommerce/db_password securely into runtime memory without saving secrets to disk.',
    commands: [
      'TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 60")',
      'POSTGRES_PASSWORD=$(aws ssm get-parameter --name "/prod/ecommerce/db_password" --with-decryption --query "Parameter.Value" --output text)'
    ],
    highlights: [
      'Zero credentials saved on host filesystem',
      'IMDSv2 session token security enforcement'
    ]
  },
  {
    stepNumber: '04',
    title: 'Dependent Service Orchestration & Health Probes',
    tool: 'Docker Compose & Postgres pg_isready',
    description: 'Launch container stack via Docker Compose. The PostgreSQL container initializes first and executes pg_isready healthcheck before backend API service unblocks.',
    commands: [
      'docker compose up -d',
      'docker compose ps # Verify all 4 containers healthy'
    ],
    highlights: [
      'Postgres healthcheck: pg_isready -U app_user -d app_db',
      'Backend startup condition: depends_on postgres condition: service_healthy',
      'Nginx proxy container mapping external port 80 to internal bridge app-network'
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

  return (
    <Section id="devops" eyebrow="cloud & devops" title="DevOps Architecture & Infrastructure Showcase">
      <p className="mb-6 text-sm text-mut">
        Detailed breakdown of containerized microservices, cloud deployments, and automated CI/CD workflows.
      </p>

      {/* DevOps Project Card matching Projects section style */}
      <div className="grid gap-4 sm:grid-cols-2">
        <article
          onMouseMove={cardGlow}
          onClick={() => {
            setSelectedProject(devOpsProject)
          }}
          className="glow-card reveal cursor-pointer rounded-2xl border border-line bg-panel p-6 transition-transform hover:-translate-y-1"
        >
          <h3 className="text-lg font-bold text-fg">{devOpsProject.title}</h3>
          <p className="mt-1 font-mono text-xs text-vio">{devOpsProject.subtitle}</p>
          <p className="mt-3 text-sm text-mut">{devOpsProject.overviewArticle[0]}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {devOpsProject.tags.map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-panel-2 px-3 py-1 font-mono text-xs text-mut"
              >
                {tech}
              </li>
            ))}
          </ul>
        </article>
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

              <div className="flex items-center gap-3">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-vio px-4 py-2 text-xs font-semibold text-white shadow transition-transform hover:scale-105"
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub Repository
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
                {deploymentStages.map((stage) => (
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
