import { Metadata } from "next";
import { contentData } from "@/data/content-data";
import Container from "@/components/lib/ui/container";

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
  const id = Number(params.id);
  const result = contentData.find((data) => data.id === id);

  return (
    <div className="relative w-full bg-gray-300 justify-center items-start flex flex-col">
      {isNaN(id) ? (
        <Container className="relative min-h-[screen] flex flex-col">
          <h1 className="text-xl">Result Not Found</h1>
          <p>Invalid ID</p>
        </Container>
      ) : (
        <Container className="relative min-h-[screen] bg-red-500 flex flex-col">
          <h1 className="text-lg">{result?.title || "Result Not Found"}</h1>
          <p>{result?.content || "No content available"}</p>
        </Container>
      )}
    </div>
  );
}
