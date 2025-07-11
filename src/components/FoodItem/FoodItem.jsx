import React, { useContext } from 'react';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';
import { db, auth } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const FoodItem = ({ id, name, description, price, image }) => {
  const { addToCart, cartItems } = useContext(StoreContext);
  const quantity = cartItems[id] || 0;

  const handleAddToCart = async () => {
    addToCart(id);

    try {
      const user = auth.currentUser;

      await addDoc(collection(db, 'cartitem'), {
        itemId: id,
        name,
        description,
        price,
        image,
        quantity: 1,
        user: user ? user.email : 'guest',
        timestamp: new Date()
      });

      console.log('Item added to Firestore cartitem collection');
    } catch (error) {
      console.error('Error adding item to Firestore:', error);
    }
  };

  return (
    <div className="food-item">
      <img src={image} alt={name} className="food-img" />
      <h3>{name}</h3>
      <p>{description}</p>
      <p style={{ fontWeight: 'bold', color: '#28a745' }}>₹{price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      {quantity > 0 && <p>In Cart: {quantity}</p>}
    </div>
  );
};

export default FoodItem;
