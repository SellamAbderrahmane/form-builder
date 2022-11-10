pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'mv .applimediarc.test .applimediarc'
                sh 'nyc npm test'
                sh 'nyc report --reporter=lcov --location=coverage'
                sh './../../dependency-check/bin/dependency-check.sh --project applimedia --scan node_modules --out dependency-check --format JSON --proxyserver  isp-ceg.emea.cegedim.grp --pr>
                sh 'node sonar-project.js'
            }
        }
        stage('PreDeploy') {
            steps {
                sh "mv .applimediarc.qualif .applimediarc"
                sh 'npm run swagger-autogen'
                sh "zip -r applimedia-qualif.zip . -x '*node_modules*' '*.git*' '*coverage*' '*nyc*' '*dependency-check*' '*.scannerwork*'"
                sh "mv applimedia-qualif.zip ../deploy/applimedia-qualif.zip"
            }
        }
    }
    triggers { }
}
