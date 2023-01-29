const connection = require("../../../config/db");

class ShipperController {
  // [GET] /shipper/list
  list(req, res) {
    const shipperListQuery = "select * from shipper";
    connection.query(shipperListQuery, function (err, result) {
      if (err) return err;
      res.render("shipper/list", { shippers: result });
    });
  }

  // [GET] /shipper/add
  add(req, res) {
    res.render("shipper/add");
  }
}

module.exports = new ShipperController();
