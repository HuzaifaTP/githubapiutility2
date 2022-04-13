import React, { useState, useEffect } from "react";
import { API_search } from "../../../api/index";

function UserSearch(props) {
  const [dataDisplay, setDataDisplay]= useState([]);


  useEffect(() => {
    const fetchUserStats = async () => {
      console.log("user-search", props.username);
      const res = await API_search.get(
        `/users?q=${props.username}+repos:%3E0+followers:%3E0`
      );
      res.data.items.map(userName=>{
         setDataDisplay(userName.avatar_url)
      });
    };

    fetchUserStats();
  }, [props.username]);

  return (
  <div>
     <img src ={dataDisplay}/>
  </div>
 
  )
}

export default UserSearch;
