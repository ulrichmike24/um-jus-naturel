# Configuration WhatsApp - Guide

## ✅ Intégration WhatsApp pour les Commandes

Votre site est maintenant configuré pour envoyer automatiquement les informations de commande à votre WhatsApp personnel.

## 🔧 Configuration

### 1. **Modifier votre numéro WhatsApp**

Ouvrez le fichier: `src/services/whatsappService.ts`

Ligne 4:
```typescript
const OWNER_PHONE = '237659172101'; // À remplacer par VOTRE numéro
```

**Important**: 
- Utilisez le format international sans le `+`
- Pour le Cameroun: `237` + le numéro sans le 0 initial
- Exemple: `+237659172101` → `237659172101`

### 2. **Comment ça marche**

Quand un client remplit le formulaire de commande et clique sur "Passer la commande":

1. ✅ Les informations du formulaire sont vérifiées
2. ✅ Un numéro de commande unique est généré (`UM-XXXXX`)
3. ✅ Un message formaté est créé avec:
   - Numéro de commande
   - Informations du client (nom, téléphone, email)
   - Adresse de livraison complète
   - Liste des articles commandés
   - Montants (sous-total, livraison, total)
   - Méthode de paiement choisie
   - Date/heure de la commande
4. ✅ WhatsApp s'ouvre automatiquement avec le message pré-rempli
5. ✅ Le panier est vidé et un message de confirmation s'affiche

### 3. **Format du Message**

Vous recevez les commandes au format:

```
🛒 NOUVELLE COMMANDE 🛒

📋 Numéro de commande: UM-ABC123
👤 Client: Jean Dupont
📞 Téléphone: +237699123456
📧 Email: jean@example.com

📍 Adresse de livraison:
Logpom, Villa 5
Yaoundé

📦 Articles commandés:
- Jus de Citron x2 = 4,000 FCFA
- Jus d'Orange x1 = 2,000 FCFA

💰 Détails du paiement:
Sous-total: 6,000 FCFA
Livraison: 2,000 FCFA
TOTAL: 8,000 FCFA

💳 Méthode de paiement: Paiement à la livraison 💰
⏰ Date: 02/06/2026 14:30:45
```

### 4. **Options Avancées**

#### Option A: Envoyer aussi les confirmations clients
Modifiez dans `src/services/whatsappService.ts` pour envoyer aussi à un numéro de confirmation client.

#### Option B: Sauvegarder les commandes en base de données
Pour enregistrer les commandes, créez une API backend (Node.js/Express):

```typescript
// Dans whatsappService.ts, décommentez et configurez:
const sendToBackend = async (orderData: OrderData) => {
  try {
    const response = await fetch('https://votre-api.com/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    // ...
  }
};
```

#### Option C: SMS et Email additionnels
Pour ajouter d'autres notifications, modifiez la fonction `sendOrderToWhatsApp()`.

### 5. **Dépannage**

**Problème**: WhatsApp ne s'ouvre pas
- ✓ Vérifiez que vous avez WhatsApp installé sur votre appareil
- ✓ Sur bureau: WhatsApp Web doit être ouvert (https://web.whatsapp.com)
- ✓ Vérifiez le numéro au format correct (code pays + numéro)

**Problème**: Les accents/caractères spéciaux ne passent pas
- ✓ C'est normal avec les URL, ils sont encodés
- ✓ WhatsApp les décode correctement à la réception

**Problème**: Le message est coupé
- ✓ WhatsApp a une limite de caractères
- ✓ Vous recevez le message complet avec tous les détails

### 6. **Personnalisation Avancée**

Vous pouvez modifier le template du message dans `src/services/whatsappService.ts`:

- Ajouter des emojis
- Changer la langue
- Ajouter des notes spéciales
- Inclure des liens

### 7. **Test**

1. Visitez: http://localhost:3000/checkout
2. Remplissez le formulaire de commande
3. Cliquez sur "Passer la commande"
4. WhatsApp s'ouvrira avec votre message pré-rempli
5. Vérifiez que tous les détails sont corrects
6. Cliquez sur "Envoyer" dans WhatsApp

## 🎯 Résumé

✅ Configuration complète et opérationnelle
✅ Recevoir les commandes directement sur WhatsApp
✅ Informations formatées et professionnelles
✅ Numéros de commande uniques
✅ Traçabilité complète

**Prêt à recevoir vos premières commandes!** 🚀
