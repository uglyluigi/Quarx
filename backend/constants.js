require('dotenv').config();

export const USE_TEST_DB = process.env.BLOG_USE_TEST_DB;
export const TEST_DB_URI = process.env.BLOG_DB_TEST_URI;
export const PROD_DB_URI = process.env.PROD_DB_URI;
export const DB_URI = USE_TEST_DB === "true" ? TEST_DB_URI : PROD_DB_URI;
export const BLOG_DB_NAME = USE_TEST_DB ? 'test' : 'quarx-blog-db';
export const BLOG_COLLECTION_NAME = 'blog-posts';
export const PORT = process.env.PORT;

export * from "./constants"