const SWATCHES = [
  "swatch-women",
  "swatch-men",
  "swatch-bed",
  "swatch-women",
  "swatch-men",
  "swatch-bed",
] as const;

// Replace with a real feed via the Instagram Basic Display / Graph API,
// or an embed service such as SnapWidget / Elfsight.
export function InstagramFeed() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 mt-20">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl md:text-4xl">
          @luxewear on Instagram
        </h2>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {SWATCHES.map((s, i) => (
          <div key={i} className={`${s} fabric-weave aspect-square rounded-sm`} />
        ))}
      </div>
    </section>
  );
}
