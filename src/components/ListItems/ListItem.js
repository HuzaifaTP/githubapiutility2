import React from 'react';
import './ListItem.css';


const ListItem = ({ name }) => {
  return (
    <div class="list-item-container">
      <div className="center">
        <option>{name}</option>
      </div>
    </div>
  );
};

export default ListItem;
