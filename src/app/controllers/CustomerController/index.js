class CustomerController {
  list(req, res) {
    res.render("customer/list");
  }
}

module.exports = new CustomerController();
