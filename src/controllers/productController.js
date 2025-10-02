const Product = require("../models/product");
const {
  createSchema,
  updateSchema,
  stockOperationSchema,
} = require("../validators/productValidator");

const sequelize = require("../db");
const { Op, col } = require("sequelize");

async function createProduct(req, res) {
  const { error, value } = createSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  const product = await Product.create(value);
  return res.status(201).json(product);
}

async function listProducts(req, res) {
  const products = await Product.findAll();
  res.json(products);
}

async function getProduct(req, res) {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
}

async function updateProduct(req, res) {
  const { error, value } = updateSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  if (value.stock_quantity !== undefined && value.stock_quantity < 0) {
    return res.status(400).json({ error: "Stock cannot be negative" });
  }

  await product.update(value);
  res.json(product);
}

async function deleteProduct(req, res) {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  await product.destroy();
  res.status(204).send();
}

async function increaseStock(req, res) {
  const { error, value } = stockOperationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  product.stock_quantity += value.amount;
  await product.save();
  res.json(product);
}

async function decreaseStock(req, res) {
  const { error, value } = stockOperationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  if (product.stock_quantity < value.amount) {
    return res.status(400).json({ error: "Insufficient stock" });
  }

  product.stock_quantity -= value.amount;
  await product.save();
  res.json(product);
}

async function lowStockProducts(req, res) {
  const products = await Product.findAll({
    where: {
      low_stock_threshold: { [Op.gt]: 0 },
      stock_quantity: { [Op.lt]: col("low_stock_threshold") },
    },
  });
  res.json(products);
}

module.exports = {
  createProduct,
  listProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  increaseStock,
  decreaseStock,
  lowStockProducts,
};
