module.exports = function routes(app) {
    "use strict";

    var Router = require('koa-router');
    var router = new Router();

    router
        .post("/redis", require("../controllers/redisController").postAction)
        .get("/redis/:key", require("../controllers/redisController").getAction)
        .delete("/redis/:key", require("../controllers/redisController").deleteAction);
        .post("/memcache", require("../controllers/memcacheController").postAction)
        .get("/memcache/:key", require("../controllers/memcacheController").getAction)
        .delete("/memcache/:key", require("../controllers/memcacheController").deleteAction);

    app.use(router.middleware());

};