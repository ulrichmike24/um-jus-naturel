import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SaasPricing() {

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 0,
      period: 'FCFA/mois',
      description: 'Parfait pour débuter',
      features: [
        '📦 Jusqu\'à 20 produits',
        '👥 1 utilisateur',
        '📊 Tableau de bord basique',
        '💬 Support par email',
        '🔒 Sécurité standard',
      ],
      notIncluded: [
        'API intégration',
        'Rapports avancés',
        'Support prioritaire',
      ],
      cta: 'Commencer',
      highlighted: false,
    },
    {
      id: 'professional',
      name: 'Professionnel',
      price: 25000,
      period: 'FCFA/mois',
      description: 'Pour les entreprises',
      features: [
        '📦 Produits illimités',
        '👥 Jusqu\'à 5 utilisateurs',
        '📊 Statistiques avancées',
        '💬 Support prioritaire 24/7',
        '🔒 SSL & Authentification',
        '🔄 Synchronisation multicanal',
        '📱 App mobile intégrée',
      ],
      notIncluded: [
        'API personnalisée',
        'Consulting dédié',
      ],
      cta: 'Essai gratuit 14j',
      highlighted: true,
    },
    {
      id: 'enterprise',
      name: 'Entreprise',
      price: 75000,
      period: 'FCFA/mois',
      description: 'Pour la croissance',
      features: [
        '📦 Produits illimités',
        '👥 Utilisateurs illimités',
        '📊 Rapports personnalisés',
        '💬 Support 24/7 dédié',
        '🔒 Sécurité avancée',
        '🔄 Synchronisation multi-plateforme',
        '📱 Applications mobiles',
        '⚙️ API personnalisée',
        '👨‍💼 Consulting inclus',
      ],
      notIncluded: [],
      cta: 'Contacter',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E8B57]/5 to-[#F4B400]/5 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-playfair font-bold text-4xl sm:text-5xl text-[#1A1A1A] dark:text-[#F8F6F0] mb-4">
            Plans SaaS UM Jus
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Choisissez le plan qui correspond à vos besoins et lancez votre boutique naturelle en ligne
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-white dark:bg-[#1B4332] shadow-2xl scale-105 border-2 border-[#2E8B57] relative'
                  : 'bg-white dark:bg-[#1B4332] shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2E8B57] text-white px-4 py-1 rounded-full text-sm font-bold">
                  POPULAIRE
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-[#F8F6F0] mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-[#2E8B57]">{plan.price.toLocaleString()}</span>
                    <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>
                  </div>
                  {plan.price === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Gratuit pour toujours</p>
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  to={`/signup?plan=${plan.id}`}
                  className={`block w-full py-3 rounded-full text-center font-semibold transition-all mb-8 ${
                    plan.highlighted
                      ? 'bg-[#2E8B57] text-white hover:bg-[#1B5E3A]'
                      : 'bg-gray-100 dark:bg-gray-800 text-[#2E8B57] hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {plan.cta}
                </Link>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  <h4 className="font-bold text-[#1A1A1A] dark:text-[#F8F6F0] text-sm uppercase tracking-wide">
                    Inclus
                  </h4>
                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#2E8B57] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Not Included */}
                {plan.notIncluded.length > 0 && (
                  <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-[#1A1A1A] dark:text-[#F8F6F0] text-sm uppercase tracking-wide mb-3">
                      Non inclus
                    </h4>
                    <div className="space-y-2">
                      {plan.notIncluded.map((feature, i) => (
                        <p key={i} className="text-sm text-gray-500 dark:text-gray-400">
                          • {feature}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-20 bg-white dark:bg-[#1B4332] rounded-2xl shadow-lg p-8 overflow-x-auto">
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-[#F8F6F0] mb-8">
            Comparaison complète
          </h2>

          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-bold text-[#1A1A1A] dark:text-[#F8F6F0]">Fonctionnalités</th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    className="text-center py-3 px-4 font-bold text-[#1A1A1A] dark:text-[#F8F6F0]"
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Nombre de produits', values: ['20', 'Illimité', 'Illimité'] },
                { label: 'Utilisateurs', values: ['1', '5', 'Illimité'] },
                { label: 'Espace stockage', values: ['1 GB', '100 GB', 'Illimité'] },
                { label: 'Certifications SSL', values: ['✓', '✓', '✓'] },
                { label: 'Support email', values: ['✓', '✓', '✓'] },
                { label: 'Support téléphone', values: ['✗', '✓', '✓'] },
                { label: 'Statistiques avancées', values: ['✗', '✓', '✓'] },
                { label: 'API intégration', values: ['✗', '✗', '✓'] },
              ].map((feature, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300 font-medium">
                    {feature.label}
                  </td>
                  {feature.values.map((value, j) => (
                    <td key={j} className="py-4 px-4 text-center text-sm text-gray-600 dark:text-gray-400">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-[#F8F6F0] mb-8 text-center">
            Questions fréquemment posées
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: 'Puis-je changer de plan?',
                a: 'Oui, vous pouvez changer de plan à tout moment. Les changements prennent effet immédiatement.',
              },
              {
                q: 'Y a-t-il une période de test?',
                a: 'Oui, le plan Professionnel offre 14 jours gratuits. Aucune carte de crédit requise.',
              },
              {
                q: 'Que se passe-t-il si je ne paie pas?',
                a: 'Votre boutique reste accessible mais les fonctionnalités premium sont désactivées.',
              },
              {
                q: 'Avez-vous des contrats annuels?',
                a: 'Oui! Gagnez 20% en choisissant la facturation annuelle.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-[#1B4332] rounded-xl p-6">
                <h4 className="font-bold text-[#1A1A1A] dark:text-[#F8F6F0] mb-2">{item.q}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
