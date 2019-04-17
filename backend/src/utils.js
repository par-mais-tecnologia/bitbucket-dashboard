const sub = (obj, t) =>
  Object.keys(obj).reduce(
    (agg, curr) => agg.replace(new RegExp(`{{${curr}}}`, "g"), obj[curr]),
    t
  );

module.exports = { sub };
