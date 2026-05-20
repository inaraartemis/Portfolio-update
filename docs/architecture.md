# Architecture Documentation

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        DEVELOPER                            │
│                    (Local Machine)                          │
└──────────────────────────┬──────────────────────────────────┘
                           │ git push
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                        GITHUB                               │
│              (Source Code Repository)                       │
│                                                             │
│  • main branch: production code                             │
│  • dev branch: development code                             │
│  • Webhook configured → notifies Jenkins on push            │
└──────────────────────────┬──────────────────────────────────┘
                           │ webhook trigger
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    AWS CLOUD (VPC)                          │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │              Public Subnet                          │   │
│   │                                                     │   │
│   │   ┌──────────────────────────────────────────────┐  │   │
│   │   │           EC2 Instance (t2.micro)            │  │   │
│   │   │              Ubuntu 22.04                    │  │   │
│   │   │                                              │  │   │
│   │   │  ┌─────────────┐   ┌─────────────────────┐  │  │   │
│   │   │  │   Jenkins   │   │       Nginx         │  │  │   │
│   │   │  │  Port 8080  │──▶│      Port 80        │  │  │   │
│   │   │  │             │   │  (serves website)   │  │  │   │
│   │   │  └─────────────┘   └─────────────────────┘  │  │   │
│   │   │                                              │  │   │
│   │   └──────────────────────────────────────────────┘  │   │
│   │                                                     │   │
│   │   Security Group Rules:                             │   │
│   │   • Port 22  (SSH)   — Your IP only                 │   │
│   │   • Port 80  (HTTP)  — Open (0.0.0.0/0)             │   │
│   │   • Port 8080 (Jenkins) — Open (0.0.0.0/0)          │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   IAM Role: EC2-DevOps-Role                                 │
│   • AmazonEC2FullAccess (for demo)                          │
│   • Principle of Least Privilege applied                    │
└─────────────────────────────────────────────────────────────┘
                           │ deploys to /var/www/html
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    LIVE WEBSITE                             │
│           http://YOUR_EC2_PUBLIC_IP                         │
└─────────────────────────────────────────────────────────────┘
```

## Jenkins Pipeline Stages

| Stage | What Happens |
|-------|-------------|
| Checkout | Jenkins clones latest code from GitHub |
| Build | Prepares files, installs dependencies |
| Test | Validates files exist and are not empty |
| Deploy | Copies files to /var/www/html, sets permissions |

## Git Branching Strategy

```
main ──────────────────────────────────────▶ (production)
  │
  └── dev ──────────────────────────────▶ (development)
         │
         └── feature/add-about-page ──▶ (feature branches)
```

## AWS Services Used

| Service | Purpose |
|---------|---------|
| EC2 (t2.micro) | Virtual server to host Jenkins + Website |
| IAM | User/role management, least privilege access |
| VPC | Isolated network environment |
| Security Groups | Firewall rules for EC2 |
| Elastic IP (optional) | Static public IP address |
