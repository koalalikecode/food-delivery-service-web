const connection = require("../../../config/db");

class MenuController {
  // [GET] /food/list
  list(req, res) {
    const foodSearch = req.query.foodSearch;
    const foodListQuery = foodSearch
      ? `select concat(case when FoodID < 10 then 'F0' else 'F' end, FoodID) as FoodID, name, price from food where name like '%${foodSearch.trim()}%';`
      : "select concat(case when FoodID < 10 then 'F0' else 'F' end, FoodID) as FoodID, name, price from food;";
    connection.query(foodListQuery, function (err, result) {
      if (err) return err;
      res.render("menu/list", {
        foods: result,
        foodSearch: foodSearch ? foodSearch : "",
      });
    });
  }

  // [GET] /food/add
  add(req, res) {
    res.render("menu/add");
  }

  // [POST] /food/store
  store(req, res) {
    const { foodName, foodPrice } = req.body;
    const foodAddQuery = "insert into food (name, price) values (?, ?);";
    connection.query(
      foodAddQuery,
      [foodName, foodPrice],
      function (err, result) {
        if (err) return err;
        res.redirect("/food/list");
      }
    );
  }
}

module.exports = new MenuController();
