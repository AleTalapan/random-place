const axios = require("axios")
const { mapCategory } = require("../utils/categoryMap")

const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY

async function geocodeCity(city) {
  const response = await axios.get("https://api.geoapify.com/v1/geocode/search", {
    params: {
      text: city,
      format: "json",
      limit: 1,
      apiKey: GEOAPIFY_API_KEY
    }
  })

  const results = response.data.results || []

  if (!results.length) {
    return null
  }

  const firstResult = results[0]

  if (
    typeof firstResult.lat !== "number" ||
    typeof firstResult.lon !== "number"
  ) {
    return null
  }

  return {
    lat: firstResult.lat,
    lon: firstResult.lon
  }
}

async function getPlacesByCity(city, category) {
  const coords = await geocodeCity(city)

  if (!coords) {
    return null
  }

  const geoapifyCategory = mapCategory(category)

  const response = await axios.get("https://api.geoapify.com/v2/places", {
    params: {
      categories: geoapifyCategory,
      filter: `circle:${coords.lon},${coords.lat},5000`,
      limit: 20,
      apiKey: GEOAPIFY_API_KEY
    }
  })

  const features = response.data.features || []

  const places = features
    .map((feature) => feature.properties)
    .filter((place) => {
      return (
        place &&
        typeof place.name === "string" &&
        place.name.trim() &&
        typeof place.formatted === "string" &&
        place.formatted.trim() &&
        typeof place.lat === "number" &&
        typeof place.lon === "number"
      )
    })

  return places
}

module.exports = {
  geocodeCity,
  getPlacesByCity
}