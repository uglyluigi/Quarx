require('dotenv').config();

export const PORT = process.env.PORT;
export const TEST_DB_URI = process.env.BLOG_DB_TEST_URI;
export const PROD_DB_URI = process.env.PROD_DB_URI;
export const IS_TEST_ENV = process.env.TEST_ENV;
export const DB_URI = IS_TEST_ENV === "true" ? TEST_DB_URI : PROD_DB_URI;
export const BASE_URL = (IS_TEST_ENV ? "http://localhost" : "http://www.quarx.com") + `:${PORT}`;

export * from "./constants";