import { useState } from "react"
import SearchForm from "./components/SearchForm"
import PlaceCard from "./components/PlaceCard"

function App() {
  const [place, setPlace] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async ({ city, category }) => {
    try {
      setLoading(true)
      setError("")
      setPlace(null)

      const response = await fetch("http://localhost:3001/api/random-place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city, category }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setPlace(data)
    } catch (err) {
      setError(err.message || "Failed to fetch place")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-rose-200 text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-pink-900">
            Random Place Picker
          </h1>
          <p className="mt-3 text-sm text-pink-700/70">
            Select a city and category. Get one random place from that area.
          </p>
        </header>

        <SearchForm onSearch={handleSearch} loading={loading} />

        <div className="mt-8">
          {loading && (
            <div className="rounded-2xl border border-pink-500/20 bg-pink-950/40 p-6">
              <p className="text-slate-300">Loading...</p>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-900 bg-red-950/40 p-6">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {!loading && !error && place && <PlaceCard place={place} />}
        </div>
      </div>
    </div>
  )
}

export default App