const SITE_URL = "https://www.kritikmc.com";
const DEFAULT_OG_IMAGE = "https://i.ibb.co/1s9X5g2/Kriti-Meta-Image.png";

function normalisePath(path = "") {
  if (!path) return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export function buildMetadata({
  title = "KRITI",
  description = "",
  path = "",
  keywords,
  openGraphImage = DEFAULT_OG_IMAGE,
  robots,
} = {}) {
  const canonicalPath = normalisePath(path);
  const url = `${SITE_URL}${canonicalPath}`;
  const keywordList = Array.isArray(keywords)
    ? keywords
    : typeof keywords === "string" && keywords.trim()
      ? [keywords.trim()]
      : undefined;

  const metadata = {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "kriti.",
      images: [
        {
          url: openGraphImage,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [openGraphImage],
    },
  };

  if (keywordList) {
    metadata.keywords = keywordList;
  }

  if (robots) {
    metadata.robots = robots;
  }

  return metadata;
}
