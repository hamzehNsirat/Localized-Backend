/*
--------------------
-- PURCHASE CYCLE --
- Create Purchase 
- Get Purchase List By Retailer
- Get Purchase List By Supplier
- Get Purchase Details
- Update Purchase
- Update Purchase Status
---------------------
*/
const purchaseService = require("../services/purchaseService");
const errorHandler = require("../middlewares/errorHandler");
const { executeQuery } = require("../config/database");
const createPurchase = async (req, res) => {
  try {
    if (
      req.body.quotationId == null ||
      req.body.buyerId == null ||
      req.body.supplierId == null ||
      req.body.paymentAmount == null
    ) {
      return errorHandler.handleError(res, "E0051");
    }
    const result = await purchaseService.createPurchase(req.body);
    if (result.success == false) {
      return errorHandler.handleError(res, "E0052", result);
    }
    return errorHandler.handleSuccess(res, result);
  } catch (error) {
    return errorHandler.handleError(res, "E0052");
  }
};
module.exports = {
  createPurchase,
};