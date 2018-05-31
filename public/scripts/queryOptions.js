module.exports = function(knex) {
  function findPollDis(pollURL, cb) {
    knex('poll')
      .join("options", "option_id", "=", "poll_id")
      .where("admin_url", adminURL)
      .then(rows =>
        cb(null, rows)
      )
      .catch(err => cb(err))
  }
  return {
    findPollDis
  };
};
