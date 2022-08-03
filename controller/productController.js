const Products = require("../model/Product");

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const results = await Products.get(req, res);
      return res.status(200).send(results);
    } catch (error) {
      return res.send(error);
    }
  },
  addNewProducts: async (req, res) => {
    try {
        const reqModifier = {
          ...req,
          body: { ...req.body, cover: req.file.filename }
        };
        const results = await Products.add(reqModifier, res);
        return res.status(201).send(results);
      } catch (error) {
        return res.status(400).send(error);
      }
  },
  updateProducts: async (req, res) => {
    try {
      let reqModifier = {
        ...req,
      };
      if(req.file) {
        reqModifier = {
          ...req,
          body: { ...req.body, cover: req.file.filename },
        }
      }
      const results = await Products.update(reqModifier, res);
      return res.status(201).send(results);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  deleteProducts: async (req, res) => {
    try {
      const results = await Products.remove(req, res);
      return res.status(201).send(results);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
