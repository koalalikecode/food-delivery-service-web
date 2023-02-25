const connection = require("../../../config/db");

class ShipperController {
  // [GET] /order/list
  list(req, res) {
    const dateSort = req.query.dateSort;
    const orderListQuery = `select OrderID as OrderNum, concat(case when OrderID < 10 then 'Or0' else 'Or' end, OrderID) as OrderID, concat(case when CustomerID < 10 then 'C0' else 'C' end, CustomerID) as CustomerID, concat(case when ShipperID < 10 then 'S0' else 'S' end, ShipperID) as ShipperID, orderTime, Status from orders ${
      dateSort ? `order by orderTime ${dateSort}` : ""
    };`;
    connection.query(orderListQuery, function (err, result) {
      if (err) return err;
      res.render("order/list", { orders: result });
    });
  }

  // [GET] /order/add
  add(req, res) {
    const selectQuery =
      "select * from customer;select * from shipper;select * from food";
    connection.query(selectQuery, function (err, result) {
      if (err) return err;
      res.render("order/add", {
        customers: result[0],
        shippers: result[1],
        foods: result[2],
      });
    });
  }

  // [POST] /order/store
  store(req, res) {
    const { orderCustomer, orderShipper, orderFood, orderFoodQuantity } =
      req.body;
    const orderCreateQuery =
      "insert into orders (CustomerID, ShipperID, Status) values (?, ?, 'Processing'); select max(OrderID) as OrderID from orders";
    const foodOrderSupplyAddQuery =
      "insert into food_order_supply values (?, ?, ?);";
    connection.query(
      orderCreateQuery,
      [orderCustomer, orderShipper],
      function (err, result) {
        if (err) return err;
        for (let i = 0; i < orderFood.length; i++) {
          connection.query(
            foodOrderSupplyAddQuery,
            [orderFood[i], result[1][0].OrderID, orderFoodQuantity[i]],
            function (err, res) {
              if (err) return err;
            }
          );
        }
        res.redirect("/order/list");
      }
    );
  }

  // [GET] /order/:id
  show(req, res) {
    const orderID = req.params.id;
    const showQuery =
      "select concat(case when CustomerID < 10 then 'C0' else 'C' end, CustomerID) as CustomerID, name, PhoneNumber, Address, Status from customer natural join orders where OrderID = ?; select ShipperID as ShipperNum, concat(case when ShipperID < 10 then 'S0' else 'S' end, ShipperID) as ShipperID, name, PhoneNumber from shipper natural join orders where OrderID = ?; select * from food_order_supply natural join food where orderID = ?;";
    connection.query(
      showQuery,
      [orderID, orderID, orderID],
      function (err, result) {
        if (err) return err;
        let total = 0;
        result[2].forEach((food) => {
          total += food.price * food.Quantity;
        });
        total = total.toFixed(2);
        res.render("order/show", {
          order: { total, orderID, isOrderGreaterThan10: orderID >= 10 },
          customer: result[0][0],
          shipper: result[1][0],
          foods: result[2],
        });
      }
    );
  }

  // [GET] /order/edit/:id
  edit(req, res) {
    const orderID = req.params.id;
    const orderListQuery =
      "select * from customer;select * from shipper;select * from food; select * from orders where OrderID = ?";
    connection.query(orderListQuery, [orderID], function (err, result) {
      if (err) return err;
      res.render("order/edit", {
        order: result[3][0],
        customers: result[0],
        shippers: result[1],
        foods: result[2],
      });
    });
  }

  //[PUT] /order/update/:id
  update(req, res) {
    const orderID = req.params.id;
    const {
      orderCustomer,
      orderShipper,
      orderStatus,
      orderFood,
      orderFoodQuantity,
    } = req.body;
    const orderUpdateQuery = `update orders set CustomerID = ?, ShipperID = ?, Status = ? where OrderID = ${orderID}; delete from food_order_supply where OrderID = ${orderID}`;
    const foodOrderSupplyAddQuery =
      "insert into food_order_supply values (?, ?, ?);";
    connection.query(
      orderUpdateQuery,
      [orderCustomer, orderShipper, orderStatus],
      function (err, result) {
        if (err) return err;
        for (let i = 0; i < orderFood.length; i++) {
          connection.query(
            foodOrderSupplyAddQuery,
            [orderFood[i], orderID, orderFoodQuantity[i]],
            function (err, res) {
              if (err) return err;
            }
          );
        }
        res.redirect("/order/list");
      }
    );
  }

  updateStatus(req, res) {
    const orderID = req.params.id;
    const status = req.query.status;
    const orderStatusUpdateQuery = `update orders set Status = ? where OrderID = ${orderID}`;
    connection.query(orderStatusUpdateQuery, [status], (err, result) => {
      res.redirect("/order/list");
    });
  }

  // [DELETE] /order/delete/:id
  delete(req, res) {
    const orderID = req.params.id;
    const deleteOrderQuery =
      "delete from food_order_supply where OrderID = ?; delete from orders where OrderID = ?";
    connection.query(deleteOrderQuery, [orderID, orderID], (err, result) => {
      if (err) return err;
      res.redirect("/order/list");
    });
  }
}

module.exports = new ShipperController();
