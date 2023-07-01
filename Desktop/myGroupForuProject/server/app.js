// step one
import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

// step two
let app = express();

// step three
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//* step four
let connectionWithDatabaseInfo = mysql2.createConnection({
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  database: "group4",
  user: "group4",
  password: "group4",
  host: "localhost",
});

//* step five
connectionWithDatabaseInfo.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connection to database is successful");
  }
});

// step seven
// method , route, and controller
app.get("/createUserTable", (req, res) => {
  let userTable = `CREATE TABLE if not exists userTable(
        user_id int auto_increment,
        first_name text not null,
        last_name text not null,
        email varchar(255) not null,
        password varchar(255) not null,
        PRIMARY KEY(user_id)
     )`;

  connectionWithDatabaseInfo.query(userTable, (err, data, filed) => {
    if (err) {
      console.log(err);
    } else {
      res.send("table created");
    }
  });
});

// *for upload table
app.get("/createUploadTable", (req, res) => {
  let uploadTable = `CREATE TABLE if not exists uploadTable(
         upload_id int auto_increment,
         title_name text not null,
         description varchar(255) not null,
         PRIMARY KEY(upload_id)
    )`;
  connectionWithDatabaseInfo.query(uploadTable, (err, data, filed) => {
    if (err) {
      console.log(err);
    } else {
      res.send("table created");
    }
  });
});
//step eight
app.post("/postUserInfo", (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  let postData = `INSERT INTO userTable (first_name,last_name,email,password) VALUES ('${first_name}','${last_name}','${email}','${password}')`;
  connectionWithDatabaseInfo.query(postData, (err, data, filed) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send("user added");
    }
  });
});

// * Post for uploadTable

app.post("/Upload", (req, res) => {
  const { title_name, description } = req.body;
  let postData = `INSERT INTO uploadTable (title_name, description) VALUES 
  ('${title_name}','${description}')`;
  connectionWithDatabaseInfo.query(postData, (err, data, filed) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send("file added");
    }
  });
});

// *if someone gives us something out of the required data
// * Wild card
app.get("*", (req, res) => {
  res.send("page not found!");
});

//* step six
app.listen(6700, () => {
  console.log("server is listening to port 6700");
});
