import { useState } from "react";
import { CiSearch } from "react-icons/ci";

// type SearchProps = {
//   onSearch: (query?: string) => void;
// };

const Search = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query) {
      console.log(query);
    }
    setQuery("");
  };
  return (
    <div className="flex relative items-center px-2 rounded-full m-1 right-0 border-gray-300  bg-neutral-50 md:max-w-[50vw] flex-1 py-2 mx-5">
      <input
        type="text"
        value={query}
        onChange={(e) => handleInputChange(e)}
        placeholder="Search..."
        className="appearance-none bg-transparent border-none flex-1 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className=" text-neutral-950 aspect-square bg-neutral-300 rounded-full h-auto"
        type="button"
      >
        <CiSearch className=" w-6 h-6 mx-1" />
      </button>
    </div>
  );
};

export default Search;
