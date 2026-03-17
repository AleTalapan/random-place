import { useState } from "react"

const categories = [
  "restaurant",
  "cafe",
  "bar",
  "museum",
  "park",
]

function formatCategoryLabel(category) {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function SearchForm({ onSearch, loading }) {
  const [city, setCity] = useState("")
  const [category, setCategory] = useState("restaurant")

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmedCity = city.trim()
    if (!trimmedCity || loading) return

    onSearch({
      city: trimmedCity,
      category,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-pink-500/20 bg-pink-950/40 p-6 shadow-xl backdrop-blur"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="city" className="mb-2 block text-sm font-medium text-pink-900">
            City
          </label>
          <input
            id="city"
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-xl border border-pink-500/30 bg-black/30 px-4 py-3 text-white placeholder-pink-200/40 outline-none transition focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-pink-900"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-pink-500/30 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {formatCategoryLabel(item)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-pink-300 to-rose-300 px-4 py-3 font-semibold text-pink-900 transition hover:from-pink-200 hover:to-rose-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Finding..." : "Get Random Place"}
      </button>
    </form>
  )
}

export default SearchForm