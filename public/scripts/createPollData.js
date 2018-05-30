module.exports = function(knex) {
  function addPoll(pollTitle, pollDesc, cb) {
    knex('poll')
      .insert([{"question_description": pollTitle, "description": pollDesc}]) ///associate with an id?
      .then(rows =>
        cb(null, rows)
      )
      .catch(err => cb(err))
  }
  return {
    addPoll
  };
};
