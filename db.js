import mysql from "mysql2";

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "customer",
});

mysqlConnection.connect((error) => {
  if (error) {
    console.log(
      "Error in Db connection:" + JSON.stringify(error, undefined, 2)
    );
  } else {
    console.log("connection successfull");
  }
});

export default mysqlConnection;
