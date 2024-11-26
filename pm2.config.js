module.exports = {
  name: 'Timecapsule', // Name of your application
  script: './build', // Entry point of your application
  interpreter: 'bun', // Bun interpreter
  env: {
    PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}`, // Add "~/.bun/bin/bun" to PATH
  },
};
