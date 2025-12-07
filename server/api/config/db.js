const dbconn = require('./db');

let init = function () {
    conn.query("SHOW TABLES;", function (err, res) {
        if (err) throw err;
        if (res.length === 0) {
            let sql = ``;
        } else {
            console.log("Database has connected");
        }
    })
}