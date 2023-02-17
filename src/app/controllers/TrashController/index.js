const connection = require("../../../config/db");

class TrashController {
  // [GET] /trash
  list(req, res) {
    const customerSearch = req.query.customerSearch;
    const customerListQuery = customerSearch
      ? `select CustomerID as CustomerNum, concat(case when CustomerID < 10 then 'C0' else 'C' end, CustomerID) as CustomerID, name, PhoneNumber, Address, rank_member from DeletedCustomer where name like '%${customerSearch.trim()}%';`
      : "select CustomerID as CustomerNum, concat(case when CustomerID < 10 then 'C0' else 'C' end, CustomerID) as CustomerID, name, PhoneNumber, Address, rank_member from DeletedCustomer";
    connection.query(customerListQuery, function (err, result) {
      if (err) return err;
      res.render("trash", {
        customers: result,
        customerSearch: customerSearch ? customerSearch : "",
      });
    });
  }
  // [POST] /trash/customer/restore/:id
  restoreCustomer(req, res) {
    const customerID = req.params.id;
    const restoreCustomerQuery =
      "insert into customer select * from DeletedCustomer where CustomerID = ?;delete from DeletedCustomer where CustomerID = ?";
    connection.query(
      restoreCustomerQuery,
      [customerID, customerID],
      (err, result) => {
        if (err) return err;
        res.redirect("/trash");
      }
    );
  }
  // [DELETE] /trash/customer/delete/:id
  deleteCustomer(req, res) {
    const customerID = req.params.id;
    const deleteCustomerQuery =
      "delete from DeletedCustomer where CustomerID = ?";
    connection.query(deleteCustomerQuery, [customerID], (err, result) => {
      if (err) return err;
      res.redirect("/trash");
    });
  }
}

module.exports = new TrashController();
