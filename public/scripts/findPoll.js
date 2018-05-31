module.exports = function(knex) {
  function findPollDis(pollURL, cb) {
    knex('poll')
      .where("poll_url", "ilike", pollURL)
      .then(rows =>
        cb(null, rows)
      )
      .catch(err => cb(err))
  }
  return {
    findPollDis
  };
};
