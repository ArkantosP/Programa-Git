import React from 'react';
import { Add } from '@mui/icons-material';
import { useCartStore } from '../../store/cartStore';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
  };

  const handleCardClick = () => {
    window.history.pushState({}, '', `/product/${product.id}`);
    window.location.pathname = `/product/${product.id}`;
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    handleAddToCart();
  };

  return (
    <div className="product-card" onClick={handleCardClick} role="button" tabIndex={0}>
      <div className="product-card__image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
      </div>
      
      <div className="product-card__content">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        
        <div className="product-card__footer">
          <span className="product-card__price">${product.price.toFixed(2)}</span>
          <button
            className="product-card__add-btn"
            onClick={handleAddToCartClick}
            aria-label={`Add ${product.name} to cart`}
          >
            <Add />
          </button>
        </div>
      </div>
    </div>
  );
}
