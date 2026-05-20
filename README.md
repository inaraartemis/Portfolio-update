# 🚀 Automated Website Deployment — Jenkins + GitHub + AWS EC2

> DevOps Final Project | CI/CD Pipeline Implementation

---

## 📌 Project Overview

This project demonstrates a **fully automated CI/CD deployment pipeline**. Every time code is pushed to the GitHub repository, Jenkins automatically builds, tests, and deploys the application to an AWS EC2 server — with zero manual steps.

---

## 🏗️ Architecture

```
Developer → GitHub → Webhook → Jenkins → Deploy → AWS EC2 → Live Website
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| GitHub | Source code & version control |
| Jenkins | CI/CD automation server |
| AWS EC2 (t2.micro) | Cloud hosting (Free Tier) |
| AWS IAM | Security & access management |
| AWS VPC + Security Groups | Networking |
| Nginx | Web server |
| Ubuntu 22.04 | Operating system |

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

**Arpita Mahapatra**  
DevOps Course — Final Project  
[Your College Name]
