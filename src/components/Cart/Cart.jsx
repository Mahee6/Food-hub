import React, { useEffect, useState } from 'react';
import './Cart.css';
import { db, auth } from '../../firebase';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

const Cart = () => {
  const [firebaseCartItems, setFirebaseCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState('');

  // Fetch cart items from Firestore on load
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, 'cartitem'), where('user', '==', user.email));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFirebaseCartItems(items);
    });

    return () => unsubscribe();
  }, []);

  // Handle delete item from Firestore
  const handleDeleteItem = async (docId) => {
    try {
      await deleteDoc(doc(db, 'cartitem', docId));
      console.log('Item deleted from cart.');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Calculate totals
  const subtotal = firebaseCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const deliveryFee = 2;

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'ABCD') {
      setDiscount(5);
      setMessage('✔️ 5% discount applied.');
    } else if (code === 'ABCS') {
      setDiscount(10);
      setMessage('✔️ 10% discount applied.');
    } else if (code === 'SAVE20') {
      setDiscount(20);
      setMessage('✔️ 20% discount applied.');
    } else {
      setDiscount(0);
      setMessage('❌ Invalid promo code.');
    }
  };

  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount + deliveryFee;

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />

        {firebaseCartItems.length > 0 ? (
          firebaseCartItems.map(item => (
            <div key={item.id}>
              <div className='cart-items-item'>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>Rs{item.price}</p>
                <p>{item.quantity}</p>
                <p>Rs{item.price * item.quantity}</p>
                <p onClick={() => handleDeleteItem(item.id)} className='cross'>X</p>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <div className="empty-cart-message">
            <p>Your cart is empty.</p>
          </div>
        )}
      </div>

      {firebaseCartItems.length > 0 && (
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>Rs{subtotal.toFixed(2)}</p>
              </div>
              {discount > 0 && (
                <div className="cart-total-details">
                  <p>Discount ({discount}%)</p>
                  <p>-Rs{discountAmount.toFixed(2)}</p>
                </div>
              )}
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>Rs{deliveryFee}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>Rs{total.toFixed(2)}</b>
              </div>
            </div>
            <br />
            <a href='/cheakout' className='checkout-btn'>PROCEED TO CHECKOUT</a>
          </div>

          <div className="cart-promocode">
            <p>If you have a promo code, enter it here:</p>
            <div className='cart-prmocode-input'>
              <input
                type="text"
                placeholder="Enter Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handleApplyPromo}>Submit</button>
            </div>
            {message && <p className='promo-message'>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
