const logs = require('./dbl')

const addLog = function(ip ,start, end) {
    logs.push({
        ip : ip,
        date: new Date().toLocaleString(),
        duration: (end.getMilliseconds() - start.getMilliseconds())/1000 + "s"
    })
}

const getLogs = function() {
    return logs
}

module.exports = {
    addLog,
    getLogs
} 