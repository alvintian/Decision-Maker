module.exports = function(knex) {
  function findPollUrls(pollURL, cb) {
    knex('poll')
    .select("poll_url", "admin_url", "email")
    .join('users', "user_id_fk", "=", "id")
      .where("poll_url", pollURL)
      .then(rows =>
        cb(null, rows)
      )
      .catch(err => cb(err))
  }
  return {
    findPollUrls
  };
};
