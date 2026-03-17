const { getPlacesByCity } = require("../services/geoapifyService")
const { getAllowedCategories } = require("../utils/categoryMap")

function pickRandomItem(items) {
  const randomIndex = Math.floor(Math.random() * items.length)
  return items[randomIndex]
}

async function getRandomPlace(req, res) {
  try {
    const { city, category = "restaurant" } = req.body

    if (!city || typeof city !== "string" || !city.trim()) {
      return res.status(400).json({ error: "Invalid city" })
    }

    if (typeof category !== "string" || !category.trim()) {
      return res.status(400).json({ error: "Invalid category" })
    }

    const places = await getPlacesByCity(city.trim(), category.trim())

    if (places === null) {
      return res.status(404).json({ error: "City not found" })
    }

    if (!places.length) {
      return res.status(404).json({ error: "No places found in this area" })
    }

    const randomPlace = pickRandomItem(places)

    return res.json({
      name: randomPlace.name,
      address: randomPlace.formatted,
      lat: randomPlace.lat,
      lon: randomPlace.lon,
      category: category.trim().toLowerCase()
    })
  } catch (error) {
    console.error("Error fetching place:", error.response?.data || error.message)

    return res.status(500).json({
      error: "Failed to fetch place"
    })
  }
}

function getCategories(req, res) {
  return res.json({
    categories: getAllowedCategories()
  })
}

module.exports = {
  getRandomPlace,
  getCategories
}