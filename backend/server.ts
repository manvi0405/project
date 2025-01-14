import * as dotenv from 'dotenv';
import http from 'http'
// const http = require ('http');
import * as app from './index1';
dotenv.config();
const server = http.createServer(app);
server.listen(process.env.PORT,()=>console.log(`Server running on port ${process.env.PORT}`))