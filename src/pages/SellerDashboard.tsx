import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ShoppingCart, Users, DollarSign, Eye, Download } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function SellerDashboard() {
  const { user, logout } = useAuth();
  const orders = user?.orders ?? [];
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter((order) => order.status === 'Livré').length;
  const pendingOrders = orders.filter((order) => order.status === 'En attente').length;

  const chartData = [
    { month: 'Jan', sales: 4000, orders: 24 },
    { month: 'Feb', sales: 3000, orders: 21 },
    { month: 'Mar', sales: 2000, orders: 18 },
    { month: 'Apr', sales: 2780, orders: 39 },
    { month: 'May', sales: 1890, orders: 26 },
    { month: 'Jun', sales: 2390, orders: 34 },
  ];

  const productData = [
    { name: 'Juices (Jus)', value: 45, color: '#2E8B57' },
    { name: 'Teas (Thés)', value: 25, color: '#F4B400' },
    { name: 'Superfoods', value: 20, color: '#FF6B6B' },
    { name: 'Wellness', value: 10, color: '#4ECDC4' },
  ];

  const stats = [
    { label: 'Ventes totales', value: `${totalRevenue.toLocaleString()} FCFA`, icon: DollarSign, trend: totalRevenue > 0 ? '+12%' : '0%' },
    { label: 'Commandes', value: `${totalOrders}`, icon: ShoppingCart, trend: totalOrders > 0 ? '+8%' : '0%' },
    { label: 'En attente', value: `${pendingOrders}`, icon: Eye, trend: pendingOrders > 0 ? '+3%' : '0%' },
    { label: 'Livrées', value: `${deliveredOrders}`, icon: Users, trend: deliveredOrders > 0 ? '+15%' : '0%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-playfair font-bold text-4xl text-[#1A1A1A] dark:text-[#F8F6F0] mb-2">
              Tableau de bord vendeur
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Bienvenue, {user?.name || 'UM Jus Naturels'}</p>
          </div>
          {user && (
            <button onClick={logout} className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Se déconnecter</button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white dark:bg-[#1B4332] rounded-xl p-6 shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#2E8B57]/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#2E8B57]" />
                  </div>
                  <span className="text-sm font-bold text-green-600">{stat.trend}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-[#1A1A1A] dark:text-[#F8F6F0]">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1B4332] rounded-xl p-6 shadow">
            <h2 className="text-lg font-bold text-[#1A1A1A] dark:text-[#F8F6F0] mb-6">
              Ventes et commandes
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#2E8B57" strokeWidth={2} dot={{ fill: '#2E8B57' }} />
                <Line type="monotone" dataKey="orders" stroke="#F4B400" strokeWidth={2} dot={{ fill: '#F4B400' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white dark:bg-[#1B4332] rounded-xl p-6 shadow">
            <h2 className="text-lg font-bold text-[#1A1A1A] dark:text-[#F8F6F0] mb-6">
              Ventes par catégorie
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={productData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-[#1B4332] rounded-xl p-6 shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#1A1A1A] dark:text-[#F8F6F0]">
                Commandes récentes
              </h2>
              <button className="text-[#2E8B57] hover:underline text-sm font-medium">Voir tout</button>
            </div>

            <div className="space-y-4">
              {orders.length > 0 ? (
                orders.slice(0, 4).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <div>
                      <p className="font-bold text-[#1A1A1A] dark:text-[#F8F6F0]">{order.id}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#1A1A1A] dark:text-[#F8F6F0]">{order.total.toLocaleString()} FCFA</p>
                      <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Livré'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700'
                          : order.status === 'En cours'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-6 text-center text-gray-500 dark:text-gray-400">
                  Aucune commande pour le moment. Passez votre première commande pour la voir ici.
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-[#1B4332] rounded-xl p-6 shadow space-y-4">
            <h2 className="text-lg font-bold text-[#1A1A1A] dark:text-[#F8F6F0] mb-6">
              Actions rapides
            </h2>

            <button className="w-full px-4 py-3 bg-[#2E8B57] text-white rounded-lg hover:bg-[#1B5E3A] transition-colors font-medium">
              Ajouter un produit
            </button>

            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Télécharger rapport
            </button>

            <button className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 text-[#1A1A1A] dark:text-[#F8F6F0] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors font-medium">
              Paramètres
            </button>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Conseil du jour:</strong> Optimisez vos produits avec de meilleures descriptions et photos pour augmenter vos ventes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
