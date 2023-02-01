const connection = require("../../../config/db");

class CustomerController {
  // [GET] /customer/list
  list(req, res) {
    const customerSearch = req.query.customerSearch;
    const customerListQuery = customerSearch
      ? `select CustomerID as CustomerNum, concat(case when CustomerID < 10 then 'C0' else 'C' end, CustomerID) as CustomerID, name, PhoneNumber, Address from customer where name like '%${customerSearch.trim()}%';`
      : "select CustomerID as CustomerNum, concat(case when CustomerID < 10 then 'C0' else 'C' end, CustomerID) as CustomerID, name, PhoneNumber, Address from customer";
    connection.query(customerListQuery, function (err, result) {
      if (err) return err;
      res.render("customer/list", {
        customers: result,
        customerSearch: customerSearch ? customerSearch : "",
      });
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

  // [GET] /customer/edit/:id
  edit(req, res) {
    const customerID = req.params.id;
    const editCustomerListQuery =
      "select name, PhoneNumber, Address from customer where CustomerID = ?";
    connection.query(editCustomerListQuery, customerID, function (err, result) {
      if (err) return err;
      res.render("customer/edit", {
        customer: result[0],
        customerID: customerID,
      });
    });
  }

  // [PUT] /customer/update/:id
  update(req, res) {
    const { customerName, customerPhone, customerAddress } = req.body;
    const customerID = req.params.id;
    const updateCustomerQuery =
      "update customer set name = ?, PhoneNumber = ?, Address = ? where CustomerID = ?";
    connection.query(
      updateCustomerQuery,
      [customerName, customerPhone, customerAddress, customerID],
      (err, result) => {
        if (err) return err;
        res.redirect("/customer/list");
      }
    );
  }

  // [DELETE] /customer/delete/:id
  delete(req, res) {
    const customerID = req.params.id;
    const deleteCustomerQuery = "delete from customer where CustomerID = ?";
    connection.query(deleteCustomerQuery, [customerID], (err, result) => {
      if (err) return err;
      res.redirect("/customer/list");
    });
  }
}

module.exports = new CustomerController();
