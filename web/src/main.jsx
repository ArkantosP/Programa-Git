import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import Dashboard from './pages/dashboard.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import ComingSoon from './pages/ComingSoon.jsx';

const currentPath = window.location.pathname.toLowerCase()
const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
const hasSessionUser = Boolean(localStorage.getItem('sessionUser'))

const protectedPath = (currentPath === '/dashboard' || currentPath.startsWith('/product/') || currentPath === '/cart' || currentPath === '/coming-soon') && (!isAuthenticated || !hasSessionUser)
const resolvedPath = protectedPath ? '/login' : currentPath

if (protectedPath) {
  window.history.replaceState({}, '', '/login')
}

const pageByPath = {
  '/': <Login />,
  '/login': <Login />,
  '/dashboard': <Dashboard />,
  '/register': <Register />,
  '/cart': <Cart />,
  '/coming-soon': <ComingSoon />,
}

let currentPage = pageByPath[resolvedPath]
if (!currentPage && resolvedPath.startsWith('/product/')) {
  currentPage = <ProductDetail />
}
currentPage = currentPage || <Login />

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {currentPage}
  </StrictMode>
)
