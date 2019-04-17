const { server } = require("../../server");
const { composePullRequests } = require("./service");
server.get("/api/pullRequests/:team", respond);

function respond(req, res, next) {
  return composePullRequests(req.params.team).then(prs => {
    res.send(prs);
    return next();
  });
}
