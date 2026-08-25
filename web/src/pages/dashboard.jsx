import React, { useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';
import Navbar from "../components/navbar/navbar";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import StitchProductCard from "../components/StitchProductCard/StitchProductCard";
import { useCartStore } from "../store/cartStore";
import { useTranslatedProducts, useTranslatedFeaturedProduct } from "../hooks/useTranslatedProducts";
import "./dashboard.css";

export default function Dashboard() {
  const { t } = useTranslation();
  const [sortOption, setSortOption] = useState("Popular");
  const addItem = useCartStore((state) => state.addItem);
  
  const { filteredProducts } = useTranslatedProducts();
  const featuredProduct = useTranslatedFeaturedProduct();

  const userData = useMemo(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const rawSessionUser = localStorage.getItem("sessionUser");

    if (!isAuthenticated || !rawSessionUser) {
      return null;
    }

    try {
      return JSON.parse(rawSessionUser);
    } catch {
      return null;
    }
  }, []);

  const SORT_OPTIONS = [
    { id: "Popular", label: t('dashboard.filters.popular') },
    { id: "Newest", label: t('dashboard.filters.newest') },
    { id: "Price", label: t('dashboard.filters.price') }
  ];

  const sortedProducts = useMemo(() => {
    const items = [...filteredProducts];

    if (sortOption === "Price") {
      return items.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "Newest") {
      return items.sort((a, b) => Number(b.id) - Number(a.id));
    }

    return items.sort((a, b) => {
      const scoreA = (a.rating || 0) * 100 + (a.reviewCount || 0);
      const scoreB = (b.rating || 0) * 100 + (b.reviewCount || 0);
      return scoreB - scoreA;
    });
  }, [filteredProducts, sortOption]);

  React.useEffect(() => {
    if (!userData) {
      window.location.replace("/login");
    }
  }, [userData]);

  if (!userData) {
    return null;
  }

  const userName =
    String(userData.fullName || "").trim() ||
    String(userData.email || "").split("@")[0] ||
    "User";

  const handleAddToCart = (product) => {
    addItem(product);
  };

  const handleOrderNow = () => {
    if (featuredProduct) {
      addItem(featuredProduct);
    }
  };

  return (
    <div className="dashboard-stitch">
      <Navbar userName={userName} currentPage="catalog" />

      <div className="dashboard-stitch__layout">
        <SideNavBar />

        <main className="dashboard-stitch__main">
          {featuredProduct && (
            <HeroBanner product={featuredProduct} onOrderClick={handleOrderNow} />
          )}

          <section className="dashboard-stitch__filters">
            <div>
              <h2 className="dashboard-stitch__title">{t('dashboard.catalog.title')}</h2>
              <p className="dashboard-stitch__subtitle">
                {t('dashboard.catalog.subtitle')}
              </p>
            </div>
            <div className="dashboard-stitch__filter-pills">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  className={`dashboard-stitch__pill ${
                    sortOption === option.id ? "dashboard-stitch__pill--active" : ""
                  }`}
                  onClick={() => setSortOption(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </section>

          <div className="dashboard-stitch__grid">
            {sortedProducts.map((product) => (
              <StitchProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="dashboard-stitch__empty">
              <p>{t('dashboard.catalog.empty')}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
