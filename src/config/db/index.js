const sql = require("mssql");

// config for the db
const sqlConfig = {
  user: "sa",
  password: "123456",
  database: "CompanySupplyProduct",
  server: "LAPTOP-NNEQ7UTK\\SQLEXPRESS",
  port: 1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

// connect to the db
async function connect() {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(sqlConfig);
    const result = await sql.query`select * from product`;
    console.dir(result);
    console.log("Succesfful!");
  } catch (err) {
    // ... error checks
    console.log(err);
  }
}

module.exports = { connect };
