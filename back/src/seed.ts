import { User, UserRole } from "./Models/User"
import { Order, OrderStatus } from "./Models/Order"
import { faker } from "@faker-js/faker"
import { sequelize } from "./db"
import bcrypt from "bcrypt"
export const generateData = async () => {
    try {

        const userCount = await User.count()
        const orderCount = await Order.count()

        if (userCount > 0) {
            console.log("already user in db")
        } else {
            await sequelize.query(`ALTER SEQUENCE "Users_id_seq" RESTART WITH 1`)
            for (let i = 0; i < 10; i++) {
                await User.create({
                    role: faker.helpers.arrayElement(Object.values(UserRole)),
                    name: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    email: faker.internet.email(),
                    companyName: faker.company.name(),
                    password: await bcrypt.hash("123", 10)
                })
            }
        }

        if (orderCount > 0) {
            console.log("already order in db")
        } else {
            await sequelize.query(`ALTER SEQUENCE "Orders_id_seq" RESTART WITH 1`)

            const users = await User.findAll()
            const userIds = users.map((user: any) => user.id)

            for (let i = 0; i < 10; i++) {

                await Order.create({
                    userId: faker.helpers.arrayElement(userIds),
                    link: faker.internet.url(),
                    product: faker.commerce.productName(),
                    brand: faker.company.name(),
                    quantity: faker.number.int({ min: 1, max: 100 }),
                    price: faker.number.int({ min: 1000, max: 50000 }),
                    status: faker.helpers.arrayElement(Object.values(OrderStatus)),
                    productImages: [
                        faker.image.url()
                    ]
                })
            }
        }
    } catch (e) {
        console.log(e)
    }
}