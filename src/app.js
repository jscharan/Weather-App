const path = require("path");
const express = require("express");

//loading hbs for using partials generally not required
const hbs = require("hbs");

const geocode = require("./util/geocode");
const forecast = require("./util/forecast");

const app = express();

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");

const viewsPath = path.join(__dirname, "../templates/views");

const partialPAth = path.join(__dirname, "../templates/partials");

//loading hbs module or handelbars module
app.set("view engine", "hbs");

//setting views path
app.set("views", viewsPath);

//setting partial path
hbs.registerPartials(partialPAth);

//load local files to Server
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    author: "Charan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: `I'm a begginer too`,
    author: "charan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    author: "J Sai Charan",
    course: "Node JS",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You Have To Provide an Address",
    });
  }
  const place = req.query.address;

  geocode(place, (error, { long, lat, location } = {}) => {
    if (!error) {
      //applied destructuring
      forecast(long, lat, (error, { description, temperature, feelslike }) => {
        if (!error) {
          res.send({
            location,
            forecast: `It's ${description}, current temperature is ${temperature} C but it feels like ${feelslike} C`,
          });
        } else return res.send({ error });
      });
    } else return res.send({ error });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You Must Provide a Search Term",
    });

    console.log(req.query.search);
    res.send({
      product: [],
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    author: "Charan",
    message: "help Article Not Found",
  });
});

// ' * ' is generic and matches for anything
app.get("*", (req, res) => {
  res.render("error", {
    message: "Page Not Found",
    author: "Charan",
  });
});

//start Server
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
