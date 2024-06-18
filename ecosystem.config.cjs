module.exports = {
  apps: [
    {
      name: "baby_client",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
