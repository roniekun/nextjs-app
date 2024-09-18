import { contentData, IContentData } from "@/data/content-data";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SearchResultPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const filteredData = contentData.filter((data) => {
    const title = data.title.trim().toLowerCase();
    return title === query;
  });

  return (
    <div className="flex flex-col min-h-screen w-full">
      {filteredData.map((data, idx) => (
        <div key={idx}>
          <Link href={`/search_result/${data.id}`}>
            <h1>{data.title}</h1>
          </Link>
          <p>{data.content}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchResultPage;
