import React, { useState } from 'react';
import axios from 'axios';
import '../css/AddProductModal.css'; // Create a new CSS file for styling
import imageCompression from 'browser-image-compression';

function AddProductModal({ onClose }) {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0];
    const options = {
      maxSizeMB: 1,  // Maximum size in MB
      maxWidthOrHeight: 1024,  // Maximum width or height in pixels
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductData({ ...productData, image: reader.result });
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/products/add',
        productData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Product added successfully');
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleInputChange}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button type="submit">Add Product</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
