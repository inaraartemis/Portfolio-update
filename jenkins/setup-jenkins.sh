#!/bin/bash
# ============================================
# Jenkins + Nginx Setup Script for AWS EC2
# Run this on your EC2 instance after SSH-ing in
# ============================================

echo "======================================"
echo "  DevOps Project - Jenkins Setup"
echo "======================================"

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Java
echo "☕ Installing Java 17..."
sudo apt install -y openjdk-17-jdk
java -version

# Install Jenkins
echo "⚙️  Installing Jenkins..."
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update
sudo apt install -y jenkins

# Start and enable Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
echo "✅ Jenkins installed and running"

# Install Nginx
echo "🌐 Installing Nginx..."
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
echo "✅ Nginx installed and running"

# Allow Jenkins passwordless sudo for deployment
echo "🔐 Configuring Jenkins sudo permissions..."
echo "jenkins ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/jenkins

# Create web directory
sudo mkdir -p /var/www/html
sudo chown -R jenkins:jenkins /var/www/html

# Show Jenkins initial password
echo ""
echo "======================================"
echo "  SETUP COMPLETE!"
echo "======================================"
echo ""
echo "1. Open Jenkins at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):8080"
echo ""
echo "2. Use this password to unlock Jenkins:"
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
echo ""
echo "3. Install suggested plugins, then create your admin user."
echo "======================================"
