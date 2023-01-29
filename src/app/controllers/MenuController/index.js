const connection = require("../../../config/db");

class MenuController {
  // [GET] /food/list
  list(req, res) {
    const foodListQuery = "select * from food";
    connection.query(foodListQuery, function (err, result) {
      if (err) return err;
      res.render("menu/list", { foods: result });
    });
  }

  // [GET] /food/add
  add(req, res) {
    res.render("menu/add");
  }

  // [POST] /food/store
}

module.exports = new MenuController();
