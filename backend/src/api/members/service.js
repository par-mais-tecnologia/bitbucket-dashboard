const axios = require("axios");
const members = "/2.0/teams/{{team}}/members";
const conf = require("../conf");
const { sub } = require("../../utils");

const listMembers = function(team) {
  return axios
    .get(`${conf.apiEndpoint}${sub({ team }, members)}`, { ...conf.auth })
    .then(response => response.data.values.map(member => member.username));
};

module.exports = { listMembers };
