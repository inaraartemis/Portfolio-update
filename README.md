# 🚀 Automated Website Deployment — Jenkins + GitHub + AWS EC2

> DevOps Final Project | CI/CD Pipeline Implementation

---

## 📌 Project Overview

This project demonstrates a **fully automated CI/CD deployment pipeline**. Every time code is pushed to the GitHub repository, Jenkins automatically builds, tests, and deploys the application to an AWS EC2 server — with zero manual steps.

---

## 🏗️ System Architecture & Workflow

The pipeline utilizes modern cloud infrastructure and CI/CD tools to deliver a robust, highly reliable automation workflow. Below is the detailed architectural design and flow:

### 1. High-Level Architecture Diagram
```text
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
│   │   • Port 22  (SSH)   — Admin IP only                │   │
│   │   • Port 80  (HTTP)  — Open (0.0.0.0/0)             │   │
│   │   • Port 8080 (Jenkins) — Open (0.0.0.0/0)          │   │
│   │                                                     │   │
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

### 2. Jenkins CI/CD Pipeline Stages
Defined declaratively as code in the [Jenkinsfile](file:///d:/personal/Projects/ASHUPRO/devops-project/Jenkinsfile), the pipeline performs the following steps in sequence:

| Stage | Action | Details |
| :--- | :--- | :--- |
| **1. Checkout** | Source Code Pull | Jenkins clones the latest commit from the GitHub repository (`main` branch). |
| **2. Build** | Workspace Setup | Prepares deployment workspace directories, cleans up older builds, and checks syntax. |
| **3. Test** | Site Integrity Verification | Executes automated shell validations to verify files exist and are populated. |
| **4. Deploy** | Production Delivery | Deploys HTML/CSS/JS/PDF assets to Nginx target `/var/www/html/` with secure ownership permissions. |

### 3. AWS Infrastructure Setup
A reliable, resilient AWS environment guarantees maximum availability of both Nginx and Jenkins:

| AWS Service | Resource / Config | Purpose |
| :--- | :--- | :--- |
| **EC2** | `t2.micro` (Ubuntu 22.04 LTS) | Hosted instance runs Jenkins (CI/CD engine) and Nginx (production web server). |
| **VPC & Subnet** | Public Subnet, Route Table, IGW | Provides internet routing capability to and from the hosted instance. |
| **Security Groups** | Port 22 (SSH), Port 80 (HTTP), Port 8080 (Jenkins) | Network firewall protecting instances by controlling inbound and outbound traffic. |
| **IAM Role** | `EC2-DevOps-Role` | Grants least-privilege administrative permissions for AWS service integrations. |

---

## 🌿 Version Control & Git Branching Strategy

Our version control model represents **professional Git hygiene** and an **active pipeline integration model** to mimic production environments.

### 1. Branching Strategy Diagram
We utilize a clean branching strategy designed to prevent unauthorized updates from breaking the live production site.

```text
main ──────────────────────────────[Deploy Gate]─────────────▶ (production - triggers Live Deploy)
  ▲                                     ▲
  │                                     │ Pull Request (Review & Merge)
  └─ dev ───────────────────────────────┴────────────────────▶ (staging/integration branch)
       ▲
       │ Branching Out
       └─ feature/portfolio-updates ─────────────────────────▶ (individual feature development)
