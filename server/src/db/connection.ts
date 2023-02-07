import { Sequelize } from "sequelize";
//const sequelize = new Sequelize('rrhh', 'root', '1234',
const sequelize = new Sequelize('rrhh','root','1234', {
    host: 'localhost',
    dialect: 'mysql'
});
//jdbc:mysql://localhost:3306/?user=root
export default sequelize;//