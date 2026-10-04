const REVIEWS = [
  {
    quote:
      "Fabric quality bilkul boutique jaisi hai — unstitched lawn ka print aur finishing dono zabardast the.",
    name: "Ayesha, Lahore",
  },
  {
    quote:
      "Ordered a Shalwar Kameez for my father, fit and stitching guide on the size chart were spot on.",
    name: "Hamza, Karachi",
  },
  {
    quote:
      "The king size bedsheet set with matching pillow covers made our whole room look expensive.",
    name: "Sana, Islamabad",
  },
];

export function Reviews() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 mt-20 mb-24">
      <h2 className="font-serif text-3xl md:text-4xl text-center mb-10">
        What Our Customers Say
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {REVIEWS.map((r) => (
          <div key={r.name} className="p-7 border border-black/10 rounded-sm">
            <p className="text-gold mb-3">★★★★★</p>
            <p className="text-sm text-ink/80">{r.quote}</p>
            <p className="font-serif mt-4">— {r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
