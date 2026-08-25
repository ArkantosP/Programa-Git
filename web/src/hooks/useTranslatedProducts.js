import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useProductStore } from '../store/productStore';
import { translateProduct, translateProducts } from '../utils/translateProduct';

/**
 * Custom hook that returns translated products
 */
export const useTranslatedProducts = () => {
  const { i18n } = useTranslation();
  const products = useProductStore((state) => state.products);
  const filteredProducts = useProductStore((state) => state.filteredProducts);
  
  const translatedProducts = useMemo(() => {
    return translateProducts(products);
  }, [products, i18n.language]);

  const translatedFilteredProducts = useMemo(() => {
    return translateProducts(filteredProducts);
  }, [filteredProducts, i18n.language]);

  return {
    products: translatedProducts,
    filteredProducts: translatedFilteredProducts
  };
};

/**
 * Custom hook that returns a single translated product by ID
 */
export const useTranslatedProduct = (productId) => {
  const { i18n } = useTranslation();
  const getProductById = useProductStore((state) => state.getProductById);
  
  const translatedProduct = useMemo(() => {
    const product = getProductById(productId);
    return translateProduct(product);
  }, [productId, getProductById, i18n.language]);

  return translatedProduct;
};

/**
 * Custom hook that returns the translated featured product
 */
export const useTranslatedFeaturedProduct = () => {
  const { i18n } = useTranslation();
  const getFeaturedProduct = useProductStore((state) => state.getFeaturedProduct);
  
  const translatedFeaturedProduct = useMemo(() => {
    const product = getFeaturedProduct();
    return translateProduct(product);
  }, [getFeaturedProduct, i18n.language]);

  return translatedFeaturedProduct;
};
