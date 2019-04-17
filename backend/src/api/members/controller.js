const { server } = require("../../server");
const { listMembers } = require("./service");
server.get("/api/members/:team", respond);

function respond(req, res, next) {
  return listMembers(req.params.team).then(teams => {
    res.send(teams);
    return next();
  });
}
