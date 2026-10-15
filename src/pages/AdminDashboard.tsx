import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Plus, Trash2, Edit2, BarChart3, Package, Users, TrendingUp } from 'lucide-react';
import { products as initialProducts } from '@/data/products';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [products] = useState(initialProducts);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [, setEditingId] = useState<string | null>(null);

  const ADMIN_PASSWORD = 'admin123';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Mot de passe incorrect');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20 bg-gradient-to-br from-[#2E8B57]/10 to-[#F4B400]/10">
        <div className="w-full max-w-md bg-white dark:bg-[#1B4332] rounded-2xl shadow-lg p-8">
          <h1 className="font-playfair font-bold text-3xl text-[#1A1A1A] dark:text-[#F8F6F0] mb-2 text-center">
            Admin Panel
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8">UM Jus Naturels - Gestion SaaS</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] dark:text-[#F8F6F0] mb-2">
                Mot de passe administrateur
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe"
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] dark:bg-[#1A1A1A] dark:text-[#F8F6F0]"
              />
              {loginError && (
                <p className="text-red-500 text-sm mt-2">{loginError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#2E8B57] text-white font-semibold rounded-full hover:bg-[#1B5E3A] transition-all"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-600 dark:text-blue-400">
              <strong>Demo:</strong> Mot de passe: <code>admin123</code>
            </p>
          </div>

          <Link to="/" className="block text-center mt-6 text-[#2E8B57] hover:underline text-sm">
            Retour au site
          </Link>
        </div>
      </div>
    );
  }

  // Dashboard Content
  const stats = [
    {
      label: 'Produits',
      value: products.length,
      icon: Package,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
    },
    {
      label: 'Ventes (ce mois)',
      value: '1,234',
      icon: TrendingUp,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600',
    },
    {
      label: 'Clients',
      value: '856',
      icon: Users,
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A]">
      {/* Header */}
      <header className="bg-white dark:bg-[#1B4332] shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="font-playfair font-bold text-2xl text-[#1A1A1A] dark:text-[#F8F6F0]">
            Admin - UM Jus Naturels
          </h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'dashboard'
                ? 'border-[#2E8B57] text-[#2E8B57]'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-[#2E8B57]'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline-block mr-2" />
            Tableau de bord
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'products'
                ? 'border-[#2E8B57] text-[#2E8B57]'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-[#2E8B57]'
            }`}
          >
            <Package className="w-4 h-4 inline-block mr-2" />
            Produits ({products.length})
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-[#F8F6F0]">Tableau de bord</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-white dark:bg-[#1B4332] rounded-xl p-6 shadow"
                  >
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-[#1A1A1A] dark:text-[#F8F6F0]">{stat.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-[#1B4332] rounded-xl p-6 shadow">
              <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-[#F8F6F0] mb-4">Activité récente</h3>
              <div className="space-y-4">
                {[
                  'Nouvelle commande #UM-ABC123',
                  'Produit "Spiruline Naturelle" ajouté',
                  '50 clients actifs ce mois-ci',
                  'Revenu total: 256,500 FCFA',
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-[#2E8B57] rounded-full" />
                    <p className="text-gray-600 dark:text-gray-400">{activity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-[#F8F6F0]">Gestion des produits</h2>
              <button
                onClick={() => setEditingId('new')}
                className="flex items-center gap-2 px-4 py-2 bg-[#2E8B57] text-white rounded-lg hover:bg-[#1B5E3A] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Ajouter
              </button>
            </div>

            {/* Products List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-[#1B4332] rounded-xl p-4 shadow hover:shadow-lg transition-shadow"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-bold text-[#1A1A1A] dark:text-[#F8F6F0] mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {product.price.toLocaleString()} FCFA
                  </p>
                  <p className="text-xs text-gray-400 mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors flex items-center justify-center gap-1">
                      <Edit2 className="w-3.5 h-3.5" />
                      Éditer
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center justify-center gap-1">
                      <Trash2 className="w-3.5 h-3.5" />
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
