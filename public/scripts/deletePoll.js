module.exports = function(knex) {
  function delPoll(pollURL) {
    knex('poll')
      .where("poll_url", pollURL)
      .del()
  }
  return {
    delPoll
  };
};
