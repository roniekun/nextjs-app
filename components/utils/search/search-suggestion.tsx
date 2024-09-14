import { IContentData } from "../data/content-data";
export interface filteredResultProps {
  title: string;
  link?: string;
}

type Props = {
  filteredResults?: filteredResultProps[];
};

export const SearchSuggestionModal: React.FC<Props> = ({ filteredResults }) => {
  return (
    <ul className="flex flex-col">
      {filteredResults?.map((result, idx) => (
        <li key={idx}>
          <a className="cursor-pointer hover:bg-neutral-300" href={result.link}>
            {result.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
