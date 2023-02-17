const connection = require("../../../config/db");

class HomeController {
  index(req, res) {
    res.render("index");
  }

  home(req, res) {
    const totalQuery =
      "select COUNT(OrderID) orderNum from Orders; select COUNT(CustomerID) customerNum from Customer; select COUNT(ShipperID) shipperNum from Shipper";
    connection.query(totalQuery, function (err, results) {
      if (err) return err;
      res.render("home", {
        totalOrders: results[0][0].orderNum,
        totalCustomers: results[1][0].customerNum,
        totalShippers: results[2][0].shipperNum,
      });
    });
  }

  login(req, res) {
    res.render("auth/login");
  }

  register(req, res) {
    res.render("auth/register");
  }

  authLogin(req, res) {
    res.redirect("/home");
  }

  authRegister(req, res) {
    res.redirect("/home");
  }

  logout(req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  }
}

module.exports = new HomeController();
