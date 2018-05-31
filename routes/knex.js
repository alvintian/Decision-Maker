const knex = require('knex')(require('./knexfile'))
module.exports = {
  insertUser ({ username, email }) {
    return knex('users').insert({
      username,
      email
    })
  }
}