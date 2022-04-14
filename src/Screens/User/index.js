import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material";
import { Box } from "@mui/system";
import { API_search } from "../../api/index";
import { v4 as uuidv4 } from "uuid";
import UserSearch from "./components/user-search";
import debounce from "lodash.debounce";



function User() {

  const fetchData = async (userName, cb) => {
    try{
      console.warn("fetching " + userName);
      const res = await fetchSearchResults(userName);
      cb(res);
    }catch(error){
      setErrorMessage(error)
    }
    
  };
  
  const fetchSearchResults = async (userName) => {
    const res = await API_search.get(
      `/users?q=${userName}+repos:%3E0+followers:%3E0`
    );
    console.log("fetching from API......");
    return res.data.items;
  };
  
  const debouncedFetchData = debounce((userName, cb) => {
    fetchData(userName, cb);
  }, 0);

  const [userName, setUserName] = useState("");
  const [userNameOptions, setUserNameOptions] = useState();
  const [user, setUser] = useState();
  const [errorMessage, setErrorMessage]= useState("");

  useEffect(() => {
    let arr = [];
      debouncedFetchData(userName, (res) => {
        res.map((eachUser) => {
          arr.push(eachUser.login);
        });
      });
      setUserNameOptions(arr);
     
  }, [userName]);

  return (
    <Stack
      sx={{
        width: 400,
        margin: "auto",
      }}
    >
      <Autocomplete
        id="user_search"
        getOptionLabel={(userNameOptions) => `${userNameOptions}`}
        options={userNameOptions}
        sx={{ width: 400 }}
        isOptionEqualToValue={(option, value) =>
          option.userNameOptions === value.userNameOptions
        }
        noOptionsText={"Expand to View Suggestions"}
        renderOption={(props, userNameOptions) => (
          <Box component="li" {...props} key={uuidv4()}>
            {userNameOptions}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            onChange={(e) => setUserName(e.target.value)}
            {...params}
            label="Search for a Github user"
          />
        )}
      />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setUser(userName)}
      >
        Search
      </button>
      <UserSearch username={user} />
      <div>{errorMessage.message}</div>
    </Stack>
  );
}

export default User;
