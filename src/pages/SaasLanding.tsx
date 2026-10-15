import { Link } from 'react-router-dom';
import { Zap, BarChart3, Users, Smartphone, Lock, Headphones } from 'lucide-react';

export default function SaasLanding() {
  const features = [
    {
      icon: Zap,
      title: 'Rapide',
      description: 'Lancez votre boutique en minutes, pas en mois'
    },
    {
      icon: BarChart3,
      title: 'Analytiques',
      description: 'Suivi détaillé de vos ventes et statistiques en temps réel'
    },
    {
      icon: Users,
      title: 'Multi-utilisateurs',
      description: 'Gérez votre équipe directement depuis la plateforme'
    },
    {
      icon: Smartphone,
      title: 'Mobile-first',
      description: 'Entièrement optimisé pour tous les appareils'
    },
    {
      icon: Lock,
      title: 'Sécurisé',
      description: 'Vos données protégées avec les meilleures normes'
    },
    {
      icon: Headphones,
      title: 'Support 24/7',
      description: 'Équipe dédiée pour vous aider à tout moment'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E8B57]/10 to-[#F4B400]/10 pt-20">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-[1280px] mx-auto text-center">
          <h1 className="font-playfair font-bold text-5xl sm:text-6xl lg:text-7xl text-[#1A1A1A] dark:text-[#F8F6F0] mb-6">
            Plateforme SaaS
            <br />
            <span className="text-[#2E8B57]">UM Jus Naturels</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Créez et gérez votre boutique en ligne de produits naturels. 
            Tout ce dont vous avez besoin pour réussir.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/saas/pricing"
              className="px-8 py-4 bg-[#2E8B57] text-white font-bold rounded-full hover:bg-[#1B5E3A] transition-all text-lg"
            >
              Voir les plans
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 border-2 border-[#2E8B57] text-[#2E8B57] font-bold rounded-full hover:bg-[#2E8B57]/10 transition-all text-lg"
            >
              Se connecter
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[
              { number: '37+', label: 'Produits' },
              { number: '100%', label: 'Responsive' },
              { number: '24/7', label: 'Support' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-[#1B4332] rounded-xl p-6 shadow">
                <p className="text-4xl font-bold text-[#2E8B57] mb-2">{stat.number}</p>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-[#0F0F0F]">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-[#1A1A1A] dark:text-[#F8F6F0] text-center mb-16">
            Pourquoi choisir UM Jus?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-8 bg-gradient-to-br from-[#2E8B57]/5 to-[#F4B400]/5 rounded-2xl border border-[#2E8B57]/20 hover:shadow-lg transition-all"
                >
                  <div className="w-16 h-16 bg-[#2E8B57]/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-[#2E8B57]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-[#F8F6F0] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-[#1A1A1A] dark:text-[#F8F6F0] text-center mb-12">
            Votre dashboard personnel
          </h2>

          <div className="bg-gradient-to-br from-[#2E8B57] to-[#1B5E3A] rounded-2xl p-8 sm:p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">📊 Analytiques en temps réel</h3>
                <ul className="space-y-3 text-[#F8F6F0]/90">
                  <li>✓ Suivi des ventes par jour/mois</li>
                  <li>✓ Statistiques des clients</li>
                  <li>✓ Performance des produits</li>
                  <li>✓ Taux de conversion</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">🛍️ Gestion simplifiée</h3>
                <ul className="space-y-3 text-[#F8F6F0]/90">
                  <li>✓ Ajouter/modifier produits en 1 clic</li>
                  <li>✓ Gérer inventaire</li>
                  <li>✓ Traiter commandes rapidement</li>
                  <li>✓ Générer rapports automatiques</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 dark:bg-[#0F0F0F]">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-[#1A1A1A] dark:text-[#F8F6F0] mb-4">
            Plans simples et transparents
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Aucun frais cachés. Changez de plan à tout moment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Starter', price: 'GRATUIT', users: '1', products: '20' },
              { name: 'Professionnel', price: '25,000', users: '5', products: 'Illimité', highlight: true },
              { name: 'Entreprise', price: '75,000', users: 'Illimité', products: 'Illimité' },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-6 transition-all ${
                  plan.highlight
                    ? 'bg-[#2E8B57] text-white shadow-2xl scale-105'
                    : 'bg-white dark:bg-[#1B4332]'
                }`}
              >
                <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? '' : 'text-[#1A1A1A] dark:text-[#F8F6F0]'}`}>
                  {plan.name}
                </h3>
                <p className={`text-3xl font-bold mb-6 ${plan.highlight ? '' : 'text-[#2E8B57]'}`}>
                  {plan.price}
                  <span className={`text-sm ${plan.highlight ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
                    {' '}/mois
                  </span>
                </p>
                <div className={`space-y-2 text-sm ${plan.highlight ? '' : 'text-gray-600 dark:text-gray-400'}`}>
                  <p>👥 {plan.users} utilisateurs</p>
                  <p>📦 {plan.products} produits</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/saas/pricing"
            className="mt-12 inline-block px-8 py-4 bg-[#2E8B57] text-white font-bold rounded-full hover:bg-[#1B5E3A] transition-all text-lg"
          >
            Voir tous les plans
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-[1280px] mx-auto bg-gradient-to-r from-[#2E8B57] to-[#F4B400] rounded-2xl p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Prêt à lancer votre boutique?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Rejoignez les entrepreneurs camerounais qui vendent leurs produits naturels en ligne.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/saas/pricing"
              className="px-8 py-4 bg-white text-[#2E8B57] font-bold rounded-full hover:bg-[#F8F6F0] transition-all text-lg"
            >
              Commencer gratuitement
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/20 transition-all text-lg"
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
