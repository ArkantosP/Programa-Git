import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/navbar/navbar';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import './ComingSoon.css';

export default function ComingSoon() {
  const { t } = useTranslation();

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

  return (
    <div className="coming-soon">
      <Navbar userName={userName} />
      
      <div className="coming-soon__layout">
        <SideNavBar />
        
        <main className="coming-soon__main">
          <div className="coming-soon__content">
            <div className="coming-soon__icon-container">
              <span className="coming-soon__icon">🎉</span>
              <div className="coming-soon__icon-decoration">
                <span>🍡</span>
                <span>🍨</span>
                <span>☕</span>
                <span>🌸</span>
              </div>
            </div>

            <h1 className="coming-soon__title">
              {t('comingSoon.title')}
            </h1>
            
            <p className="coming-soon__subtitle">
              {t('comingSoon.subtitle')}
            </p>

            <p className="coming-soon__description">
              {t('comingSoon.description')}
            </p>

            <div className="coming-soon__features">
              <div className="coming-soon__feature-card">
                <span className="coming-soon__feature-icon">🍡</span>
                <h3 className="coming-soon__feature-title">
                  {t('comingSoon.features.newFlavors.title')}
                </h3>
                <p className="coming-soon__feature-text">
                  {t('comingSoon.features.newFlavors.text')}
                </p>
              </div>

              <div className="coming-soon__feature-card">
                <span className="coming-soon__feature-icon">⭐</span>
                <h3 className="coming-soon__feature-title">
                  {t('comingSoon.features.rewards.title')}
                </h3>
                <p className="coming-soon__feature-text">
                  {t('comingSoon.features.rewards.text')}
                </p>
              </div>

              <div className="coming-soon__feature-card">
                <span className="coming-soon__feature-icon">📦</span>
                <h3 className="coming-soon__feature-title">
                  {t('comingSoon.features.tracking.title')}
                </h3>
                <p className="coming-soon__feature-text">
                  {t('comingSoon.features.tracking.text')}
                </p>
              </div>
            </div>

            <button 
              className="coming-soon__cta"
              onClick={() => window.location.href = '/dashboard'}
            >
              {t('comingSoon.backToCatalog')}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
