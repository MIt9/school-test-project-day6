var Memcached = require("memcached"),
    config = require("config"),

    memcachedClient = new Memcached('localhost:11211');
   /* memcachedClient = new Memcached(
        config.memcached.port,
        config.memcached.host,
        {});*/
    Q = require("q");


module.exports = {

    /**
     * Достает из мемкеша значение по указанному ключу
     * @param {string} key название ключа
     * @returns {promise}
     */
    get: function (key) {
        var deferred = Q.defer();

        memcachedClient.gets(key, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    },

    /**
     * Устанавливает ключ с указанным значением в мемкеш
     * @param {string} key название ключа
     * @param {string|number} value значение
     * @param {number} ttl время жизни в секундах
     * @returns {promise}
     */
    set: function (key, value, ttl) {
        var deferred = Q.defer();
       // memcached.set('foo', 'bar', 10, function (err) { /* stuff */ });
        memcachedClient.set(key, value, ttl, function (err) {
            if (err) {
                deferred.reject(err);
            } else {
              /*  memcachedClient.expire(key, ttl, function (err, result) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(result);
                    }
                });*/
            }
        });

        return deferred.promise;
    },

    /**
     * Удаляет ключ из мемкеша
     * @param {string} key название ключа
     * @returns {promise}
     */
    delete: function (key) {
        var deferred = Q.defer();

        memcachedClient.del(key, function (err) {
            if (err) {
                deferred.reject(err);
            } else {
                //deferred.resolve(result);
            }
        });

        return deferred.promise;
    }
};

