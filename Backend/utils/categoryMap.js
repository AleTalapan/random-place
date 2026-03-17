const CATEGORY_MAP = {
  restaurant: "catering.restaurant",
  cafe: "catering.cafe",
  bar: "catering.bar",
  museum: "tourism.museum",
  park: "leisure.park"
}

function mapCategory(category) {
  if (!category || typeof category !== "string") {
    return CATEGORY_MAP.restaurant
  }

  const normalizedCategory = category.trim().toLowerCase()
  return CATEGORY_MAP[normalizedCategory] || CATEGORY_MAP.restaurant
}

function getAllowedCategories() {
  return Object.keys(CATEGORY_MAP)
}

module.exports = {
  mapCategory,
  getAllowedCategories
}