const restify = require("restify");
const corsMiddleware = require("restify-cors-middleware");
const server = restify.createServer();
const url = require("url");

const cors = corsMiddleware({
  origins: ["*"],
  allowHeaders: ["Authorization"],
  exposeHeaders: ["Authorization"]
});

server.pre(cors.preflight);
server.use(cors.actual);

server.get(
  "*",
  restify.plugins.serveStatic({
    directory: `${__dirname}/../../frontend/build`,
    default: "index.html",
    maxAge: 0
  })
);

server.get("/apis", (req, res, next) => {
  const endpoints = Object.values(server.router._registry._routes).map(
    route => route.spec
  );
  res.send(endpoints);
  next();
});

server.listen(8080, function() {
  console.log("%s listening at %s", server.name, server.url);
});

module.exports = { server };
