import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'web',
  username: 'root',
  password: '123root123',
  modelPaths: [__dirname + '/models'],
  operatorsAliases: false
});
