
var express = require('express');

// Dependencies
// =============================================================


var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();

var PORT = process.env.PORT || 3000;

var customers = [];

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

/*app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});*/

// Search for Specific customers (or all customers) - provides JSON
app.get("/api/:customers?", function(req, res) {
    var chosen = req.params.customers;

    if (chosen) {
        console.log(chosen);

        for (var i = 0; i < customers.length; i++) {
            if (chosen === customers[i].routeName) {
                res.json(customers[i]);
            }
        }
        res.json(false);
    }
    res.json(customers);
});

// Create New customers - takes in JSON input
app.post("/api/add?", function(req, res) {
    var newcustomers = req.body;
    newcustomers.routeName = newcustomers.name.replace(/\s+/g, "").toLowerCase();

    console.log(newcustomers);

    customers.push(newcustomers);

    res.json(newcustomers);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

