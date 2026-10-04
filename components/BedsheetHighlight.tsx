import Link from "next/link";
import Image from "next/image";

export function BedsheetHighlight() {
  return (
    <section className="mt-24 bg-charcoal text-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative h-72 md:h-96 rounded-sm overflow-hidden">
          <Image
            src="/images/product-bedsheet-satin.jpg"
            alt="Satin bedsheet set"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="tracking-tracked text-xs text-gold-soft mb-3">
            HOME TEXTILE EDIT
          </p>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight">
            Dress your bed{" "}
            <em className="italic">like a room, not a bedsheet.</em>
          </h2>
          <p className="mt-4 text-beige/80 max-w-md text-sm">
            100% cotton, khaddar and satin finishes in King and Double sizes,
            complete with matching pillow covers.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-6 px-7 py-3 bg-gold hover:bg-[#8f6a30] text-ivory text-sm tracking-tracked transition-colors"
          >
            EXPLORE BEDSHEET COLLECTION
          </Link>
        </div>
      </div>
    </section>
  );
}
