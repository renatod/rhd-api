module.exports = (sequelize, DataTypes) => {
  const Repository = sequelize.define('Repository', {
    fullName: DataTypes.STRING,
    description: DataTypes.STRING,
    license: DataTypes.STRING,
    language: DataTypes.STRING,
    stargazers: DataTypes.INTEGER,
    forks: DataTypes.INTEGER,
  })

  return Repository
}