require('dotenv').config();

export const USE_TEST_DB = process.env.BLOG_USE_TEST_DB;
export const TEST_DB_URI = process.env.BLOG_DB_TEST_URI;
export const PROD_DB_URI = process.env.PROD_DB_URI;
export const IS_TEST_ENV = process.env.TEST_ENV;
export const DB_URI = IS_TEST_ENV === "true" ? TEST_DB_URI : PROD_DB_URI;
export const PORT = process.env.PORT;
export const MDB_CLIENT_OPS = {useNewUrlParser: true, useUnifiedTopology: true};

export * from "./constants";