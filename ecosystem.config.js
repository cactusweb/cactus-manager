module.exports = {
  apps: [
    {
      name: 'manager',
      script: './src/index.js',
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'root',
      host: ['194.67.78.98'],
      ref: 'origin/master',
      repo: 'git@github.com:gaspromov/CactusManager.git',
      path: '/var/www/cactus-manager.ru',
      'post-deploy':
        'npm install && npm run c:i && npm run c:b && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      env: {
        NODE_ENV: 'production'
      }
    }
  }
}
