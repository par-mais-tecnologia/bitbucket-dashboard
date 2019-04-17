const { lstatSync, readdirSync } = require("fs");
const modules = readdirSync(`${__dirname}/api/`)
  .filter(module => lstatSync(`${__dirname}/api/${module}`).isDirectory())
  .filter(module =>
    lstatSync(`${__dirname}/api/${module}/controller.js`).isFile()
  );

modules.forEach(module => require(`${__dirname}/api/${module}/controller.js`));
