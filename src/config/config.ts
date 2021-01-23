import * as dotenv from 'dotenv';

export const serverState = process.env.NODE_ENV;
export const AppConfig = {
    mongourl: process.env.DB_CONNECT||'',
    tokenSecret: process.env.TOKEN_SECRET || '',
};