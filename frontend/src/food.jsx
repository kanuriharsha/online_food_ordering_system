import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Plus, Minus } from 'lucide-react';

// Simple Login Component
function Login({ onLogin, goToSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    // Call backend /login (dummy for now)
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        // For demo, just set localStorage
        localStorage.setItem('isLoggedIn', 'true');
        onLogin();
      } else {
        setErr('Invalid credentials');
      }
    } catch {
      setErr('Server error');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)'
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        padding: '2.5rem 2rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 24px 0 rgba(234,88,12,0.07)',
        minWidth: 320
      }}>
        <h2 style={{color:'#ea580c', fontWeight:'bold', fontSize:'2rem', marginBottom:'1.5rem', textAlign:'center'}}>Login</h2>
        <div style={{marginBottom:'1rem'}}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e=>setUsername(e.target.value)}
            style={{
              width:'100%',
              padding:'0.7rem 1rem',
              borderRadius:'0.7rem',
              border:'1px solid #f3f4f6',
              marginBottom:'0.7rem',
              fontSize:'1rem'
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            style={{
              width:'100%',
              padding:'0.7rem 1rem',
              borderRadius:'0.7rem',
              border:'1px solid #f3f4f6',
              fontSize:'1rem'
            }}
            required
          />
        </div>
        {err && <div style={{color:'#ef4444', marginBottom:'1rem', textAlign:'center'}}>{err}</div>}
        <button type="submit" style={{
          width:'100%',
          background:'#ea580c',
          color:'#fff',
          border:'none',
          borderRadius:'0.7rem',
          padding:'0.9rem 0',
          fontSize:'1.1rem',
          fontWeight:'600',
          cursor:'pointer',
          transition:'background 0.2s',
          marginBottom: '0.7rem'
        }}>Login</button>
        <button type="button" onClick={goToSignup} style={{
          width:'100%',
          background:'#fff',
          color:'#ea580c',
          border:'1px solid #ea580c',
          borderRadius:'0.7rem',
          padding:'0.7rem 0',
          fontSize:'1rem',
          fontWeight:'500',
          cursor:'pointer',
          transition:'background 0.2s'
        }}>Go to Signup</button>
      </form>
    </div>
  );
}

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Check login
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  // Initialize food items with placeholder images
  const foodItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Classic pizza with fresh tomatoes, mozzarella cheese, and basil leaves",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop",
      category: "Pizza",
      rating: 4.5
    },
    {
      id: 2,
      name: "Chicken Burger",
      description: "Juicy grilled chicken breast with lettuce, tomato, and special sauce",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      category: "Burgers",
      rating: 4.7
    },
    {
      id: 3,
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with caesar dressing, croutons, and parmesan",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
      category: "Salads",
      rating: 4.3
    },
    {
      id: 4,
      name: "Beef Tacos",
      description: "Three soft tacos filled with seasoned beef, lettuce, cheese, and salsa",
      price: 11.99,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      category: "Mexican",
      rating: 4.6
    },
    {
      id: 5,
      name: "Chicken Pasta",
      description: "Creamy alfredo pasta with grilled chicken and fresh herbs",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
      category: "Pasta",
      rating: 4.4
    },
    {
      id: 6,
      name: "Fish & Chips",
      description: "Crispy battered fish served with golden fries and tartar sauce",
      price: 13.99,
      image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=400&h=300&fit=crop",
      category: "Seafood",
      rating: 4.2
    },
    {
      id: 7,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with layers of chocolate frosting",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      category: "Desserts",
      rating: 4.8
    },
    {
      id: 8,
      name: "Vegetable Curry",
      description: "Spicy mixed vegetable curry served with basmati rice",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
      category: "Indian",
      rating: 4.5
    }
  ];

  // Dynamic search functionality
  const filteredFoodItems = useMemo(() => {
    return foodItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Add item to cart
  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevCart.filter(cartItem => cartItem.id !== id);
      }
    });
  };

  // Calculate total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="foodie-bg">
      {/* Embedded CSS for perfect look */}
      <style>{`
        .foodie-bg {
          min-height: 100vh;
          background: linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%);
          font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
        }
        .foodie-header {
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          position: sticky;
          top: 0;
          z-index: 40;
        }
        .foodie-title {
          color: #ea580c;
          font-weight: bold;
          font-size: 2rem;
        }
        .foodie-search {
          max-width: 400px;
          margin: 0 2rem;
        }
        .foodie-search input {
          width: 100%;
          padding: 0.5rem 1rem 0.5rem 2.5rem;
          border-radius: 9999px;
          border: 1px solid #f3f4f6;
          outline: none;
          transition: border 0.2s;
        }
        .foodie-search input:focus {
          border: 1.5px solid #ea580c;
        }
        .foodie-cart-btn {
          background: #ea580c;
          color: #fff;
          border: none;
          border-radius: 9999px;
          padding: 0.5rem 1.5rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          position: relative;
          cursor: pointer;
          transition: background 0.2s;
        }
        .foodie-cart-btn:hover {
          background: #c2410c;
        }
        .foodie-cart-count {
          position: absolute;
          top: -10px;
          right: -10px;
          background: #ef4444;
          color: #fff;
          font-size: 0.8rem;
          border-radius: 50%;
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .foodie-main {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        .foodie-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
        }
        .foodie-card {
          background: #fff;
          border-radius: 1rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          overflow: hidden;
          transition: box-shadow 0.2s, transform 0.2s;
          display: flex;
          flex-direction: column;
        }
        .foodie-card:hover {
          box-shadow: 0 8px 32px rgba(234,88,12,0.12);
          transform: translateY(-4px) scale(1.02);
        }
        .foodie-card-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }
        .foodie-card-rating {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: #fff;
          color: #ea580c;
          font-weight: 600;
          font-size: 1rem;
          border-radius: 9999px;
          padding: 0.2rem 0.7rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.07);
        }
        .foodie-card-content {
          padding: 1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .foodie-card-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .foodie-card-desc {
          color: #6b7280;
          font-size: 0.95rem;
          margin-bottom: 1rem;
          min-height: 2.5rem;
        }
        .foodie-card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .foodie-add-btn {
          background: #ea580c;
          color: #fff;
          border: none;
          border-radius: 9999px;
          padding: 0.5rem 1.2rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .foodie-add-btn:hover {
          background: #c2410c;
        }
        .foodie-cart-sidebar-bg {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 50;
        }
        .foodie-cart-sidebar {
          position: fixed;
          right: 0;
          top: 0;
          height: 100vh;
          width: 400px;
          background: #fff;
          box-shadow: -2px 0 16px rgba(0,0,0,0.08);
          z-index: 51;
          display: flex;
          flex-direction: column;
        }
        .foodie-cart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border-bottom: 1px solid #f3f4f6;
        }
        .foodie-cart-close {
          background: none;
          border: none;
          font-size: 2rem;
          color: #6b7280;
          cursor: pointer;
        }
        .foodie-cart-list {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
        }
        .foodie-cart-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #f9fafb;
          border-radius: 0.7rem;
          padding: 0.7rem;
          margin-bottom: 1rem;
        }
        .foodie-cart-item-img {
          width: 48px;
          height: 48px;
          object-fit: cover;
          border-radius: 0.5rem;
        }
        .foodie-cart-item-info {
          flex: 1;
        }
        .foodie-cart-item-title {
          font-size: 1rem;
          font-weight: 500;
        }
        .foodie-cart-item-price {
          color: #ea580c;
          font-weight: 600;
        }
        .foodie-cart-item-qty {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .foodie-cart-item-qty-btn {
          background: #f3f4f6;
          border: none;
          border-radius: 9999px;
          padding: 0.3rem 0.6rem;
          cursor: pointer;
          font-size: 1rem;
          color: #374151;
          transition: background 0.2s;
        }
        .foodie-cart-item-qty-btn.plus {
          background: #ea580c;
          color: #fff;
        }
        .foodie-cart-item-qty-btn.plus:hover {
          background: #c2410c;
        }
        .foodie-cart-footer {
          border-top: 1px solid #f3f4f6;
          padding: 1rem;
        }
        .foodie-cart-total {
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }
        .foodie-checkout-btn {
          width: 100%;
          background: #ea580c;
          color: #fff;
          border: none;
          border-radius: 0.7rem;
          padding: 0.9rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .foodie-checkout-btn:hover {
          background: #c2410c;
        }
        @media (max-width: 600px) {
          .foodie-main { padding: 0 0.5rem; }
          .foodie-cart-sidebar { width: 100vw; }
        }
      `}</style>

      {/* Header */}
      <header className="foodie-header">
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px'}}>
          <div>
            <span className="foodie-title">FoodieExpress</span>
          </div>
          {/* Search Bar */}
          <div className="foodie-search" style={{flex: 1}}>
            <div style={{position: 'relative'}}>
              <Search style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', width: '20px', height: '20px'}} />
              <input
                type="text"
                placeholder="Search for food..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="foodie-cart-btn"
          >
            <ShoppingCart style={{width: '20px', height: '20px', marginRight: '0.5rem'}} />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="foodie-cart-count">{totalItems}</span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="foodie-main">
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <h2 style={{fontSize: '2.2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.7rem'}}>Delicious Food Delivered</h2>
          <p style={{fontSize: '1.1rem', color: '#6b7280'}}>Order your favorite meals from the best restaurants</p>
        </div>

        {/* Food Grid */}
        <div className="foodie-grid">
          {filteredFoodItems.map((item) => (
            <div key={item.id} className="foodie-card">
              <div style={{position: 'relative'}}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="foodie-card-img"
                />
                <div className="foodie-card-rating">
                  ★ {item.rating}
                </div>
              </div>
              <div className="foodie-card-content">
                <div className="foodie-card-title">{item.name}</div>
                <div className="foodie-card-desc">{item.description}</div>
                <div className="foodie-card-bottom">
                  <span style={{fontSize: '1.3rem', fontWeight: 'bold', color: '#ea580c'}}>${item.price}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="foodie-add-btn"
                  >
                    <Plus style={{width: '16px', height: '16px'}} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredFoodItems.length === 0 && (
          <div style={{textAlign: 'center', padding: '3rem 0'}}>
            <p style={{fontSize: '1.1rem', color: '#6b7280'}}>No food items found matching your search.</p>
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <>
          <div className="foodie-cart-sidebar-bg" onClick={() => setIsCartOpen(false)}></div>
          <div className="foodie-cart-sidebar">
            <div className="foodie-cart-header">
              <h3 style={{fontWeight: '600', fontSize: '1.1rem'}}>Your Cart</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="foodie-cart-close"
                aria-label="Close cart"
              >
                ×
              </button>
            </div>
            <div className="foodie-cart-list">
              {cart.length === 0 ? (
                <p style={{color: '#6b7280', textAlign: 'center', padding: '2rem 0'}}>Your cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="foodie-cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="foodie-cart-item-img"
                    />
                    <div className="foodie-cart-item-info">
                      <div className="foodie-cart-item-title">{item.name}</div>
                      <div className="foodie-cart-item-price">${item.price}</div>
                    </div>
                    <div className="foodie-cart-item-qty">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="foodie-cart-item-qty-btn"
                      >
                        <Minus style={{width: '16px', height: '16px'}} />
                      </button>
                      <span style={{width: '2rem', textAlign: 'center'}}>{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="foodie-cart-item-qty-btn plus"
                      >
                        <Plus style={{width: '16px', height: '16px'}} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="foodie-cart-footer">
                <div className="foodie-cart-total">Total: ${total.toFixed(2)}</div>
                <button className="foodie-checkout-btn">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
