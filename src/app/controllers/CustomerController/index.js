class CustomerController {
  // [GET] /customer/list
  list(req, res) {
    res.render("customer/list");
  }

  // [GET] /customer/add
  add(req, res) {
    res.render("customer/add");
  }
}

module.exports = new CustomerController();
