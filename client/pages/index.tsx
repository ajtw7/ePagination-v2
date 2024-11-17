import { useState } from "react";
import { useRouter } from "next/router";
import Search from "../components/Search";

interface SearchResult {
  key: string;
  title: string;
  author_name?: string;
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  const searchSubmit = (event: { preventDefault: () => void; }) => {
    console.log("button clicked");
    event.preventDefault();
    router.push(`/results/${searchTerm}`);
  };

  return (
    <div className="home-landing">
      <div className="home-container">
        <h1 className="home-text">Welcome to ePagination Digital Library</h1>

        <form onSubmit={searchSubmit}>
          <Search setSearchTerm={setSearchTerm} />
        </form>

        {searchResults &&
          searchResults.map((result) => {
            return (
              <div key={result.key}>
                {result.author_name && (
                  <div>
                    <h2>{result.title}</h2>
                    <h4>{result.author_name}</h4>
                  </div>
                )}
              </div>
            );
          })}

        {/* Use the SearchResults component */}
        {/* <SearchResults /> */}
      </div>
    </div>
  );
};

export default Home;