module.exports = {
  apps: [
    {
      name: "portfolio",
      cwd: "/var/www/portfolio",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3210 -H 127.0.0.1",
      env: { NODE_ENV: "production" },
      max_memory_restart: "450M",
    },
  ],
};
