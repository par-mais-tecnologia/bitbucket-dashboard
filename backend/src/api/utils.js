const axios = require("axios");
const conf = require("./conf");

const fetchLink = function(link) {
  const responses = [];
  return fetchNext(link, responses).then(() => {
    return responses;
  });
};

const fetchNext = function(next, responses) {
  return new Promise(resolve => {
    axios.get(next, { ...conf.auth }).then(response => {
      responses.push(...response.data.values);
      if (response.data.next) {
        fetchNext(response.data.next, responses).then(() => resolve());
      } else {
        resolve();
      }
    });
  });
};

module.exports = { fetchLink };
