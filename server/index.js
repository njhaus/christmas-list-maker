const express = require("express");
const dotenv = require('dotenv');
dotenv.config({ silent: process.env.NODE_ENV === "production" });

const app = express();
const port = 3009;

// Id
const { v4: uuidv4 } = require("uuid");

// bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Database
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("christmas_lists.db");


// cors middleware for allowing react to fetch() from server
var cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "PATCH"],
    credentials: true,
    preflightContinue: false,
  })
);

// parse application/x-www-form-urlencoded
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }))


// Session setup
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const sessionConfig = {
  name: "mr-session",
  secret: process.env.SESSION_SECRET,
  // store: store,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: 'None',
  },
};
app.use(session(sessionConfig));



// Body parser -- parse application/json
app.use(bodyParser.json())

// ++++++++++++++ROUTES+++++++++++++++++++++


// CREATE list
app.post("/home/new", async (req, res) => {
  const newListId = uuidv4();
  const { title, code } = req.body;
  try {
    const hashedCode = await new Promise((resolve, reject) => bcrypt.hash(code, saltRounds, function (err, hash) {
      if (err) {
        reject(err)
      }
      // Store hash in your password DB.
      else {
        resolve(hash);
      } 
    }));
    const newList = await db.run(
      "INSERT INTO lists (id, title, access_code) VALUES (?, ?, ?)",
      [newListId, title, hashedCode],
      (err, rows) => {
        if (err) {
          throw new Error;
        } else {
          res.cookie("list", title, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 12 * 60 * 60 * 1000,
          });
           res.send({ message: "success" });
        }
      }
    )
  } catch (err) {
    console.log(err)
    res.send({error: "There was an error creating your list."})
  }
})

// OPEN list

app.post("/home/open", async (req, res) => {
  const { title, code } = req.body;
  console.log(title, code)
  const sql =
    "SELECT title, access_code FROM lists WHERE title = ?";
  try {
    const getList = await db.all(
      sql,
      [title],
      (err, rows) => {
        if (err) {
          throw err;
        } else if (rows.length < 1) {
          console.log("no list found");
          res.send({ error: "incorrect username or password." });
        } else {
          const row = rows[0];
          console.log(row);
          console.log(code)
          bcrypt.compare(code, row.access_code).then(function (result) {
            if (result == true) {
              res.cookie("list", title, {
              httpOnly: true,
              secure: true,
              sameSite: "None",
              maxAge: 12 * 60 * 60 * 1000,
            });
              res.send({ message: "success" });
            } else {
              console.log("password no match");
              res.send({ error: "incorrect username or password." });
            }
          });
        };
      }
    );
  } catch (err) {
    console.log(err);
    res.send({ error: "There was an error accessing your list." });
  }
});

// FIND list

app.post("/list/find", async (req, res) => {
  const { title, code } = req.body;
  const listSql = "SELECT id, title, access_code FROM lists WHERE title = ?";
  if (req.cookies?.list === title) {
    try {
      //  GET LIST TITLE/ID
      const getList = await new Promise((resolve, reject) => db.all(
        listSql,
        // 'SELECT * FROM lists',
        [title],
        (err, rows) => {
          if (err) {
            reject(err);
          }
          else {
            resolve(rows);
          }
        }))
    
      if (getList.length < 1) {
        console.log("no list found");
        res.send({ error: "Unable to verify credentials." });
      }
    
      const list = getList[0];
      //  COMPARE CODE
      const checkPassword = await new Promise((resolve, reject) => bcrypt.compare(code, list.access_code).then(function (result) {
        if (result == true) {
          resolve(true);
        } else {
          console.log("password no match");
          reject(false);
        }
      }));
     
      // GET USERS ASSOCIATED WITH LIST
      const usersSql =
        "SELECT name, recipients, access_code FROM users WHERE _list_id = ?";
      const getUsers = await new Promise((resolve, reject) => db.all(
        usersSql,
        [list.id],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      ));
      console.log(getUsers);
    
      res.send({
        message: "success",
        data: {
          _id: list.id,
          title: list.title,
          users: getUsers
        }
      })
    } catch (err) {
      console.log(err);
      res.send({ error: "There was an error accessing your list." });
    }
  }
  else {
    res.send({error: "You are not logged in."})
  }
})


