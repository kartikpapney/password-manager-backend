const Redis = require('redis');
const client = Redis.createClient();
const redisClient = async() => {
    return new Promise((resolve, reject) => {
        resolve(client);
    })
}
const connect = async() => {
    return new Promise((resolve, reject) => {
        client.connect();
        resolve();
    });
}
module.exports = {redisClient, connect};