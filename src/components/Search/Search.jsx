import React, { useState } from 'react';
import './Search.css';
import { food_list } from '../../assets/assets';

const SearchFood = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFoods = food_list.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search food..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="food-list">
        {searchTerm.trim() === '' ? (
          <p className="no-results">Please enter a search term above.</p>
        ) : filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <div className="food-card" key={food.id}>
              <img
                style={{ objectFit: 'cover', width: '100%' }}
                src={food.image}
                alt={food.name}
              />
              <h3>{food.name}</h3>
              <p>{food.description}</p>
              <p className="price">₹{food.price}</p>
              {/* <button>Add to Cart</button> */}
            </div>
          ))
        ) : (
          <p className="no-results">No food found matching “{searchTerm}”.</p>
        )}
      </div>
    </div>
  );
};

export default SearchFood;
