export const stage: String = process.env.STAGE || "dev";

if (exports.stage == "dev") {
  require("dotenv").config();
}

export const offline: boolean = process.env.OFFLINE == "true";
