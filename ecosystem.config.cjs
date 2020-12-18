module.exports = {
  apps: [
    {
      name: 'cactus-manager',
      script: './src/index.js',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: ['162.0.230.152'],
      ref: 'origin/master',
      repo: 'git@github.com:cactusweb/manager.git',
      path: '/var/www/manager.cactusweb.io',
      ssh_options: 'StrictHostKeyChecking=no',
      env: {
        NODE_ENV: 'production'
      },
      'post-deploy':
        'npm install && npm run client:install && npm run client:build && pm2 reload ecosystem.config.cjs --env production'
    }
  }
}
