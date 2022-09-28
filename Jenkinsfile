pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git(url: 'https://github.com/iangg29/tc2007b', branch: 'main')
      }
    }

    stage('Testing') {
      parallel {
        stage('Web Unit Tests') {
          steps {
            sh 'cd web && npm i && npm run test'
          }
        }

        stage('API Unit Tests') {
          steps {
            sh 'cd api && npm i && npm run test'
          }
        }

        stage('Client Unit Tests') {
          steps {
            sh 'cd client && npm i && npm run test'
          }
        }

      }
    }

  }
}