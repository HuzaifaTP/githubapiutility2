import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material";
import { Box } from "@mui/system";
import { API_search } from "../../api/index";
import { v4 as uuidv4 } from "uuid";
import UserSearch from "./components/user-search";


function User() {
  const [userName, setUserName] = useState("");
  const [userNameOptions, setUserNameOptions] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    console.log(userName)
    let arr = [];
    const fetchUsers = async () => {
      const res = await API_search.get(
        `/users?q=${userName}+repos:%3E0+followers:%3E0`
      );

      res.data.items.map((eachUser) => {
        arr.push(eachUser.login);
      });
      console.log(userNameOptions)
    };
    setUserNameOptions(arr);
    fetchUsers();
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
        noOptionsText={""}
        renderOption={(props, userNameOptions) => (
          <Box component="li" {...props} key={uuidv4()}>
            {userNameOptions}
          </Box>
        )}
        renderInput={(params) => (
          <TextField onChange = {e=>setUserName(e.target.value) } 
          {...params} label="Search for a Github user" />
        )}
      />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setUser(userName)}
      >
        Search
      </button>
    <UserSearch username  = {user}/>
    {console.log(userName)}
    </Stack>
    
    
  );
}

export default User;
