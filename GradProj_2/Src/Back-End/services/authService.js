
// Handles password hashing, token generation, and validation
const User = require("../models/User"); // User model
const Establishment = require("../models/Establishment"); // Establishment model
const Supplier = require("../models/supplier");
const Retailer = require("../models/retailer");
const Admin = require("../models/Adminstrator");
const Factory = require("../models/Factory"); 
const RetailStore = require("../models/RetailStore");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const {
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
} = require("../config/database");

const authService = {
  async registerUser(userData, establishmentData) {
    const client = await beginTransaction();
    try {
       // Validate userType
      if (![1, 2, 3].includes(userData.userType)) {
        throw new Error("Invalid user type.");
      }
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.userPassword, 1);
      userData.password = hashedPassword;

      // Insert user
      const userResult = await User.create(userData);
      const newUserId = userResult[0].res;
      let newAdminId, newRetailerId, newSupplierId, establishmentId;
      console.log("After User Insert");
      console.log("UserType " + userData.userType);

      // Role-specific logic
      if (userData.userType === 1) {
        // Admin creation logic (if needed)
        const adminResult = await Admin.insertAdministrator(1,newUserId);
        newAdminId = adminResult[0].out_admin_id;

      } else if (userData.userType === 2) {
        // Supplier creation logic
        if (!establishmentData) {
          throw new Error("Establishment data is required for suppliers.");
        }
        // Insert establishment
        establishmentData.lastModifiedBy = newUserId;
        const establishmentResult =
          await Establishment.insertEstablishment(establishmentData);
        establishmentId = establishmentResult[0].out_establishment_id;

        const inputData = {
          supplierUserId: newUserId,
          supplierTaxIdentificationNum: userData.TIN,
          supplierBankAccountNum: userData.bankAccountNumber,
          supplierIban: userData.IBAN,
          supplierComplianceIndicator: 1,
          supplierComplaintCount: 0,
          supplierPositiveReviewCount: 0,
          lastModifiedBy: newUserId,
        }; 
        // Insert supplier
        const supplierResult = await Supplier.insertSupplier(inputData);
        newSupplierId = supplierResult[0].out_supplier_id;

        // Insert factory
        const factoryResult = await Factory.insertOwnedFactory(
          newSupplierId,
          establishmentId
        );
      } else  {
        // Retailer creation logic
        if (!establishmentData) {
          throw new Error("Establishment data is required for retailers.");
        }

        // Insert establishment
        establishmentData.lastModifiedBy = newUserId;
        const establishmentResult =
          await Establishment.insertEstablishment(establishmentData);
        establishmentId = establishmentResult[0].out_establishment_id;

        // Insert retailer
        const inputData = {
          retailerUserId: newUserId,
          retailerTaxIdentificationNum: userData.TIN,
          retailerBankAccountNum: userData.bankAccountNumber,
          retailerIban: userData.IBAN,
          retailerComplianceIndicator: 1,
          retailerComplaintCount: 0,
          lastModifiedBy: newUserId,
        };
        const retailerResult = await Retailer.insertRetailer(inputData);
        console.log(retailerResult);
        newRetailerId = retailerResult[0].out_retailer_id;
        // Insert factory
        const RetailStoreResult = await RetailStore.insertRetailStore(
          newSupplierId,
          establishmentId,
          newUserId
        );

      }

      await commitTransaction(client);
      const payload = {
        userId: newUserId,
        userType: userData.userType,
        username: userData.userName,
      };
      // Generate JWT Token
      const token = jwt.sign(
        payload,
        keys.jwtSecret, // Use a secure key stored in .env
        { expiresIn: "1d" } // Token expiry
      );
      return {
        success: true,
        userId: newUserId,
        adminId: newAdminId || null,
        supplierId: newSupplierId || null,
        retailerId: newRetailerId || null,
        factoryId: newSupplierId? establishmentId + '-' + newSupplierId : null,
        retailstoreId: newRetailerId ? establishmentId + '-' + newRetailerId : null,
        token: token,
      };
    } catch (error) {
      await rollbackTransaction(client);
      throw error;
    }
  },
};

module.exports = authService;
