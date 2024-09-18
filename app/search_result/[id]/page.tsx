import { Metadata } from "next";
import { contentData } from "@/data/content-data";

// This function dynamically generates the metadata based on the result.
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Convert params.id to a number and check if it is valid
  const id = Number(params.id);
  if (isNaN(id)) {
    return {
      title: "Not Found",
      description: "Invalid ID",
    };
  }

  const result = contentData.find((data) => data.id === id);

  return {
    title: result ? result.title : "Not Found",
    description: result
      ? result.content.slice(0, 150)
      : "No description available",
  };
}

export default function SearchResultPage({
  params,
}: {
  params: { id: string };
}) {
  // Convert params.id to a number and check if it is valid
  const id = Number(params.id);
  if (isNaN(id)) {
    return (
      <div>
        <h1>Result Not Found</h1>
        <p>Invalid ID</p>
      </div>
    );
  }

  const result = contentData.find((data) => data.id === id);

  return (
    <div>
      <h1>{result?.title || "Result Not Found"}</h1>
      <p>{result?.content || "No content available"}</p>
    </div>
  );
}
