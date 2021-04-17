const { requireSignin, userMiddleware } = require("../common-middleware");
const express = require("express");
const { addOrder, getOrders, getOrder } = require("../controller/order");
const router = express.Router();

router.post("/addOrder", requireSignin, userMiddleware, addOrder);
router.get("/getOrders", requireSignin, userMiddleware, getOrders);
router.post("/getOrder", requireSignin, userMiddleware, getOrder);

module.exports = router;
