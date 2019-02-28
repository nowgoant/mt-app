import 'reflect-metadata';
import { Server } from './server';
// import './sequelize'
// let configPath = path.join(__dirname, "./config/.env")
// config({ path: configPath });
const server = new Server();

server.setStaticFolders();
server.setErrorHandlers();
server.startServer();
