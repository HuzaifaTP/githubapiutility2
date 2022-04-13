import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material";
import { Box } from "@mui/system";
import { API_search } from "../../api/index";
import { v4 as uuidv4 } from "uuid";
import UserSearch from "./components/user-search";
import axios from "axios";
import { configure } from "@testing-library/react";

function User() {

  let cancelToken;

  const [input, setInput] = useState("");
    
  const fetchUsers = async (input) => {
      if (cancelToken) {
        cancelToken.cancel("Search cancelled as user is still searching...");
      }
      cancelToken = axios.CancelToken.source()
      let results;
      try{
      results = await axios.get(`https://api.github.com/search/users?q=${input}+repos:%3E0+followers:%3E0`,{cancelToken: cancelToken.token,});
      }catch(error){

       console.log(error)
      }
      console.log({results})
    };


  function handleOnInputChange(event) {
    const input = event.target.value;
    setInput(input)
    fetchUsers(input)
  }

  return (
    <div className="container">
      {/*Heading*/}
      <h2 className="heading">Live Search Using Github API</h2>

      {/*Search Input*/}
      <label className="search-label" htmlFor="search-input">
        <input
          type="text"
          value={input}
          id="search-input"
          placeholder="Github User Search"
          onChange={handleOnInputChange}
        />
        <i className="fa fa-search search-icon" />
      </label>
    </div>
  );
}

export default User;
