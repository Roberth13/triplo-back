const express = require("express");
const fetch = require('node-fetch');
const app = express();
const port = 5000;
const usersRoutes = require("./routes/users");
const makesRoutes = require("./routes/makes");
const yearsRoutes = require("./routes/years");
const versionsRoutes = require("./routes/versions");
const modelsRoutes = require("./routes/models");
const quotesRoutes = require("./routes/quotes");
const findCarRoutes = require("./routes/findcar");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.post('/api/v1/quotes/olxautos', function (req, res) {
  let _data = req.body;
  let opt = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        {quote(country: "${_data.country}",make: "${_data.make}",model: "${_data.model}", year: ${_data.year}, trim: "${_data.trim}", sellable: ${_data.sellable}){quote}}
      `,
    }),
  }
  fetch('https://www.olxautos.com.co/api/cardata/', opt)
  .then(response => response.json())
  .then(response => {
    res.send(response.data.quote);
  })
  .catch(err => console.error(err));
})

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/makes", makesRoutes);
app.use("/api/v1/years", yearsRoutes);
app.use("/api/v1/versions", versionsRoutes);
app.use("/api/v1/models", modelsRoutes);
app.use("/api/v1/quotes", quotesRoutes);
app.use("/api/v1/findcar", findCarRoutes);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening ${port}`);
});