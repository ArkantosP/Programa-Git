import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/navbar/navbar';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel';
import { useCartStore } from '../store/cartStore';
import { useTranslatedProduct } from '../hooks/useTranslatedProducts';
import { useCurrency } from '../hooks/useCurrency';
import './ProductDetail.css';

export default function ProductDetail() {
  const { t } = useTranslation();
  const { format: formatPrice } = useCurrency();
  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const addItem = useCartStore((state) => state.addItem);

  const productId = useMemo(() => {
    const path = window.location.pathname;
    return path.split('/product/')[1];
  }, []);

  const product = useTranslatedProduct(productId);

  useMemo(() => {
    if (product?.flavors && product.flavors.length > 0 && !selectedFlavor) {
      setSelectedFlavor(product.flavors[0].id);
    }
  }, [product, selectedFlavor]);

  const userData = useMemo(() => {
    const rawSessionUser = localStorage.getItem("sessionUser");
    if (!rawSessionUser) return null;
    try {
      return JSON.parse(rawSessionUser);
    } catch {
      return null;
    }
  }, []);

  const userName = useMemo(() => {
    if (!userData) return "Usuario";
    return String(userData.fullName || "").trim() ||
           String(userData.email || "").split("@")[0] ||
           "Usuario";
  }, [userData]);

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem({ ...product, selectedFlavor });
      }
    }
  };

  if (!product) {
    return (
      <div className="product-detail">
        <Navbar userName={userName} />
        <div className="product-detail__layout">
          <SideNavBar />
          <div className="product-detail__error">
            <h1>{t('productDetail.notFound')}</h1>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = product.price * quantity;

  return (
    <div className="product-detail">
      <Navbar userName={userName} />

      <div className="product-detail__layout">
        <SideNavBar />

        <div className="product-detail__main">
          <main className="product-detail__content">
            <section className="product-detail__image-section">
              <div className="product-detail__image-container">
                <ImageCarousel 
                  images={product.images || [product.image]} 
                  productName={product.name}
                />
                {product.featured && (
                  <span className="product-detail__badge">
                    {t('productDetail.badge')}
                  </span>
                )}
              </div>
            </section>

            <section className="product-detail__info">
              <nav className="product-detail__breadcrumbs" aria-label="Breadcrumb">
                <a href="/dashboard" className="product-detail__breadcrumb-link">{t('productDetail.breadcrumbs.catalog')}</a>
                <span className="product-detail__breadcrumb-separator">›</span>
                <a href="/dashboard" className="product-detail__breadcrumb-link">
                  {product.category || 'Daifuku'}
                </a>
                <span className="product-detail__breadcrumb-separator">›</span>
                <span className="product-detail__breadcrumb-current">{product.name}</span>
              </nav>

              <h1 className="product-detail__title">{product.name}</h1>

              <div className="product-detail__price-row">
                <div className="product-detail__price">
                  <span>{formatPrice(product.price).formatted}</span>
                  {product.discount > 0 && (
                    <>
                      <span className="product-detail__original-price">
                        {formatPrice(product.originalPrice).formatted}
                      </span>
                      <span className="product-detail__discount">
                        -{product.discount}%
                      </span>
                    </>
                  )}
                </div>
                <div className="product-detail__rating-badge">
                  <span>⭐</span>
                  <span>{product.rating}/5 ({product.reviewCount}+ {t('productDetail.reviews')})</span>
                </div>
              </div>

              <p className="product-detail__description">
                {product.longDescription || product.description}
              </p>

              <div className="product-detail__flavors">
                <h3 className="product-detail__flavors-title">{t('productDetail.selectFlavor')}</h3>
                <div className="product-detail__flavors-list">
                  {product.flavors?.map((flavor) => (
                    <button
                      key={flavor.id}
                      onClick={() => setSelectedFlavor(flavor.id)}
                      className={`product-detail__flavor-btn ${
                        selectedFlavor === flavor.id ? 'active' : ''
                      }`}
                    >
                      {flavor.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="product-detail__actions-row">
                <div className="product-detail__quantity">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="product-detail__quantity-btn"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="product-detail__quantity-value">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="product-detail__quantity-btn"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="product-detail__add-to-cart-desktop"
                >
                  <span>🛒</span>
                  <span>{t('productDetail.addToCart')}</span>
                  <span className="product-detail__total-price">{formatPrice(totalPrice).formatted}</span>
                </button>
              </div>
            </section>
          </main>

          <section className="product-detail__features">
            <div className="product-detail__feature">
              <div className="product-detail__feature-icon">🌾</div>
              <div className="product-detail__feature-content">
                <h4 className="product-detail__feature-title">{t('productDetail.features.organic.title')}</h4>
                <p className="product-detail__feature-description">{t('productDetail.features.organic.description')}</p>
              </div>
            </div>
            <div className="product-detail__feature">
              <div className="product-detail__feature-icon">⏰</div>
              <div className="product-detail__feature-content">
                <h4 className="product-detail__feature-title">{t('productDetail.features.fresh.title')}</h4>
                <p className="product-detail__feature-description">{t('productDetail.features.fresh.description')}</p>
              </div>
            </div>
            <div className="product-detail__feature">
              <div className="product-detail__feature-icon">💧</div>
              <div className="product-detail__feature-content">
                <h4 className="product-detail__feature-title">{t('productDetail.features.sweetness.title')}</h4>
                <p className="product-detail__feature-description">{t('productDetail.features.sweetness.description')}</p>
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="product-detail__story">
            <div className="product-detail__story-content">
              <h2 className="product-detail__story-title">{t('productDetail.story.title')}</h2>
              <p className="product-detail__story-text">
                {t('productDetail.story.description1')}
              </p>
              <p className="product-detail__story-text">
                {t('productDetail.story.description2')}
              </p>
              <a href="#" className="product-detail__story-link">
                <span>{t('productDetail.story.link')}</span>
                <span>→</span>
              </a>
            </div>
            <div className="product-detail__story-image">
              <img 
                src="https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=600" 
                alt="Traditional Mochitsuki process"
                className="product-detail__story-img"
              />
            </div>
          </section>

          <div className="product-detail__bottom-bar">
            <button 
              onClick={handleAddToCart}
              className="product-detail__add-to-cart"
            >
              <span>{t('productDetail.addToCart')}</span>
              <span className="product-detail__total-price">{formatPrice(totalPrice).formatted}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