```

### 2. Branch Roles & Pipeline Scoping
* **`main`**: The production-ready codebase. **Only pushes/merges to this branch trigger the Nginx live website deployment.**
* **`dev`**: The active integration branch. Developers combine features here to run testing/QA pipelines without affecting production.
* **`feature/*`**: Short-lived feature branches (e.g. `feature/add-about-page`). Developers work on specific tasks individually before merging into `dev`.

### 3. Git Commit Conventions (Semantic Commits)
To maintain a clear and readable history, we follow **Conventional Commits guidelines**. This ensures that anyone looking at the git history understands the context immediately:

* **`feat:`** A new feature (e.g., `feat: integrate custom premium Data Scientist portfolio`).
* **`style:`** Changes that do not affect the meaning of the code (whitespace, formatting, visual design, personalizing assets like `style: personalize portfolio under Ashu Kumari's name`).
* **`docs:`** Documentation changes only (e.g., `docs: integrate full ASCII System Architecture Diagram into README`).
* **`test:`** Adding missing tests or correcting existing tests (e.g., `test: trigger pipeline`).
* **`chore:`** Updating build tasks, package manager configs, etc.

*Example Commit Flow in this Repository:*
```bash
514c2fb docs: integrate full ASCII System Architecture Diagram into README
7a2f386 style: add JSDoc annotations and update architecture specs
418245f docs: add maintainer meta-comments to index.html
11c5c0b feat: integrate custom premium Data Scientist portfolio for Ashu Kumari
```

### 4. Git Webhook CI/CD Integration
The bridge between Version Control and AWS is configured through **GitHub Webhooks**:
1. When a developer executes `git push origin main`, GitHub sends an asynchronous `POST` HTTP request to the Jenkins payload endpoint: `http://35.153.126.161:8080/github-webhook/`.
2. Jenkins parses the JSON payload, detects the branch change, and immediately initiates a new pipeline execution.
3. The build is dynamically tracked under Jenkins with the GitHub commit hash, author name (`Ashu Kumari`), and the commit message.

---

## 🛠️ Complete Tech Stack

| Tool | Category | Purpose |
| :--- | :--- | :--- |
| **GitHub** | Version Control | Source code hosting and Webhook trigger engine |
| **Jenkins** | CI/CD Platform | Automates checkout, testing, and production Nginx file delivery |
| **Nginx** | Web Server | Ultra-fast HTTP server hosting our portfolio web files on port `80` |
| **Ubuntu 22.04** | Operating System | Host Linux kernel environment on the AWS virtual machine |

---

## 📁 Project Structure

```
devops-project/
├── app/
│   └── index.html          # The web application
├── jenkins/
│   └── setup-jenkins.sh    # Jenkins install script
├── docs/
│   └── architecture.md     # Architecture documentation
├── Jenkinsfile             # CI/CD pipeline definition
├── .gitignore
└── README.md
```

---

## ⚡ Quick Setup Guide

### Step 1 — AWS EC2 Setup (15 min)

1. Go to [AWS Console](https://console.aws.amazon.com) → EC2 → Launch Instance
2. Choose: **Ubuntu Server 22.04 LTS** (Free Tier eligible)
3. Instance type: **t2.micro** (Free Tier)
4. Create a new Key Pair → download the `.pem` file
5. Security Group — open these ports:
   - **22** (SSH)
   - **8080** (Jenkins)
   - **80** (HTTP)
6. Launch the instance

### Step 2 — Connect to EC2

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

### Step 3 — Install Jenkins (run on EC2)

```bash
# Run the setup script
chmod +x jenkins/setup-jenkins.sh
./jenkins/setup-jenkins.sh
```

Or manually:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Java
sudo apt install -y openjdk-17-jdk

# Install Jenkins
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt update
sudo apt install -y jenkins

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Install Nginx
sudo apt install -y nginx
sudo systemctl start nginx

# Allow Jenkins to deploy without password prompt
echo "jenkins ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/jenkins
```

### Step 4 — Configure Jenkins (browser)

1. Open: `http://YOUR_EC2_IP:8080`
2. Get admin password: `sudo cat /var/lib/jenkins/secrets/initialAdminPassword`
3. Install suggested plugins
4. Create admin user

### Step 5 — Create Jenkins Pipeline

1. Jenkins Dashboard → **New Item**
2. Name: `devops-project` → Select **Pipeline** → OK
3. Under Pipeline → Definition: **Pipeline script from SCM**
4. SCM: **Git**
5. Repository URL: `https://github.com/YOUR_USERNAME/devops-project`
6. Branch: `*/main`
7. Script Path: `Jenkinsfile`
8. Save

### Step 6 — Set Up GitHub Webhook

1. Go to your GitHub repo → Settings → Webhooks → Add webhook
2. Payload URL: `http://YOUR_EC2_IP:8080/github-webhook/`
3. Content type: `application/json`
4. Events: **Just the push event**
5. Add webhook

### Step 7 — Test It!

```bash
# Make any change to app/index.html
git add .
git commit -m "test: trigger pipeline"
git push origin main
```

Watch Jenkins automatically build and deploy! 🎉

---

## 🔐 Security Implementation

- IAM role assigned to EC2 with **least privilege**
- No hardcoded passwords or secrets in code
- Security Group restricts ports (only 22, 80, 8080 open)
- Jenkins credentials stored in Jenkins credential manager

---

## 📸 Required Screenshots for Submission

- [ ] EC2 instance running (AWS Console)
- [ ] Security Group configuration
- [ ] Jenkins dashboard
- [ ] Pipeline build success (green)
- [ ] GitHub webhook configured
- [ ] Live website in browser

---

## 🎤 Viva Prep — Key Points

- **CI/CD Flow**: Code push → Webhook → Jenkins pulls → Build → Test → Deploy
- **Jenkinsfile**: Defines pipeline as code (stages: Checkout, Build, Test, Deploy)
- **EC2**: Virtual server in AWS cloud running Ubuntu + Nginx
- **IAM**: Controls who can access what in AWS (least privilege principle)
- **Security Group**: Acts as a firewall for EC2 — controls inbound/outbound traffic

---

## 👤 Author

**Ashu Kumari**  
DevOps Course — Final Project  
[Your College Name]
