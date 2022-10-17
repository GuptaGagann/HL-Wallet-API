const fs = require('fs');
const { promisify } = require('util');
const appendFile = promisify(fs.appendFile);
async function requestLogger(req, res, next) {
    try {
        const logMessage = `${new Date()} - ${req.method} - ${req.url}\n`;
        await appendFile('RequestLog.log', logMessage);
        next();
    } catch (err) {
        next(err);
    }
}
module.exports = requestLogger;