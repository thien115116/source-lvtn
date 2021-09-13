const CronJob = require("cron").CronJob;
var cron = require("node-cron");
const bannerModel = require("../models/banner.Model");
function doStartBanner(result) {
  if (result !== null) {
    let dateStart = new Date(result.public_date).getDate();
    let monthStart = new Date(result.public_date).getMonth() + 1;
    let hour = new Date(result.disable_date).getHours();
    let minute = new Date(result.disable_date).getMinutes();
    cron.schedule(`0 ${minute} ${hour} ${dateStart} ${monthStart} *`, () => {
      bannerModel.setState(result.id_banner, 1, (err, result) => {
        if (!err) {
          console.log("Banner Update Start:");
          console.log(result.id_banner);
        }
      });
    });
  }
}
function doEndBanner(result) {
  if (result !== null) {
    let dateEnd = new Date(result.disable_date).getDate();
    let monthEnd = new Date(result.disable_date).getMonth() + 1;
    let hour = new Date(result.disable_date).getHours();
    let minute = new Date(result.disable_date).getMinutes();
    cron.schedule(`0 ${minute} ${hour} ${dateEnd} ${monthEnd} *`, () => {
      bannerModel.setState(result.id_banner, 2, (err, result) => {
        if (!err) {
          console.log("Banner Update End");
          console.log(result.id_banner);
        }
      });
    });
  }
}
function bannerTest() {
  // Load data
  bannerModel.getState0(0, (err, result) => {
    if (!err) {
      for (i = 0; i < result.length; i++) {
        doStartBanner(result[i]);
      }
    }
  });
  bannerModel.getState1(1, (err, result) => {
    if (!err) {
      for (i = 0; i < result.length; i++) {
        doEndBanner(result[i]);
      }
    }
  });
}
module.exports = {
  bannerTest: bannerTest,
  doStartBanner: doStartBanner,
  doEndBanner: doEndBanner,
};
