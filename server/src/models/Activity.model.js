import { DataTypes } from "sequelize";

export default function(sequelize) {
  sequelize.define("Activity", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    difficulty: {
      type: DataTypes.INTEGER
    },
    duration: {
      type: DataTypes.TIME
    },
    season: {
      type: DataTypes.STRING
    }
  }, { timestamps: false });
}