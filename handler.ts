// Keep this as the first thing loaded.  For dev
// mode it runs 'dotenv' to load local env vars
import { stage, offline } from "./lib/config";
console.log(`Server running ${offline ? "offline" : "online"} ${stage}`);

import * as fs from "fs";
import * as bodyParser from "body-parser";
import * as Mustache from "mustache";

import * as path from "path";
import * as serverless from "serverless-http";
import * as express from "express";

export const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// renders component HTML
function loadHTML() {
  return fs.readFileSync("./dist/index.html").toString();
}

app.get("/", function(req, res) {
  fs.readFile("./dist/index.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.get("/client/*", function(req, res) {
  let resource = req.path.replace("/client", "");
  fs.readFile("./dist/" + resource, "utf-8", (err, data) => {
    res.send(data);
  });
});

app.get("/*", function(req, res) {
  let resource = req.path.replace("/", "");
  fs.readFile("./dist/" + resource, "utf-8", (err, data) => {
    res.send(data);
  });
  var html = Mustache.to_html(loadHTML());
  res.send(html);
});

module.exports.app = serverless(app);
