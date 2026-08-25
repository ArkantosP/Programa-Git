import React from "react";
import { AddShoppingCart, Favorite } from "@mui/icons-material";
import { useTranslation } from 'react-i18next';
import { useFormattedPrice } from '../../hooks/useCurrency';
import "./StitchProductCard.css";

export default function StitchProductCard({ product, onAddToCart }) {
  const { t } = useTranslation();
  const formattedPrice = useFormattedPrice(product.price);
  
  const handleCardClick = () => {
    window.location.href = `/product/${product.id}`;
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <article className="stitch-card" onClick={handleCardClick}>
      <div className="stitch-card__image-container">
        <img
          src={product.image}
          alt={product.name}
          className="stitch-card__image"
          loading="lazy"
        />
        <button 
          className="stitch-card__favorite" 
          aria-label="Add to favorites"
          onClick={(e) => e.stopPropagation()}
        >
          <Favorite />
        </button>
      </div>

      <div className="stitch-card__body">
        <div className="stitch-card__header">
          <div>
            <h3 className="stitch-card__title">{product.shortName || product.name}</h3>
            <p className="stitch-card__subtitle">{product.description}</p>
          </div>
          <span className="stitch-card__price">{formattedPrice.formatted}</span>
        </div>

        <button className="stitch-card__add-btn" onClick={handleAddClick}>
          <AddShoppingCart fontSize="small" /> {t('dashboard.card.add')}
        </button>
      </div>
    </article>
  );
}
