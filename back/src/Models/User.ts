import { sequelize } from "../db"
import { DataTypes } from "sequelize"

export const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, // НЕЛЬЗЯ оставить пустым
        unique: true //должен быть уникальным
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false //НЕЛЬЗЯ оставить пустым
    }
})