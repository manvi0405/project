import dotenv from 'dotenv'
dotenv.config();

export const dbConfig = {
    user: process.env.DB_USERNAME || "postgres",
    host:process.env.DB_HOST || "localhost",
    database:process.env.DB_DATABASE || "project1",
    password:process.env.DB_PASSWORD || "Ruchit",
    port:parseInt(process.env.DB_PORTNO || '5432',10) 
}

export const API_KEY = process.env.API_KEY || 'secured-api-key'