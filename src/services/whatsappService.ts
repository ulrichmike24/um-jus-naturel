// Service pour envoyer les commandes via WhatsApp
// Remplacez le numéro par votre numéro WhatsApp personnel

const OWNER_PHONE = '237659172101'; // Votre numéro WhatsApp

interface OrderData {
  name: string;
  phone: string;
  email: string;
  city: string;
  neighborhood: string;
  address: string;
  payment: string;
  orderNumber: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export const sendOrderToWhatsApp = (orderData: OrderData) => {
  // Formate le message avec les informations de commande
  const itemsText = orderData.items
    .map((item) => `- ${item.name} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()} FCFA`)
    .join('%0A');

  const message = `
🛒 *NOUVELLE COMMANDE* 🛒
%0A
📋 *Numéro de commande*: ${orderData.orderNumber}
%0A
👤 *Client*: ${orderData.name}
📞 *Téléphone*: ${orderData.phone}
📧 *Email*: ${orderData.email}
%0A
📍 *Adresse de livraison*:
${orderData.neighborhood}, ${orderData.address}
${orderData.city}
%0A
📦 *Articles commandés*:
${itemsText}
%0A
💰 *Détails du paiement*:
Sous-total: ${orderData.subtotal.toLocaleString()} FCFA
Livraison: ${orderData.deliveryFee.toLocaleString()} FCFA
*TOTAL*: ${orderData.total.toLocaleString()} FCFA
%0A
💳 *Méthode de paiement*: ${getPaymentMethodLabel(orderData.payment)}
%0A
⏰ *Date*: ${new Date().toLocaleString('fr-FR')}
  `.trim();

  // Crée le lien WhatsApp
  const whatsappUrl = `https://wa.me/${OWNER_PHONE}?text=${message}`;
  
  // Ouvre WhatsApp dans une nouvelle fenêtre
  window.open(whatsappUrl, '_blank');

  // Aussi envoyer via API si disponible (voir configuration backend)
  sendToBackend(orderData);
};

// Fonction helper pour afficher le label du mode de paiement
const getPaymentMethodLabel = (method: string): string => {
  const labels: Record<string, string> = {
    orangeMoney: 'Orange Money 🟠',
    mtnMoney: 'MTN Money 🟡',
    cod: 'Paiement à la livraison 💰',
  };
  return labels[method] || method;
};

// Envoyer les données au backend (optionnel - pour un suivi plus avancé)
const sendToBackend = async (orderData: OrderData) => {
  try {
    // Remplacez cette URL par votre API backend si vous en avez une
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      console.log('Commande enregistrée sur le serveur');
    }
  } catch (error) {
    console.log('Backend non disponible, WhatsApp utilisé comme principal');
  }
};
