const db = require('../config/config');
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth.js");
const sendEmail = require("../utils/sendEmail");

async function login({ username, password }, callback) {
    db.query("SELECT * FROM users WHERE username='"+username+"'", function (err, row) {
        if (row != null) {
            if (bcrypt.compareSync(password, row[0].password)) {
                const token = auth.generateAccessToken({ userId: row[0].id, email: row[0].email });
                const refresh = auth.refreshAccessToken({ userId: row[0].id, email: row[0].email });
                db.query("SELECT * FROM session WHERE user_id="+row[0].id, function (err, wor) {
                    if (wor.length != 0) {
                        db.query("UPDATE session set token = ?, refresh = ? WHERE user_id = ?",
                            [token, refresh, row[0].id], function (err, result) {
                                if (err) {
                                    return callback({
                                        message: "Error msg: "+err,
                                    });
                                }
                                db.query("SELECT users.id, users.username, users.email, session.token, session.refresh, session.created_at, session.updated_at FROM users JOIN session ON users.id = session.user_id WHERE users.username = '"+username+"'",
                                    function (err, r) {
                                        r[0]['message'] = "Login success"
                                        return callback(null, r[0])
                                    }
                                )
                            }
                        )
                    } else {
                        const data = {
                            email: row[0].email,
                            token: token,
                            refresh: refresh,
                            user_id: row[0].id,
                            createAt: new Date(Date.now()),
                            updateAt: new Date(Date.now())
                        }
                        db.query("INSERT INTO session (email, token, refresh, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
                            [data.email, data.token, data.refresh, data.user_id, data.createAt, data.updateAt], function (err, result) {
                                if (err) {
                                    return callback({
                                        message: "Error msg: "+err
                                    });
                                }
                                db.query("SELECT users.id, users.username, users.email, session.token, session.refresh, session.created_at, session.updated_at FROM users JOIN session ON users.id = session.user_id WHERE users.username = '"+username+"'",
                                    function (err, r) {
                                        r[0]['message'] = "Login success"
                                        return callback(null, r[0]);
                                    }
                                )
                            }
                        )
                    }
                })
            } else {
                return callback({
                    message: "Password wrong!!!"
                })
            }
        } else {
            return callback({
                message: "Your account has not been registered",
            })
        }
    })
}

async function register(params, callback) {
    if (params.email === undefined) {
        return callback({ message: "E-mail Required" });
    }

    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(params.password, salt);
    db.query("SELECT * FROM users WHERE email="+params.email, function(err, row) {
        if (row != 0) {
            const userdata = {
                name: params.name,
                username: params.username,
                password: hash,
                email: params.email
            }
            const nametoarr = params.name.split(" ");
            const last = nametoarr[nametoarr.length - 1];
            nametoarr.pop();
            let profildata = {
                firstName: nametoarr.join(" "),
                lastName: last,
                avatar: 'assets/no-profile-picture-icon-15.jpg',
                password: params.password
            };
            if (params.name != null && params.username != null && params.password != null && params.email != null)  {
                db.query("INSERT INTO users (name, username, password, email) VALUES (?, ?, ?, ?)", [userdata.name, userdata.username, userdata.password, userdata.email], function(err, results) {
                    if (err) {
                        return callback({
                            message: "Error msg: "+err,
                        });
                    }
                    db.query("INSERT INTO profiles (first_name, last_name, avatar, password, user_id) VALUES (?, ?, ?, ?, ?)", [profildata.firstName, profildata.lastName, profildata.avatar, profildata.password, results.insertId], function (err, result) {
                        if (err) {
                            return callback({
                                message: "Error msg: "+err,
                            });
                        }
                        db.query("SELECT * FROM profiles WHERE id="+result.insertId, function(err, row) {
                            db.query("SELECT * FROM users WHERE id="+row[0].user_id, function(err, rows) {
                                return callback(null, rows[0]);
                            })
                        })
                    })
                })
            } else {
                return callback({ message: "Please complete the data first" });
            }
        } else {
            return callback({ message: "Your email already", })
        }
    })
    // db.query("SELECT * FROM users WHERE email="+params.email, function(err, row) {
    //     if (row == null) {
    //         const userdata = {
    //             username: params.username,
    //             password: hash,
    //             email: params.email
    //         }
    
    //         const nametoarr = params.name.split(" ");
    //         const last = nametoarr[nametoarr.length - 1];
    //         nametoarr.pop();
    //         const profildata = {
    //             firstName: nametoarr.join(" "),
    //             lastName: last,
    //             avatar: 'assets/no-profile-picture-icon-15.jpg',
    //             password: params.password
    //         };

    //         if (params.name != null && params.username != null && params.password != null && params.email != null) {
    //             db.run("INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
    //                 [params.username, hash, params.email],
    //                 function(err, results) {
    //                     if (err) {
    //                         return callback({
    //                             message: "Error msg: "+err,
    //                         });
    //                     }
    //                     db.run("INSERT INTO profiles (firstName, lastName, avatar, password, user_id) VALUES (?, ?, ?, ?, ?)",
    //                         [nametoarr.join(" "), last, 'assets/no-profile-picture-icon-15.jpg', params.password, this.lastID],
    //                         function (err, result) {
    //                             if (err) {
    //                                 return callback({
    //                                     message: "Error msg: "+err,
    //                                 });
    //                             }
    //                             db.get("SELECT * FROM profiles WHERE id="+this.lastID, function(err, row) {
    //                                 db.get("SELECT * FROM users WHERE id="+row.user_id, function(err, rows) {
    //                                     return callback(null, rows);
    //                                 })
    //                             })
    //                         })
    //                 })
    //         } else {
    //             return callback({ message: "Please complete the data first" });
    //         }
    //     } else {
    //         return callback({
    //             message: "Your email already",
    //         });
    //     }
    // })
    // db.close()
}

