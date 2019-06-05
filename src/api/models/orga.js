module.exports = (sequelize, DataTypes) => {
  return sequelize.define('orga', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    }
  })
}
