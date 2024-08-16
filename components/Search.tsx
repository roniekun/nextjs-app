import { useState } from "react";

type SearchProps = {
  onSearch: (query?: string) => void;
};

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex relative items-center px-2 rounded-sm m-1 right-0 border-gray-300  bg-neutral-50 max-w-[50vw] py-2 mx-5">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="appearance-none bg-transparent border-none  text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="rounded-sm text-neutral-950 font-medium"
        type="button"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
