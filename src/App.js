import logo from "./logo.svg";
import "./App.css";
import ListItem from "./components/ListItems/ListItem";
import SearchInput from "./components/searchInput/searchInput";
import debounce from "lodash.debounce";
import { API_search } from "./api/index";
import React from "react";

const fetchData = async (query, cb) => {
  console.warn("fetching " + query);
  const res = await fetchSearchResults(query);
  cb(res);
};

const fetchSearchResults = async (query) => {
  const res = await API_search.get(
    `/users?q=${query}+repos:%3E0+followers:%3E0`
  );
  return res.data.items;
};

const debouncedFetchData = debounce((query, cb) => {
  fetchData(query, cb);
}, 500);

function App() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    debouncedFetchData(query, (res) => {
      setResults(res);
      console.log(results);
    });
  }, [query]);

  return (
    <div className="container">
      <SearchInput
        value={query}
        onChangeText={(e) => {
          setQuery(e.target.value);
        }}
      />
      {results.map((result, index) => (
        <div key = {index}>
          <ListItem name={result.login} />
        </div>
      ))}
    </div>
  );
}

export default App;
