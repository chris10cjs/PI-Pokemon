const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID, //id único
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      hp: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 500,
        },
      },
      attack: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 250,
        },
      },
      defense: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 250,
        },
      },
      speed: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 250,
        },
      },
      height: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 500,
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 500,
        },
      },
    },
    {
      timestamps: true, //false
      createdAt: false,
      updatedAt: false,
    }
  );
};
