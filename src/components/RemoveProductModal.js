import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/RemoveProductModal.css'; // Create a new CSS file for styling

const RemoveProductModal = ({ onClose }) => {
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products uploaded by the current user
  const fetchUserProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/products/user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUserProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching user products', error);
      alert('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProducts();
  }, []);

  // Handle removing a product
  const handleRemoveProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      // Refresh the products after successful deletion
      setUserProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
      alert('Product removed successfully');
    } catch (error) {
      console.error('Error removing product', error);
      alert('Failed to remove product');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Remove Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="product-list">
            {userProducts.length === 0 ? (
              <p>No products found</p>
            ) : (
              userProducts.map((product) => (
                <div key={product._id} className="product-card-remove">
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <button onClick={() => handleRemoveProduct(product._id)}>Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        <button type="button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RemoveProductModal;
