const connection = require("../../../config/db");

class ShipperController {
  // [GET] /shipper/list
  list(req, res) {
    const shipperSearch = req.query.shipperSearch;
    const shipperListQuery = shipperSearch
      ? `select ShipperID as ShipperNum, concat(case when ShipperID < 10 then 'S0' else 'S' end, ShipperID) as ShipperID, name, PhoneNumber
      from shipper where name like '%${shipperSearch.trim()}%';`
      : "select ShipperID as ShipperNum, concat(case when ShipperID < 10 then 'S0' else 'S' end, ShipperID) as ShipperID, name, PhoneNumber from shipper";
    connection.query(shipperListQuery, function (err, result) {
      if (err) return err;
      res.render("shipper/list", {
        shippers: result,
        shipperSearch: shipperSearch ? shipperSearch : "",
      });
    });
  }

  // [GET] /shipper/add
  add(req, res) {
    res.render("shipper/add");
  }

  // [POST] /shipper/store
  store(req, res) {
    const { shipperName, shipperPhone } = req.body;
    const shipperAddQuery =
      "insert into shipper (name, PhoneNumber) values (?, ?);";
    connection.query(
      shipperAddQuery,
      [shipperName, shipperPhone],
      function (err, result) {
        if (err) return err;
        res.redirect("/shipper/list");
      }
    );
  }

  // [GET] /shipper/edit/:id
  edit(req, res) {
    const shipperID = req.params.id;
    const editshipperListQuery =
      "select name, PhoneNumber from shipper where shipperID = ?";
    connection.query(editshipperListQuery, shipperID, function (err, result) {
      if (err) return err;
      res.render("shipper/edit", {
        shipper: result[0],
        shipperID: shipperID,
      });
    });
  }

  // [PUT] /shipper/update/:id
  update(req, res) {
    const { shipperName, shipperPhone } = req.body;
    const shipperID = req.params.id;
    const updateShipperQuery =
      "update shipper set name = ?, PhoneNumber = ? where ShipperID = ?";
    connection.query(
      updateShipperQuery,
      [shipperName, shipperPhone, shipperID],
      (err, result) => {
        if (err) return err;
        console.log(shipperName, shipperPhone);
        res.redirect("/shipper/list");
      }
    );
  }

  // [DELETE] /shipper/delete/:id
  delete(req, res) {
    const shipperID = req.params.id;
    const deleteshipperQuery = "delete from shipper where shipperID = ?";
    connection.query(deleteshipperQuery, [shipperID], (err, result) => {
      if (err) return err;
      res.redirect("/shipper/list");
    });
  }
}

module.exports = new ShipperController();
