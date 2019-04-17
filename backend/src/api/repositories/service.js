const axios = require("axios");
const conf = require("../conf");
const { sub } = require("../../utils");
const { fetchLink } = require("../utils");
const repositoriesURI = "/2.0/repositories/{{user}}";
const repositoryURI = "/2.0/repositories/{{user}}/{{repo}}";
const branchesURI = "/2.0/repositories/{{user}}/{{repo}}/refs/branches";
const tagsURI = "/2.0/repositories/{{user}}/{{repo}}/refs/tags?sort=-name";
const compareURI =
  "/internal/repositories/{{user}}/{{repo}}/branch-list/?q=name%20%3D%20%22{{branch}}%22%20AND%20%28ahead%20%3E%200%20OR%20ahead%20%3D%20null%29&pagelen=25&fields=-values.target.author.user.account_id%2C%2Bvalues.pullrequest.state%2C%2Bvalues.pullrequest.created_on%2C-values.statuses";

const listRepositories = function(user) {
  return fetchLink(`${conf.apiEndpoint}${sub({ user }, repositoriesURI)}`).then(
    response => response
  );
};

const composeRepositories = function(user) {
  return new Promise(resolve => {
    return listRepositories(user).then(repositories => {
      const tagsPromises = repositories.map(repo =>
        listTags(user, repo.slug)
          .then(tags => {
            repo.tags = tags;
            return repo;
          })
          .catch(() => {})
      );
      const comparePromises = repositories.map(repo =>
        compareBranch(user, repo.slug, "develop")
          .then(compare => {
            repo.compare = compare;
            return repo;
          })
          .catch(() => {})
      );

      Promise.all(tagsPromises).then(() => {
        Promise.all(comparePromises).then(() => {
          resolve(repositories);
        });
      });
    });
  });
};

const getRepository = function(user, repo) {
  return axios
    .get(`${conf.apiEndpoint}${sub({ user, repo }, repositoryURI)}`, {
      ...conf.auth
    })
    .then(response => response.data);
};

const listBranches = function(user, repo) {
  return axios
    .get(`${conf.apiEndpoint}${sub({ user, repo }, branchesURI)}`, {
      ...conf.auth
    })
    .then(response => response.data);
};

const listTags = function(user, repo) {
  return axios
    .get(`${conf.apiEndpoint}${sub({ user, repo }, tagsURI)}`, {
      ...conf.auth
    })
    .then(response => response.data.values);
};

const compareBranch = function(user, repo, branch) {
  return axios
    .get(`${conf.apiEndpoint}${sub({ user, repo, branch }, compareURI)}`, {
      ...conf.auth
    })
    .then(response => response.data.values);
};

module.exports = {
  listRepositories,
  composeRepositories,
  getRepository,
  listBranches,
  listTags,
  compareBranch
};
