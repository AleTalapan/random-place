const express = require("express")
const router = express.Router()

const {
  getRandomPlace,
  getCategories
} = require("../controllers/placeController")

router.get("/categories", getCategories)
router.post("/random-place", getRandomPlace)

module.exports = router