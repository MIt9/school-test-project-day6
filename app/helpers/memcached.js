var Memcached = require("memcached"),
    config = require("config"),
    memcachedClient = new Memcached(
        config.memcached.port,
        config.memcached.host,
        {});
    Q = require("q");


module.exports = {

    /**
     * Достает из мемкеша значение по указанному ключу
     * @param {string} key название ключа
     * @returns {promise}
     */
    get: function (key) {
        var deferred = Q.defer();

        memcachedClient.get(key, function (err, result) {
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

        memcachedClient.set(key, value, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                memcachedClient.expire(key, ttl, function (err, result) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(result);
                    }
                });
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

        memcachedClient.del(key, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    }
};

