const db = require("../helper/db_connection");
const moment = require('moment')
const fs = require('fs')


module.exports = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM products`;
      db.query(sql, (err, results) => {
        if (err) {
          reject({
            message: "Something wrong",
          });
        }
        resolve({
          message: "Get all from product success",
          status: 200,
          data: results.map((result) => {
            return {
              ...result,
              expiredDate: moment(result.expiredDate).format("DD-MM-YYYY"),
            };
          }),
        });
      });
    });
  },
  getById: (req, res) => {
    return new Promise((resolve, reject) => {
      const { product_id } = req.params;
      const sql = `SELECT * FROM products WHERE product_id=${product_id}`;
      db.query(sql, (err, results) => {
        if (err) {
          reject({
            message: "Something wrong",
          });
        }
        resolve({
          message: "Get product by id success",
          status: 200,
          data: results
        });
      });
    });
  },
  add: (req, res) => {
    return new Promise((resolve, reject) => {
      const { name, description, price, stock, expiredDate, cover } = req.body;

      const sql = `INSERT INTO products(name, description, price, stock, expiredDate, cover) VALUES('${name}','${description}','${price}','${stock}','${expiredDate}','${cover}')`;

      db.query(sql, (err, results) => {
        if (err) {
          reject({ message: "Something wrong" });
        }
        resolve({
          message: "Add new product success",
          status: 201,
          data: {
            id: results.insertId,
            ...req.body,
          },
        });
      });
    });
  },
  update: (req, res) => {
    return new Promise((resolve, reject) => {
      const { product_id } = req.params;
      console.log(product_id)
      db.query(
        `SELECT * FROM products WHERE product_id=${product_id}`,
        (err, results) => {
          if (err) {
            res.send({ message: "Something error" });
          }

          const previousData = {
            ...results[0],
            ...req.body,
          };

          const { name, description, price, stock, expiredDate, cover } = previousData;

          const tempImg = results[0].cover;
          if (req.body.cover) {
            fs.unlink(`uploads/products/${tempImg}`, function (err) {
              if (err) {
                console.log(err)
                reject({
                  message: "Something wrong",
                });
              }
            });
          }

          db.query(
            `UPDATE products SET name='${name}', description='${description}', price='${price}', stock='${stock}', expiredDate='${expiredDate}', cover='${cover}' WHERE product_id='${product_id}'`,
            (err, results) => {
              if (err) {
                console.log(err)
                reject({ message: "Something wrong" });
              }
              resolve({
                message: "Update product success",
                status: 201,
                data: results,
                changed: { ...req.body },
              });
            }
          );
        }
      );
    });
  },
  remove: (req, res) => {
    return new Promise((resolve, reject) => {
      const { product_id } = req.params;
      db.query(
        `SELECT cover FROM products WHERE product_id=${product_id}`,
        (err, results) => {
          if (!results.length) {
            reject({
              message: "Data id not found",
            });
          } else {
            const tempImg = results[0].cover;
            db.query(
              `DELETE FROM products WHERE product_id=${product_id}`,
              (err, results) => {
                if (err) {
                  reject({ message: "Something wrong" });
                }
                fs.unlink(`uploads/products/${tempImg}`, function (err) {
                  if (err) {
                    resolve({
                      message: "Delete product success",
                      status: 201,
                      data: results,
                    });
                  }
                  resolve({
                    message: "Delete product success",
                    status: 201,
                    data: results,
                  });
                });
              }
            );
          }
        }
      );
    });
  },
};
