const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/productController");

router.post("/", ctrl.createProduct);
router.get("/", ctrl.listProducts);
router.get("/low-stock", ctrl.lowStockProducts);
router.get("/:id", ctrl.getProduct);
router.put("/:id", ctrl.updateProduct);
router.delete("/:id", ctrl.deleteProduct);

router.post("/:id/stock/increase", ctrl.increaseStock);
router.post("/:id/stock/decrease", ctrl.decreaseStock);

module.exports = router;
