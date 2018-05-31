module.exports = function(knex) {
  function addPoll(pollTitle, pollDesc, pollURL, adminURL, cb) {
    knex('poll')
      .insert([{"question_description": pollTitle, "description": pollDesc, "poll_url": pollURL, "admin_url":adminURL}])
      .then(rows =>
        cb(null, rows)
      )
      .catch(err => cb(err))
  }
  return {
    addPoll
  };
};
