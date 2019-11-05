module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./data/users.dev.sqlite"
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:"
  },
  production: {
    dialect: "sqlite",
    storage: "./data/users.prod.sqlite"
  }
};
