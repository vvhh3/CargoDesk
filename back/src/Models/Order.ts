
import { sequelize } from "../db"
import { DataTypes } from "sequelize"

export enum OrderStatus {
    waitingManager = "waitingManager",
    approved = "approved",
    rejected = "rejected",
    processing = 'processing',
    inTransit = "inTransit",
    delivered = "delivered",
    cancelled = 'cancelled'
}

export const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(
            OrderStatus.waitingManager,
            OrderStatus.approved,
            OrderStatus.rejected,
            OrderStatus.processing,
            OrderStatus.inTransit,
            OrderStatus.delivered,
            OrderStatus.cancelled
        ),
        allowNull: false,
        defaultValue: OrderStatus.waitingManager
    },
    whenCamedate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    managerId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    approvedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    rejectedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
})