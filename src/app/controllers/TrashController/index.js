const connection = require("../../../config/db");

class TrashController {
  // [GET] /trash
  list(req, res) {
    const customerSearch = req.query.customerSearch;
    const customerListQuery = customerSearch
      ? `select CustomerID as CustomerNum, concat(case when CustomerID < 10 then 'C0' else 'C' end, CustomerID) as CustomerID, name, PhoneNumber, Address from DeletedCustomer where name like '%${customerSearch.trim()}%';`
      : "select CustomerID as CustomerNum, concat(case when CustomerID < 10 then 'C0' else 'C' end, CustomerID) as CustomerID, name, PhoneNumber, Address from DeletedCustomer";
    connection.query(customerListQuery, function (err, result) {
      if (err) return err;
      res.render("trash", {
        customers: result,
        customerSearch: customerSearch ? customerSearch : "",
      });
    });
  }
}

module.exports = new TrashController();
