// Contains purchase-related logic.
const Supplier = require("../models/Supplier");
const Purchase = require("../models/Purchase");
const Quotation = require("../models/Quotation");
const Notification = require("../models/Notification");
const { sendEmail } = require("../config/email");
const env = require("../config/env");
const {
  executeQuery,
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
} = require("../config/database");
const PurchaseTransaction = require("../models/PurchaseTransaction");
const purchaseService = {
  async createPurchase(inputData) {
    await beginTransaction();
    const purchaseDetails = {
      quotationId: inputData.quotationId,
      buyerId: inputData.buyerId,
      supplierId: inputData.supplierId,
      purchaseStatusId: 1,
      paymentReference: null,
      reconciliationReference: null,
      externalPayReference: null,
      paymentAmount: inputData.paymentAmount,
      paymentCurrency: "JOD",
      paymentExchangeRate: 1,
      lastModifiedBy: 1,
      paymentMethod: "CASH",
      creditCardHolder: null,
      creditCardNumber: null,
      creditCardExpiry: null,
      creditCVC: null,
      supplierIban: null,
      supplierBankAccountNum: null,
      supplierBankName: null
    };
    const purchaseInsertDb = await Purchase.insertPurchase(purchaseDetails);
    if (
      !purchaseInsertDb[0].out_purchase_id ||
      purchaseInsertDb[0].out_purchase_id == "-1"
    ) {
      await rollbackTransaction();
      return {
        success: false,
        error: "Failed to Create Purchase",
      };
    }
    const transactionDetails = {
      purchaseId: purchaseInsertDb[0].out_purchase_id,
      transactionStatusId: 1,
      transactionDetails: {
        details: `new purchase by: ${inputData.buyerId}, to: ${inputData.supplierId}.`,
      },
      lastModifiedDate:null,
      lastModifiedBy: 1,
    };
    try {
      const transactionInsertDb =
        await PurchaseTransaction.insert(transactionDetails);
        if (
            !transactionInsertDb[0].out_purchase_transaction_id ||
            transactionInsertDb[0].out_purchase_transaction_id == "-1"
        ) {
            await rollbackTransaction();
            return {
            success: false,
            error: "Failed to Create Transaction Details",
            };
        }
    } 
    catch {
      await rollbackTransaction();
      return {
        success: false,
        error: "Failed to Create Transaction Details",
      };
    }
    await commitTransaction();
    // SEND RETAILER EMAIL FOR PURCHASE
    const queryEmail = await executeQuery(
      "SELECT user_email FROM user_localized WHERE user_id = (SELECT retailer_user_id FROM retailer WHERE retailer_id = $1)",
      [inputData.buyerId]
    );
    const sendEmailNotif = await sendEmail(
      queryEmail[0].user_email,
      "Purchase Created | Localized",
      `your Purchase Order for Quotation: ${inputData.quotationId} has been Created Successfully,
      Purchase ID: ${purchaseInsertDb[0].out_purchase_id}`,
      `<p>your Purchase Order for Quotation: ${inputData.quotationId} has been Created Successfully,
      Purchase ID: ${purchaseInsertDb[0].out_purchase_id}</p>`
    );

    const user = await executeQuery(
      "SELECT supplier_user_id FROM supplier WHERE supplier_id = $1",
      [inputData.supplierId]
    );
    const userB = await executeQuery(
      "SELECT retailer_user_id FROM retailer WHERE retailer_id = $1",
      [inputData.buyerId]
    );
    notificationData = {
      notificationType: 8,
      notifiedUserId: user[0].supplier_user_id,
      notificationPriority: 2,
      notificationSubject: "New Purchase Created",
      notificationDetails: `a Purchase has been Created regarding this Quotation: ${inputData.quotationId}`,
      lastModifiedBy: 1,
    };
    await Notification.insertNotification(notificationData);

    notificationData = {
      notificationType: 8,
      notifiedUserId: userB[0].retailer_user_id,
      notificationPriority: 2,
      notificationSubject: "New Purchase Created",
      notificationDetails: `a Purchase has been Created regarding this Quotation: ${inputData.quotationId}`,
      lastModifiedBy: 1,
    };
    await Notification.insertNotification(notificationData);


    return {
      success: true,
    };
  },
};
module.exports = purchaseService;