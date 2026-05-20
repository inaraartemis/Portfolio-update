pipeline {
    agent any

    environment {
        APP_DIR = '/var/www/html'
        EC2_USER = 'ubuntu'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '📥 Pulling latest code from GitHub...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo '🔨 Build stage — preparing application files...'
                sh '''
                    echo "Build started at: $(date)"
                    ls -la app/
                    echo "All files ready for deployment."
                '''
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running basic tests...'
                sh '''
                    # Check index.html exists
                    if [ -f app/index.html ]; then
                        echo "✅ index.html found"
                    else
                        echo "❌ index.html missing!"
                        exit 1
                    fi

                    # Check HTML is not empty
                    if [ -s app/index.html ]; then
                        echo "✅ index.html is not empty"
                    else
                        echo "❌ index.html is empty!"
                        exit 1
                    fi

                    echo "✅ All tests passed!"
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying to AWS EC2...'
                sh '''
                    # Copy files to web server directory
                    sudo cp -r app/* /var/www/html/

                    # Set correct permissions
                    sudo chown -R www-data:www-data /var/www/html/
                    sudo chmod -R 755 /var/www/html/

                    echo "✅ Deployment successful!"
                    echo "🌐 App is live at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
                '''
            }
        }

    }

    post {
        success {
            echo '🎉 Pipeline completed successfully! Application is LIVE.'
        }
        failure {
            echo '❌ Pipeline failed. Check the logs above for errors.'
        }
    }
}
