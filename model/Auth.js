// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require("../helper/db_connection");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


module.exports = {
  login: (req, res) => {
    const { email, password } = req.body;
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT user_id, password, role FROM users WHERE email='${email.toLowerCase()}'`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: "Something wrong" });
          }else {
            if(!results.length) {
              reject({message: "Invalid Email/Password"})
            } else {
              bcrypt.compare(password, results[0].password, (errHashing, successHashing) => {
                if(errHashing) {
                  reject({
                    message: "Ada Masalah Saat Login, Harap coba lagi."
                  })
                }
                if(successHashing) {
                  const token = jwt.sign({ user_id: results[0].user_id, role: results[0].role}, process.env.JWT_SECRET_KEY, {expiresIn: '1 day'});
                  resolve({
                    message: "Login success",
                    status: 200,
                    data: {
                      token,
                      user_id: results[0].user_id,
                      email: email,
                      role: results[0].role
                    },
                  });
                }else {
                  reject({ 
                    message: "Invalid Email/Password" 
                  })
                }
              });
            }
          }
        }
      );
    });
  },
  register: (req, res) => {
    const { firstName, lastName, password, email, phone, dateBirth } = req.body;
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, function (err, hashedPassword) {
        if (err) {
          reject({ message: "Something wrong" });
        } else {
          db.query(
            `INSERT INTO users(firstName, lastName, password, email, phone, dateBirth) VALUES('${firstName}', '${lastName}', '${hashedPassword}', '${email}', '${phone}', '${dateBirth}')`,
            (err, results) => {
              if (err) {
                reject({ message: "Email already used" });
              }
              resolve({
                message: "Register success",
                status: 201,
                data: results,
              });
            }
          );
        }
      });
    });
  },
};