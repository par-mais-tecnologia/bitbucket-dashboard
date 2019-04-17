const axios = require("axios");
const teams = "/2.0/teams?role=member";
const conf = require("../conf");

const listTeams = function() {
  return axios
    .get(`${conf.apiEndpoint}${teams}`, { ...conf.auth })
    .then(response => response.data.values.map(team => team.username));
};

module.exports = { listTeams };
