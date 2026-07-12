import { business } from "./business";
import Site from "./site";

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    url: business.siteUrl,
    telephone: `+${business.phoneInternational}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. P. Indah No.17X, Dauh Peken",
      addressLocality: "Tabanan",
      addressRegion: "Bali",
      postalCode: "82121",
      addressCountry: "ID",
    },
    hasMap: business.mapsUrl,
    sameAs: [business.instagramUrl],
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "17:00",
    }],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c") }} />
      <Site />
    </>
  );
}
