import { sequelize } from "../db.ts"
import { DataTypes } from "sequelize"

export enum UserRole {
    client = "client",
    manager = "manager",
    admin = "admin"
}

export const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role: {
        type: DataTypes.ENUM("client","manager", "admin"),
        allowNull: false,
        defaultValue: UserRole.client
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, // НЕЛЬЗЯ оставить пустым
        unique: true //должен быть уникальным
    },
    companyName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false //НЕЛЬЗЯ оставить пустым
    }
})