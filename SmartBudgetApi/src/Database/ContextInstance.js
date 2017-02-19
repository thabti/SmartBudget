import dotenv from 'dotenv';
dotenv.config();

import Context from './Context';
import schemes from './Schemes';

const context = new Context({
    uri: process.env.DATABASE_URI,
    schemes
});

export default context;
