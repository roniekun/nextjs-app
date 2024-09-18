import { useParams } from "next/navigation";
import { Metadata } from "next";
import { contentData } from "@/data/content-data";

// This function dynamically generates the metadata based on the result.
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const result = contentData.find((data) => data.id === Number(params.id));

  return {
    title: result ? result.title : "Not Found",
    description: result
      ? result.content.slice(0, 150)
      : "No description available",
  };
}

export default function SearchResultPage() {
  const { id } = useParams();

  const result = contentData.find((data) => data.id === Number(id));

  return (
    <div>
      <h1>{result?.title || "Result Not Found"}</h1>
      <p>{result?.content || "No content available"}</p>
    </div>
  );
}
