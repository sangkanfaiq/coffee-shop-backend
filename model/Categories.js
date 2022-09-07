const db = require("../helper/db_connection");


module.exports = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM categories`;
      db.query(sql, (err, results) => {
        if (err) {
          reject({
            message: "Something wrong",
          });
        }
        resolve({
          message: "Get all from categories success",
          status: 200,
          data: results
        });
      });
    });
  },
  add: (req, res) => {
    return new Promise((resolve, reject) => {
      const { category_name } = req.body;

      const sql = `INSERT INTO categories(category_name) VALUES('${category_name}')`;

      db.query(sql, (err, results) => {
        if (err) {
          reject({ message: "Something wrong" });
        }
        resolve({
          message: "Add new category success",
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
      const { category_id } = req.params;
      console.log(category_id)
      db.query(
        `SELECT * FROM categories WHERE category_id=${category_id}`,
        (err, results) => {
          if (err) {
            res.send({ message: "Something error" });
          }

          const previousData = {
            ...results[0],
            ...req.body,
          };

          const { category_name } = previousData;

          db.query(
            `UPDATE categories SET category_name='${category_name}' WHERE category_id='${category_id}'`,
            (err, results) => {
              if (err) {
                console.log(err)
                reject({ message: "Something wrong" });
              }
              resolve({
                message: "Update category success",
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
    // delete done
    return new Promise((resolve, reject) => {
      const { category_id } = req.params;
      db.query(
        `DELETE FROM categories WHERE category_id=${category_id}`,
        (err, results) => {
          if (err) {
            reject({ message: "Something wrong" });
          }
          resolve({
            message: "Delete categories success",
            status: 200,
            data: results,
          });
        }
      );
    });
  },
};
