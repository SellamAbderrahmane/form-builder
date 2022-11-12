// pipeline {
//     agent {
//         docker { image 'node:16.16.0-alpine' }
//     }
//     stages {
//         stage('Test') {
//             steps {
//                 sh 'node --version'
//             }
//         }
//     }
// }

node('jenkins-slave') {
  stage('Run shell') {
    sh 'echo hello world'
  }
}