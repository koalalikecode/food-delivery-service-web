const connection = require("../../../config/db");

class ShipperController {
  // [GET] /order/list
  list(req, res) {
    const orderListQuery =
      "select concat(case when OrderID < 10 then 'Or0' else 'Or' end, OrderID) as OrderID, concat(case when CustomerID < 10 then 'C0' else 'C' end, CustomerID) as CustomerID, concat(case when ShipperID < 10 then 'S0' else 'S' end, ShipperID) as ShipperID, Status from orders;";
    connection.query(orderListQuery, function (err, result) {
      if (err) return err;
      res.render("order/list", { orders: result });
    });
  }

  // [GET] /order/add
  add(req, res) {
    res.render("order/add");
  }
}

module.exports = new ShipperController();
