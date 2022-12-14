const connectDB = require("../../utils/db");

const {
  fetchHomeGigs,
  searchGigs,
  report,
} = require("../../utils/fetchMethods");

export default async (req, res) => {
  let requestType = req.method;
  let { search } = req.query;

  let { work } = req.query;
  if (requestType === "GET" && work === "homegig") {
    await fetchHomeGigs(req, res);
  } else if (requestType === "GET" && search) {
    await searchGigs(req, res);
  } else if (requestType === "POST" && work === "reportbug") {
    await report(req, res);
  }
};
