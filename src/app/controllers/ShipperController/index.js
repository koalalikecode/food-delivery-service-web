const connection = require("../../../config/db");

class ShipperController {
  // [GET] /shipper/list
  list(req, res) {
    const shipperListQuery =
      "select concat(case when ShipperID < 10 then 'S0' else 'S' end, ShipperID) as ShipperID, name, PhoneNumber from shipper;";
    connection.query(shipperListQuery, function (err, result) {
      if (err) return err;
      res.render("shipper/list", { shippers: result });
    });
  }

  // [GET] /shipper/add
  add(req, res) {
    res.render("shipper/add");
  }

  // [POST] /shipper/store
  store(req, res) {
    const { shipperName, shipperPhone } = req.body;
    const shipperAddQuery =
      "insert into shipper (name, PhoneNumber) values (?, ?);";
    connection.query(
      shipperAddQuery,
      [shipperName, shipperPhone],
      function (err, result) {
        if (err) return err;
        res.redirect("/shipper/list");
      }
    );
  }
}

module.exports = new ShipperController();