async function resetPassword(req, callback) {
    const { email } = req.body

    db.query("SELECT * FROM users WHERE email='"+email+"'", function(err, row) {
        if (row != null) {
            const token = auth.generateAccessToken({ userId: row[0].id, email: row[0].email });
            db.query("SELECT * FROM tokens WHERE user_id="+row[0].id, function(er, ls) {
                if (ls != null) {
                    db.query("DELETE FROM tokens WHERE user_id ="+ row[0].id, function(err) {
                        if (err) {
                            return callback({
                                message: "Error msg: "+err,
                            });
                        }
                        return;
                    })
                }
                db.query("INSERT INTO tokens (user_id, token) VALUES (?, ?)",
                    [row[0].id, token], function(err, result) {
                        if (err) {
                            return callback({
                                message: "Error msg: "+err,
                            });
                        }
                        db.query("SELECT * FROM tokens WHERE id="+this.lastID, function(error, wor) {
                            const hostname = req.headers.host;
                            const url = `http://${hostname}/api/auth/resetPassword/${wor[0].user_id}/${wor[0].token}`;
                            if (sendEmail(email, "Password Reset", url)) {
                                return callback(null, { message: "E-mail sent successfully" });
                            } else {
                                return callback({ message: "E-mail not sent" });
                            }
                        }) 
                    })
            })
        } else {
            return callback({
                message: "E-mail wrong!",
            });
        }
    })
}

async function checkResetPassword(request, callback) {
    db.query("SELECT * FROM users WHERE id="+request.params.id, function(err, row) {
        if (!row[0]) return callback({ message: "Invalid link" });
    })
    db.query("SELECT * FROM tokens WHERE user_id="+request.params.id, function(erro, rows) {
        if (!rows[0]) return callback({ message: "Invalid link" });
    })
    return callback(null, true);
}

async function changeResetPassword(request, callback) {
    db.query("SELECT * FROM users WHERE id="+request.params.id, function(err, row) {
        if (!row[0]) return callback({ message: "Invalid link" });
    })
    db.query("SELECT * FROM tokens WHERE user_id="+request.params.id, function(erro, rows) {
        if (!rows[0]) return callback({ message: "Invalid link" });
    })
    
    db.query("UPDATE users set password = '"+request.body.password+"' WHERE id = "+request.params.id,
    function (err, result) {
        if (err) {
            return callback({
                message: "Error msg: "+err,
            });
        }
        db.query("DELETE FROM tokens WHERE user_id = "+request.params.id, function(err) {
            if (err) {
                return callback({
                    message: "Error msg: "+err,
                });
            }
            return;
        })
        return callback(null, "Password has been change");
    });
}

async function profile(id, callback) {}

module.exports = {
    login,
    register,
    resetPassword,
    checkResetPassword,
    changeResetPassword,
    profile
};