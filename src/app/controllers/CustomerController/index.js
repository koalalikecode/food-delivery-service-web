const connection = require("../../../config/db");

class CustomerController {
  // [GET] /customer/list
  list(req, res) {
    const customerListQuery =
      "select concat(case when CustomerID < 10 then 'C0' else 'C' end, CustomerID) as CustomerID, name, PhoneNumber, Address from customer";
    connection.query(customerListQuery, function (err, result) {
      if (err) return err;
      res.render("customer/list", { customers: result });
    });
  }

  // [GET] /customer/add
  add(req, res) {
    res.render("customer/add");
  }

  // [POST] /customer/store
  store(req, res) {
    const { customerName, customerPhone, customerAddress } = req.body;
    const customerAddQuery =
      "insert into customer (name, PhoneNumber, Address) values (?, ?, ?);";
    connection.query(
      customerAddQuery,
      [customerName, customerPhone, customerAddress],
      function (err, result) {
        if (err) return err;
        res.redirect("/customer/list");
      }
    );
  }
}

module.exports = new CustomerController();
