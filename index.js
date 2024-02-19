import express from "express";
import mysqlConnection from "./db.js";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.status(201).send("Server is On");
});

//GET ALL EMPLOYEE
app.get("/emp", (req, res) => {
  const result = mysqlConnection.query(" SELECT * FROM notes", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
      res.json({
        info: rows,
      });
    }
  });
});

// get single employee by id
app.get("/emp/:id", (req, res) => {
  const result = mysqlConnection.query(
    " SELECT * FROM notes WHERE ID=?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rows);
        res.json({
          info: rows,
        });
      }
    }
  );
});

// delete a single table row by id
app.delete("/emp/:id", (req, res) => {
  const result = mysqlConnection.query(
    " DELETE FROM notes WHERE ID=?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rows);
        res.json({
          infoId: rows,
        });
      }
    }
  );
});

// create new data
app.post("/emp", (req, res) => {
  let newData = [req.body.id, req.body.title, req.body.contents];
  console.log(typeof req.body.title);
  const result = mysqlConnection.query(
    "INSERT INTO NOTES (id,title,contents) VALUES(?)",
    [newData],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rows);
        res.json({
          infoId: rows,
        });
      }
    }
  );
});

// update data
app.patch("/emp", (req, res) => {
  let note = req.body;
  mysqlConnection.query(
    "UPDATE NOTES SET ? WHERE id=" + note.id,
    [note],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rows);
        res.json({
          infoId: rows,
        });
      }
    }
  );
});

app.listen(4000, () => {
  console.log("Server is running on 4000");
});
