const connection = require("../../../config/db");

class MenuController {
  // [GET] /food/list
  list(req, res) {
    const foodSearch = req.query.foodSearch;
    const foodListQuery = foodSearch
      ? `select FoodID as FoodNum, concat(case when FoodID < 10 then 'F0' else 'F' end, FoodID) as FoodID, name, price from food where name like '%${foodSearch.trim()}%';`
      : "select FoodID as FoodNum, concat(case when FoodID < 10 then 'F0' else 'F' end, FoodID) as FoodID, name, price from food;";
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

  // [GET] /food/edit/:id
  edit(req, res) {
    const foodID = req.params.id;
    const editFoodListQuery = "select name, Price from food where foodID = ?";
    connection.query(editFoodListQuery, foodID, function (err, result) {
      if (err) return err;
      res.render("menu/edit", {
        food: result[0],
        foodID: foodID,
      });
    });
  }

  // [PUT] /food/update/:id
  update(req, res) {
    const { foodName, foodPrice } = req.body;
    const foodID = req.params.id;
    const updatefoodQuery =
      "update food set name = ?, Price = ? where foodID = ?";
    connection.query(
      updatefoodQuery,
      [foodName, foodPrice, foodID],
      (err, result) => {
        if (err) return err;
        console.log(foodName, foodPrice);
        res.redirect("/food/list");
      }
    );
  }

  // [DELETE] /food/delete/:id
  delete(req, res) {
    const foodID = req.params.id;
    const deleteFoodQuery = "delete from food where foodID = ?";
    connection.query(deleteFoodQuery, [foodID], (err, result) => {
      if (err) return err;
      res.redirect("/food/list");
    });
  }
}

module.exports = new MenuController();
