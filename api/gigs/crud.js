const connectDB = require("../../utils/db");
const { protect } = require("../../utils/authMiddleware");

const { createNewGig } = require("../../utils/crudMethods");

export default async (req, res) => {
  await protect(req, res);
  if (req.method === "POST") {
    createNewGig(req, res);
  }
  if (req.method === "GET") {
  }
  if (req.method === "PUT") {
  }
  if (req.method === "DELETE") {
  }
};
