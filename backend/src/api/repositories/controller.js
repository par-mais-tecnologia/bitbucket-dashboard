const { server } = require("../../server");
const {
  composeRepositories,
  getRepository,
  listBranches,
  listTags,
  compareBranch
} = require("./service");
server.get("/api/repositories/:user", listRepositoriesHandler);

function listRepositoriesHandler(req, res, next) {
  return composeRepositories(req.params.user).then(repositories => {
    res.send(repositories);
    return next();
  });
}

server.get("/api/repositories/:user/:repo", getRepositoryHandler);

function getRepositoryHandler(req, res, next) {
  return getRepository(req.params.user, req.params.repo).then(repository => {
    res.send(repository);
    return next();
  });
}

server.get("/api/repositories/:user/:repo/refs/branches", listBranchesHandler);

function listBranchesHandler(req, res, next) {
  return listBranches(req.params.user, req.params.repo).then(branches => {
    res.send(branches);
    return next();
  });
}

server.get("/api/repositories/:user/:repo/refs/tags", listTagsHandler);

function listTagsHandler(req, res, next) {
  return listTags(req.params.user, req.params.repo).then(tags => {
    res.send(tags);
    return next();
  });
}

server.get(
  "/api/repositories/:user/:repo/compare/:branch",
  compareBranchHandler
);

function compareBranchHandler(req, res, next) {
  return compareBranch(
    req.params.user,
    req.params.repo,
    req.params.branch
  ).then(compare => {
    res.send(compare);
    return next();
  });
}
