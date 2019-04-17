const axios = require("axios");
const conf = require("../conf");
const { sub } = require("../../utils");
const { fetchLink } = require("../utils");
const { listMembers } = require("../members/service");
const pullRequests = "/2.0/pullrequests/{{user}}";

const listPullRequests = function(user) {
  return axios
    .get(`${conf.apiEndpoint}${sub({ user }, pullRequests)}`, {
      ...conf.auth
    })
    .then(response => response.data.values);
};

const composePullRequests = function(user) {
  return new Promise(resolve => {
    return listMembers(user).then(members => {
      const membersPromises = members.map(listPullRequests);

      Promise.all(membersPromises)
        .then(responses => {
          return responses
            .filter(response => response.length)
            .reduce((accu, curr) => {
              return [...accu, ...curr];
            }, []);
        })
        .then(prs => {
          return Promise.all(
            prs.map(pr =>
              fetchLink(pr.links.activity.href).then(activity => {
                pr.activity = activity;
                return pr;
              })
            )
          );
        })
        .then(prs => resolve(prs));
    });
  });
};

module.exports = { composePullRequests };
