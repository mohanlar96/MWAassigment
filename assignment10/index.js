require("./api/data/db");
const express = require("express");
const routes = require("./api/routes/index");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.set("port", 3000);

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use("node_modules", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", routes);

const server = app.listen(app.get("port"), function(){
    console.log("Listening to port at: ", app.get("port"));
})




