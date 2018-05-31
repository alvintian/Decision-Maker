module.exports = function(knex) {
  function addUser(userEmail, userName, cb) {
    knex('users')
      .insert([{"email": userEmail, "name": userName}])
      .then(rows =>
        cb(null, rows)
      )
      .catch(err => cb(err))
  }
  return {
    addUser
  };
};
