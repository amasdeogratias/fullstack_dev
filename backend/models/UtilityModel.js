module.exports = (sequelize, DataTypes) => {
    const UtilityBill = sequelize.define(
        "UtilityBill",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            property_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "properties", // Make sure this matches your Property model table name
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        },
        {
            tableName: "utility_bills",
            timestamps: true,
        }
    );

    // Association with Property Model
    UtilityBill.associate = (models) => {
        UtilityBill.belongsTo(models.Property, {
            foreignKey: "property_id",
            as: "property",
        });
    };

    return UtilityBill;
};
