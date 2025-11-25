import { buildMetadata } from "@/app/lib/metadata";

function formatSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }) {
  const articleTitle = formatSlug(params.slug);
  return buildMetadata({
    title: `${articleTitle} | Kriti Article`,
    description:
      "Read in-depth insights and stories from the Kriti community at Kakatiya Medical College.",
    path: `/article/${params.slug}`,
    keywords: [
      `${articleTitle} article`,
      "kriti blog",
      "kakatiya medical college articles",
    ],
  });
}

const page = ({ params }) => {
  const articleTitle = formatSlug(params.slug);
  return <div>{articleTitle}</div>;
};

export default page;
