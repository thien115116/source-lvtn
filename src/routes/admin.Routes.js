const express = require("express");
const Router = express.Router();
const _controllerAdmin = require("../controllers/admin.Controller");
const _controllerBanner = require("../controllers/banner.Controller");
const _controllerMerchant = require("../controllers/merchant.Controller");
const _controllerProduct = require("../controllers/product.Controller");
const _controllerUpload = require("../controllers/upload.Controller");
const _controllerOrder = require("../controllers/oder.Controller");
const _controllerAtt = require("../controllers/attribute.Controller");
const _controllerToping = require("../controllers/topping.Controller");
const _validationMiddleware = require("../middleware/auth.validation");
const _validationSyntax = require("../middleware/validator");
const _valadationAdmin = require("../middleware/validate-requestAdmin");
const _controllerRequest = require("../controllers/request.Controller");
const _sendMailActive = require("../controllers/mail.Controller");
const tagController = require("../controllers/tag.Controller");
const brandController = require("../controllers/brand.Controller");
const merchantController = require("../controllers/merchant.Controller");

// About Sign-in
Router.post(
  "/sign-in",
  [
    _validationSyntax._isvalidemailformated,
    _validationMiddleware.isPasswordAdminMatch,
  ],
  _controllerAdmin._signIn
);
// About Employee
Router.post(
  "/create-staff",
  [_valadationAdmin, _validationSyntax._isvalidemailformated],
  _controllerAdmin._createNewStaff
);
Router.delete(
  "/delete-staff/:id_admin",
  [_valadationAdmin],
  _controllerAdmin.deleteStaff
);

Router.get("/get-all", [_valadationAdmin], _controllerAdmin._getAllAdmin);

Router.post(
  "/change-profile",
  [_valadationAdmin],
  _controllerUpload.uploadImages,
  _controllerUpload.resizeImages,
  _controllerAdmin.changeProfile
);
Router.post(
  "/change-password",
  [_valadationAdmin, _validationMiddleware.isPasswordAdminMatch],
  _controllerAdmin.resetPassword
);
//About Merchant ----------------------------------------------------------
Router.get(
  "/get-top-merchant",
  [_valadationAdmin],
  _controllerMerchant.getTopMerchant
);
Router.get(
  "/get-all-merchant",
  [_valadationAdmin],
  _controllerMerchant.get_All_Merchant
);
Router.get(
  "/merchant/:id",
  [_valadationAdmin],
  _controllerMerchant._get_Merchant_ByID
);
Router.get(
  "/tag-product",
  [_valadationAdmin],
  tagController._adminFindTagOfProduct
);
Router.get(
  "/att",
  [_valadationAdmin],
  _controllerAtt._getAttributeByTypeForAdmin
);
Router.get(
  "/get-toping",
  [_valadationAdmin],
  _controllerToping.findAllToppingForAdmin
);
Router.post(
  "/create-food",
  [_valadationAdmin],
  _controllerUpload.uploadImages,
  _controllerUpload.resizeImages,
  _controllerProduct._addNewFoodByAdmin
);
Router.get(
  "/review-merchant",
  [_valadationAdmin],
  _controllerAdmin._reviewMerchant
);

Router.post(
  "/request/change-state",
  [_valadationAdmin],
  _controllerRequest._updateStateRequest
);
Router.get("/get-img-admin", [_valadationAdmin], _controllerAdmin._getAdminIMG);
Router.post(
  "/accept-merchant",
  [_valadationAdmin],
  _controllerAdmin._accept_merchant
);

Router.post(
  "/denied-merchant",
  [_valadationAdmin],
  _controllerAdmin._denied_merchant
);
Router.post(
  "/denied-request",
  [_valadationAdmin],
  _controllerAdmin._denied_request
);
//About Banner
Router.get("/banner", [_valadationAdmin], _controllerBanner._getAllBanner);

Router.post(
  "/create-banner",
  [_valadationAdmin],
  _controllerUpload.uploadImages,
  _controllerUpload.resizeImages,
  _controllerBanner._createBanner
);
Router.post(
  "/update-banner",
  [_valadationAdmin],
  _controllerUpload.uploadImages,
  _controllerUpload.resizeImages,
  _controllerBanner._updateBanner
);
Router.put(
  "/delete-banner",
  [_valadationAdmin],
  _controllerBanner._deleteBanner
);

Router.get("/search-merchant", [_valadationAdmin], _controllerAdmin.findByName);

Router.get("/merchant", [_valadationAdmin], _controllerMerchant.findById);

Router.get(
  "/request-for-administrator",
  [_valadationAdmin],
  _controllerRequest._getAllRequest_For_Administrator
);
Router.get(
  "/app-order",
  [_valadationAdmin],
  _controllerOrder.getAllOrderByAdmin
);

Router.post(
  "/assign-for-staff",
  [_valadationAdmin],
  _controllerRequest._assignForStaff
);
Router.post(
  "/assign-update-food",
  [_valadationAdmin],
  _controllerRequest.assignUpdateFood
);

Router.get(
  "/request-update-food",
  [_valadationAdmin],
  _controllerRequest.getReqUpdateFood
);
Router.get(
  "/request-update-food-staff",
  [_valadationAdmin],
  _controllerRequest.getReqUpdateFoodForStaff
);

Router.get(
  "/get-request-from-merchant",
  [_valadationAdmin],
  _controllerAdmin._requestFromMerchant
);

Router.post("/update-food", [_valadationAdmin], _controllerAdmin.updateFood);
Router.put(
  "/eject-update-food",
  [_valadationAdmin],
  _controllerAdmin.ejectUpdateFood
);
// ----------------------------
Router.get("/brand", [_valadationAdmin], brandController.getAllBrandByAdmin);
Router.get(
  "/brand/:id",
  [_valadationAdmin],
  brandController.getAllBrandDetailByAdmin
);
Router.delete(
  "/merchant/brand/:id",
  [_valadationAdmin],
  merchantController.removeMerchantFromBrand
);
Router.get(
  "/merchant-not-work",
  [_valadationAdmin],
  merchantController.getMerchantNotWork
);
module.exports = Router;
