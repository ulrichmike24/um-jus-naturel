import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, signup, loading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [plan, setPlan] = useState(searchParams.get('plan') || 'starter');
  const [formError, setFormError] = useState('');

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

    if (!name || !email || !password) {
      setFormError('Veuillez renseigner tous les champs.');
      return;
    }

    try {
      await signup(email, password, name, plan);
      navigate('/seller-dashboard', { replace: true });
    } catch (err) {
      setFormError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-[#2E8B57]/10 to-[#F4B400]/10">
      <div className="w-full max-w-lg rounded-[2rem] bg-white/95 p-10 shadow-2xl backdrop-blur-xl dark:bg-[#0F172A]/90">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Création de compte SaaS</h1>
        <p className="text-sm text-gray-600 mb-8">Inscrivez-vous pour gérer votre boutique et choisir un plan.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Votre nom"
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 bg-white/95 dark:bg-[#0F172A]/80 px-4 py-3 text-sm text-[#1A1A1A] dark:text-[#F8F6F0] placeholder-gray-500 dark:placeholder-gray-400 placeholder-opacity-100 outline-none transition focus:border-[#2E8B57] focus:ring-2 focus:ring-[#2E8B57]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="votre@email.com"
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 bg-white/95 dark:bg-[#0F172A]/80 px-4 py-3 text-sm text-[#1A1A1A] dark:text-[#F8F6F0] placeholder-gray-500 dark:placeholder-gray-400 placeholder-opacity-100 outline-none transition focus:border-[#2E8B57] focus:ring-2 focus:ring-[#2E8B57]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 bg-white/95 dark:bg-[#0F172A]/80 px-4 py-3 text-sm text-[#1A1A1A] dark:text-[#F8F6F0] placeholder-gray-500 dark:placeholder-gray-400 placeholder-opacity-100 outline-none transition focus:border-[#2E8B57] focus:ring-2 focus:ring-[#2E8B57]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Plan</label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 bg-white/95 dark:bg-[#0F172A]/80 px-4 py-3 text-sm text-[#1A1A1A] dark:text-[#F8F6F0] placeholder-gray-500 dark:placeholder-gray-400 outline-none transition focus:border-[#2E8B57] focus:ring-2 focus:ring-[#2E8B57]/20"
            >
              <option value="starter">Starter</option>
              <option value="professional">Professionnel</option>
              <option value="enterprise">Entreprise</option>
            </select>
          </div>

          {formError && <p className="text-sm text-red-600">{formError}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#2E8B57] px-6 py-3 text-white text-sm font-semibold transition hover:bg-[#1B5E3A] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Création en cours...' : 'Créer mon compte'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Vous avez déjà un compte ?{' '}
          <Link to="/login" className="font-semibold text-[#2E8B57] hover:underline">
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}
