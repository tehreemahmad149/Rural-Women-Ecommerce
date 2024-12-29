import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ShopPage.css'; 
import AddProductModal from '../components/AddProductModal';
import RemoveProductModal from '../components/RemoveProductModal';
import { Link } from 'react-router-dom';

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const token = localStorage.getItem('token');  // Ensure the token is stored in localStorage
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isRemoveProductModalOpen, setIsRemoveProductModalOpen] = useState(false);

  // Fetch products from the backend
  useEffect(() => {
    const fetchUserRole = axios.get('http://localhost:5000/api/users/profile', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    
    const fetchProducts = axios.get('http://localhost:5000/api/products/all');
  
    Promise.all([fetchUserRole, fetchProducts])
      .then(([userResponse, productsResponse]) => {
        setUserRole(userResponse.data.role); // Set the user's role
        setProducts(productsResponse.data.data); // Set the products list
      })
      .catch(error => console.log('Error fetching data:', error));
  }, []);
  

  const addToCart = (itemId) => {
    const product = products.find((prod) => prod._id === itemId); // Find the product details
    if (!product) return; // Exit if product is not found (edge case)
  
    // Send request to backend to update cart (optional for persistence)
    axios.post('http://localhost:5000/api/items/cart', { itemId }, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' }
    })
    .then(() => {
      // Add the product to the cart state
      setCart((prevCart) => [...prevCart, product]); // Add the product to the cart
    })
    .catch((error) => console.log(error));
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    axios.delete('http://localhost:5000/api/items/cart', {
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      data: { itemId }
    })
    .then(() => {
      setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
    })
    .catch(error => console.log(error));
  };

  // Calculate total price of items in cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  
  return (
<div className="shop-page">
  <h1>Shop Page</h1>
  <div className="products">
    {products.map(product => (
      <div key={product._id} className="product-card">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <img className='product-img' src={product.image} alt={product.name} /> {/* Use "image" as a URL */}
        <p>${product.price}</p>
        <button onClick={() => addToCart(product._id)}>Add to Cart</button>
        <Link to={`/story/${product._id}`}>
              <button>View Story</button>
        </Link>
      </div>
    ))}
  </div>
    {userRole === 'entrepreneur' && (
        <button className='ShopPage-button' onClick={() => setIsAddProductModalOpen(true)}>Add Product</button>
      )}
      {isAddProductModalOpen && (
        <AddProductModal onClose={() => setIsAddProductModalOpen(false)} />
      )}
      {userRole === 'entrepreneur' && (
        <>
          <button className="ShopPage-button" onClick={() => setIsRemoveProductModalOpen(true)}>
            Remove Products
          </button>

          {/* Show RemoveProductModal when it's open */}
          {isRemoveProductModalOpen && (
            <RemoveProductModal onClose={() => setIsRemoveProductModalOpen(false)} />
          )}
        </>
      )}

      {/* Cart Toggle */}
      <button className='ShopPage-button' onClick={() => setCartVisible(!cartVisible)}>Cart ({cart.length})</button>

      {/* Cart */}
      {cartVisible && (
      <div className="cart">
        <h2>Your Cart</h2>
        <ul>
          {cart.map(item => (
            <li key={item._id}>
              <p>{item.name} - ${item.price.toFixed(2)}</p>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </li>
          ))}
        </ul>
        <h3>Total: ${getTotalPrice()}</h3>
        <button>Checkout</button>
      </div>
    )}
    </div>
  );
}

export default ShopPage;
