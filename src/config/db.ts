import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
export const db: any = process.env.DB_CONNECT;
