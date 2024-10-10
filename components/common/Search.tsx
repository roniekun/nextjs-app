import SearchBar from "../features/search/search-bar";
import PageTransitionLayout from "@/provider/PageTransitionLayout";
import Container from "../lib/ui/container";
import { IContentData } from "@/data/content-data";

interface Props {
  contentData: IContentData[];
  placeholder: string;
}
const Search: React.FC<Props> = ({ contentData, placeholder }) => {
  return (
    <PageTransitionLayout>
      <Container className="relative w-full lg:h-auto h-[--hero-height] justify-center items-center">
        <SearchBar contentData={contentData} placeholder={placeholder} />
      </Container>
    </PageTransitionLayout>
  );
};

export default Search;
