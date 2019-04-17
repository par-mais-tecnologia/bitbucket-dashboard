const { server } = require("../../server");
const { listTeams } = require("./service");
server.get("/api/teams", respond);

function respond(req, res, next) {
  return listTeams().then(teams => {
    res.send(teams);
    return next();
  });
}
