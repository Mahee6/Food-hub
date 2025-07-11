import React, { useState } from 'react';
import './PlaceOrder.css';
import { db, auth } from '../../firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    city: '',
    pincode: '',
    paymentMethod: 'cash',
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [docId, setDocId] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode && docId) {
        // Update existing document
        const ref = doc(db, 'orders', docId);
        await updateDoc(ref, formData);
        alert('✅ Order updated successfully!');
      } else {
        // Add new order document
        const user = auth.currentUser;
        const orderRef = await addDoc(collection(db, 'orders'), {
          ...formData,
          user: user?.email || 'guest',
          timestamp: new Date(),
        });
        setDocId(orderRef.id);
        alert('✅ Order placed successfully!');
      }

      setSubmittedData(formData);
      setEditMode(false);
    } catch (err) {
      console.error('❌ Error submitting order:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <div className="placeorder-container">
      <h2>{editMode ? 'Edit Your Order' : 'Delivery Information'}</h2>

      <form className="placeorder-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Full Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />

        <label>Payment Method</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <option value="cash">Cash on Delivery</option>
          <option value="upi">UPI</option>
          <option value="card">Card</option>
        </select>

        <button type="submit">{editMode ? 'Update Order' : 'Submit Order'}</button>
      </form>

      {submittedData && !editMode && (
        <div className="order-summary">
          <h3>📦 Order Summary</h3>
          <p><strong>Name:</strong> {submittedData.fullName}</p>
          <p><strong>Address:</strong> {submittedData.address}</p>
          <p><strong>Phone:</strong> {submittedData.phone}</p>
          <p><strong>City:</strong> {submittedData.city}</p>
          <p><strong>Pincode:</strong> {submittedData.pincode}</p>
          <p><strong>Payment:</strong> {submittedData.paymentMethod}</p>
          <button onClick={handleEdit}>✏️ Edit Order</button>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
