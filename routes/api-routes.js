// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const bodyParser = require('body-parser')

<<<<<<< HEAD
module.exports = function (app) {

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // parse application/json
  app.use(bodyParser.json())
=======
module.exports = function(app) {
>>>>>>> 75451e8ce088b8b8042ca1f1a506a8d64bc058af
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // app.get('/something', (req, res) => {
  //   db.User.findAll({
  //   }).then(function(dbUser) {
  //     res.json(dbUser);
  //   })
  // })

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(db.User);
    db.User.create({ email: req.body.email, password: req.body.password })
      //{ fields: ['email'] })
      // let's assume the default of isAdmin is false
      // console.log(user.email); // 'alice123'
      //console.log(user.password); // false
      // console.log(req.body.email)
      // console.log(req.body.password)
      // db.User.create({
      //   email: req.body.email,
      //   password: req.body.password
      // })

      .then(() => {
        res.redirect(307, "/api/login");
        //  console.log("from then", user.email);
        //    console.log(user.password);
      })
      .catch(err => {
        res.status(401).json(err);
        console.log(err);
        //console.log("from error", user.email);
        //console.log(user.password);
      });
  });
  // Route to call api 
  app.post("/profile", (req, res) => {
    console.log(req.body);
  })
  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
