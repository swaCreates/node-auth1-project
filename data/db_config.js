// configures database and connects sqlite3 (knex) to server to perform CRUD operations

const knex= require('knex');
const knexfile= require('../knexfile');

module.exports= knex(knexfile.development);