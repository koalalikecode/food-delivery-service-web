const connection = require("../../../config/db");

class CustomerController {
  // [GET] /customer/list
  list(req, res) {
    const customerListQuery = "select * from Customer";
    connection.query(customerListQuery, function (err, result) {
      if (err) return err;
      res.render("customer/list", { customers: result });
    });
  }

  // [GET] /customer/add
  add(req, res) {
    res.render("customer/add");
  }
}

module.exports = new CustomerController();
