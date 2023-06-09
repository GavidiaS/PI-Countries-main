import { DataTypes } from "sequelize";

export default function(sequelize) {
  sequelize.define("Country", {
    id: {
      primaryKey: true,
      type: DataTypes.STRING(3)
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    flag: {
      type: DataTypes.STRING
    },
    continent: {
      type: DataTypes.STRING
    },
    capital: {
      type: DataTypes.STRING
    },
    subregion: {
      type: DataTypes.STRING
    },
    area: {
      type: DataTypes.FLOAT
    },
    population: {
      type: DataTypes.INTEGER
    }
  }, { timestamps: false });
}