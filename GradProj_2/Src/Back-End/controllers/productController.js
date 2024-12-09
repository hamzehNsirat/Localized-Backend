// Controls the Route / Service Interaction for the following:
/*
----------------------------
-- PRODUCT Retailer CYCLE --
- Get Retailer Marketplace 
- Get Retailer Products By Category
- Search Retailer Products
- Get Supplier Profile
----------------------------
-- PRODUCT Supplier CYCLE --
- Get Supplier Products
- Get Product Details
- Add Product
- Update Product Status
- Update Product Details
- Get Supplier Marketplace
- Search Supplier Products
----------------------------
*/
const productService = require("../services/productService");
const errorHandler = require("../middlewares/errorHandler");
const getRetMarketplaceProducts = async (req, res) => {
  try {
    if (
      req.body.retailerId == null ||
      req.body.pageSize   == null ||
      req.body.pageIndex  == null
    ) {
      return errorHandler.handleError(res, "E0035");
    }
    const result = await productService.getRetMarketplaceProducts(req.body);
    if (result.success == false) {
      return errorHandler.handleError(res, "E0036", result);
    }
    return errorHandler.handleSuccess(res, result);
  } catch (error) {
    return errorHandler.handleError(res, "E0036");
  }
};
const getRetProductsByCategory = async (req, res) => {
  try {
    if (
      (req.body.industryList == null && req.body.categoriesList == null) ||
      req.body.pageIndex == null ||
      req.body.pageSize  == null
    ) {
      return errorHandler.handleError(res, "E0037");
    }
    const result = await productService.getRetProductsByCategory(req.body);
    if (result.success == false) {
      return errorHandler.handleError(res, "E0036", result);
    }
    return errorHandler.handleSuccess(res, result);
  } catch (error) {
    return errorHandler.handleError(res, "E0036");
  }
};

const searchRetProducts = async (req, res) => {
  try {
    if (
      req.body.searchTerm == null ||
      req.body.pageIndex == null ||
      req.body.pageSize == null
    ) {
      return errorHandler.handleError(res, "E0038");
    }
    const result = await productService.searchRetProducts(req.body);
    if (result.success == false) {
      return errorHandler.handleError(res, "E0039", result);
    }
    return errorHandler.handleSuccess(res, result);
  } catch (error) {
    return errorHandler.handleError(res, "E0039");
  }
};
const getRetSupplierProducts = async (req, res) => {
  try {
    if (
      req.body.supplierId == null ||
      req.body.pageIndex == null ||
      req.body.pageSize == null
    ) {
      return errorHandler.handleError(res, "E0040");
    }
    const result = await productService.getRetSupplierProducts(req.body);
    if (result.success == false) {
      return errorHandler.handleError(res, "E0039", result);
    }
    return errorHandler.handleSuccess(res, result);
  } catch (error) {
    return errorHandler.handleError(res, "E0039");
  }
};

module.exports = {
  getRetMarketplaceProducts,
  getRetProductsByCategory,
  searchRetProducts,
  getRetSupplierProducts,
};
