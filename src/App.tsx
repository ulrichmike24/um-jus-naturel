import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CartProvider } from '@/contexts/CartContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ToastProvider } from '@/contexts/ToastContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import Products from '@/pages/Products';
import About from '@/pages/About';
import Vision from '@/pages/Vision';
import TestimonialsPage from '@/pages/TestimonialsPage';
import FAQPage from '@/pages/FAQPage';
import Contact from '@/pages/Contact';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import AdminDashboard from '@/pages/AdminDashboard';
import SellerDashboard from '@/pages/SellerDashboard';
import SaasPricing from '@/pages/SaasPricing';
import SaasLanding from '@/pages/SaasLanding';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import RequireAuth from '@/components/RequireAuth';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CartProvider>
          <ToastProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/boutique" element={<Shop />} />
                <Route path="/produits-naturels" element={<Products />} />
                <Route path="/a-propos" element={<About />} />
                <Route path="/vision" element={<Vision />} />
                <Route path="/temoignages" element={<TestimonialsPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/panier" element={<Cart />} />
                <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
                <Route path="/politique-confidentialite" element={<Privacy />} />
                <Route path="/conditions-utilisation" element={<Terms />} />
                <Route path="/saas" element={<SaasLanding />} />
                <Route path="/saas/pricing" element={<SaasPricing />} />
                <Route path="/seller-dashboard" element={<RequireAuth><SellerDashboard /></RequireAuth>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </ToastProvider>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
