const {
  fetchHomeGigs,
  searchGigs,
  report,
  fetchMoreGigs,
} = require("../../utils/fetchMethods");
const { protect } = require("../../utils/authMiddleware");

export default async (req, res) => {
  await protect(req, res);
  let requestType = req.method;
  let { search } = req.query;

  let { work } = req.query;
  if (requestType === "GET" && work === "homegig") {
    await fetchHomeGigs(req, res);
  } else if (requestType === "GET" && search) {
    await searchGigs(req, res);
  } else if (requestType === "POST" && work === "reportbug") {
    await report(req, res);
  } else if (requestType === "GET" && work === "fetchMore") {
    await fetchMoreGigs(req, res);
  }
};
