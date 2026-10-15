import { useState, useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const from = (location.state as any)?.from?.pathname || '/seller-dashboard';

  useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);

  if (user) {
    return <Navigate to="/seller-dashboard" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('Veuillez renseigner tous les champs.');
      return;
    }

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setFormError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-[#2E8B57]/10 to-[#F4B400]/10">
      <div className="w-full max-w-md rounded-[2rem] bg-white/95 p-10 shadow-2xl backdrop-blur-xl dark:bg-[#0F172A]/90">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Connexion SaaS</h1>
        <p className="text-sm text-gray-600 mb-8">Accédez à votre espace vendeur et gérez votre boutique.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="votre@email.com"
              className="w-full rounded-3xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2E8B57] focus:ring-2 focus:ring-[#2E8B57]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full rounded-3xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2E8B57] focus:ring-2 focus:ring-[#2E8B57]/20"
            />
          </div>

          {formError && <p className="text-sm text-red-600">{formError}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#2E8B57] px-6 py-3 text-white text-sm font-semibold transition hover:bg-[#1B5E3A] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <Link to="/signup" className="font-semibold text-[#2E8B57] hover:underline">
            Créez un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
