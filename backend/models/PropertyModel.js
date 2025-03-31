
module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define("Property", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
              type: DataTypes.STRING,
              allowNull: false
          },
          type: {
            type: DataTypes.ENUM("Residential", "Commercial"),
            allowNull: false,
            validate: {
              isIn: {
                args: [["Residential", "Commercial"]],
                msg: "Type must be either 'Residential' or 'Commercial'",
              },
            },
          },
          address: {
            type: DataTypes.STRING,
            allowNull: true
          }
    },{
        tableName: 'properties',
        timestamps: true,
      })

      return Property
}