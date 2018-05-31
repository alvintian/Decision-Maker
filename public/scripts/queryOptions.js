module.exports = function(knex) {
  function findPollData(adminURL, cb) {
    knex('poll')
    .select("poll_question", "choice_description", "score")
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
