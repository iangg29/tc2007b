pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git(url: 'https://github.com/iangg29/tc2007b', branch: 'main')
      }
    }

    stage('Web Unit Tests') {
      steps {
        sh 'cd web && npm i && npm run test'
      }
    }

  }
}