// CREATE (or edit) LIST
app.post('/list/create', async (req, res) => {
  console.log(req.body);
  const { _id, title, users } = req.body;
  if (req.cookies?.list === title) {
    for (let user of users) {
      const usersSql =
        "INSERT INTO users (id, name, _list_id) VALUES (?, ?, ?)";
      const userId = uuidv4();
      const getUsers = await new Promise((resolve, reject) =>
        db.all(usersSql, [userId, user.name, _id], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        })
      );
    } 
    res.send({message: 'success'})
  } else {
    res.send({ error: "You are not logged in." });
  }
})


//CREATE USER ACCESS CODE 
app.post('/user/create', async (req, res) => {
  const { listId, name, code } = req.body;
  console.log(listId, name, code)
  try {
    const hashedCode = await new Promise((resolve, reject) =>
      bcrypt.hash(code, saltRounds, function (err, hash) {
        if (err) {
          reject(err);
        }
        else {
          resolve(hash);
        }
      })
    );
    // Create code
    const createCode = await new Promise((resolve, reject) =>  db.run(
      "UPDATE users SET access_code = ? WHERE _list_id = ? AND name = ?",
      [hashedCode, listId, name],
      (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      }
    ));
    // Return user and log in session
    const usersSql =
      "SELECT name, id FROM users WHERE _list_id = ? AND name = ?";
    
    const getUser = await new Promise((resolve, reject) =>
      db.all(usersSql, [listId, name], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]);
        }
      })
    );

    res.cookie("user", getUser.id, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 12 * 60 * 60 * 1000,
    });

    res.send({
      message: "success",
      data: {
        name: getUser.name,
        id: getUser.id,
      },
    });
  } catch (err) {
    console.log(err);
    res.send({ error: "There was an error creating your access code." });
  }
})


//ACCESS EXISTING USER ACCESS CODE 
app.post('/user/access', async (req, res) => {
  console.log('Hello?')
  const { listId, name, code } = req.body;
  console.log(listId, name, code);
    try {
      //  GET USER
      const getUser = await new Promise((resolve, reject) =>
        db.all(
          'SELECT name, id, access_code FROM users WHERE name = ? AND _list_id = ?',
          [name, listId],
          (err, rows) => {
            if (err) {
              console.log('NO WAY')
              reject(err);
            } else {
              console.log("YES");
              resolve(rows);
            }
          }
        )
      );

      console.log("Hello2");

      if (getUser.length < 1) {
        console.log("no user found");
        res.send({ error: "Unable to verify credentials." });
      }


      const currUser = getUser[0];
      console.log("Hello3");
      console.log(currUser);
      //  COMPARE CODE
      const checkPassword = await new Promise((resolve, reject) =>
        bcrypt.compare(code, currUser.access_code).then(function (result) {
          if (result == true) {
            resolve(true);
          } else {
            console.log("password no match");
            reject(false);
          }
        })
      );

      console.log("Hello4");

      res.cookie("user", currUser.id, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 12 * 60 * 60 * 1000,
      });
        
        console.log("Hello5");

      res.send({
        message: "success",
        data: {
          name: currUser.name,
          id: currUser.id,
        },
      });
    } catch (err) {
      console.log(err);
      res.send({ error: "There was an error logging in." });
    }
})



// LOGOUT
app.post('/logout', async (req, res) => {
  res.clearCookie("list", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    // maxAge: 12 * 60 * 60 * 1000,
  });
  res.clearCookie("user", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    // maxAge: 12 * 60 * 60 * 1000,
  });
  res.send({message: "success"})
})

// TEST ROUTE
app.get("/", (req, res) => {
  console.log(req.cookies)
  db.all("SELECT * FROM lists", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log(rows); 
    res.json(rows); 
  });
});


process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Closed the database connection.");
    process.exit(0); 
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
