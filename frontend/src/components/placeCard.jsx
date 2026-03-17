function PlaceCard({ place }) {
  const mapsUrl = `https://www.google.com/maps?q=${place.lat},${place.lon}`

  return (
    <div className="rounded-2xl border border-pink-500/20 bg-pink-950/40 p-6 shadow-xl backdrop-blur">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
            <p className="text-sm uppercase tracking-widest text-pink-900">{place.category}</p>
            <h2 className="mt-2 text-2xl font-bold text-white">{place.name}</h2>
        </div>
      </div>

      <div className="space-y-3 text-pink-100/80">
        <p>
          <span className="font-semibold text-pink-200">Address:</span> {place.address}
        </p>
      </div>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-pink-300 to-rose-300 px-4 py-2 font-semibold text-pink-900 transition hover:from-pink-200 hover:to-rose-200"
      >
        Open in Maps
      </a>
    </div>
  )
}

export default PlaceCard