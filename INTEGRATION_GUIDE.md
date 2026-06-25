# Guide d'intégration GENUC Backend

## 📚 Services API disponibles

### 1. Paiements (`paymentService.js`)

```javascript
import { usePayments } from './hooks/usePayments';

function PaiementsComponent() {
  const { initiatePayment, processPayment, getStatistics, isLoading } = usePayments();

  const handlePayment = async () => {
    try {
      const payment = await initiatePayment({
        studentId: 1,
        universiteId: 1,
        amountFc: 50000,
        transactionType: 'TUITION',
        paymentMethod: 'VODACOM_MPESA',
        description: 'Payment for Q1 2024'
      });
      console.log('Payment initiated:', payment);
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return <button onClick={handlePayment}>Pay</button>;
}
```

### 2. Taux de change (`exchangeRateService.js`)

```javascript
import { useExchangeRate } from './hooks/useExchangeRate';

function ExchangeComponent() {
  const { exchangeRate, getCurrentRate, convertFcToUsd } = useExchangeRate();

  useEffect(() => {
    getCurrentRate();
  }, [getCurrentRate]);

  const handleConvert = async () => {
    const result = await convertFcToUsd(50000);
    console.log('Result:', result);
  };

  return (
    <div>
      <p>Rate: {exchangeRate}</p>
      <button onClick={handleConvert}>Convert</button>
    </div>
  );
}
```

### 3. Rapports (`reportService.js`)

```javascript
import { useReports } from './hooks/useReports';

function ReportsComponent() {
  const { generateDailyReport, generateMonthlyReport, isLoading } = useReports();

  const handleGenerateReport = async () => {
    const report = await generateDailyReport(1, '2024-06-25', 1);
    console.log('Report:', report);
  };

  return <button onClick={handleGenerateReport}>Generate Report</button>;
}
```

### 4. Réconciliation (`reconciliationService.js`)

```javascript
import * as reconciliationService from './services/reconciliationService';

async function handleReconciliation() {
  const reconciliation = await reconciliationService.createReconciliation({
    universiteId: 1,
    bankStatementDate: '2024-06-25',
    totalExpected: 1000000,
    totalReceived: 980000
  });
}
```

### 5. Autorisation (`authorizationService.js`)

```javascript
import * as authService from './services/authorizationService';

// Vérifier une permission
const hasPermission = await authService.checkPermission(
  userId,
  'ACADEMIC:COURSE:CREATE'
);

// Obtenir les permissions d'un utilisateur
const permissions = await authService.getUserPermissions(userId);
```

## 📦 Stores Zustand disponibles

### Auth Store
```javascript
import useAuthStore from './stores/authStore';

const { user, token, isAuthenticated, login, logout } = useAuthStore();
```

### Payment Store
```javascript
import usePaymentStore from './stores/paymentStore';

const {
  transactions,
  currentTransaction,
  exchangeRate,
  statistics,
  setTransactions,
  updateTransaction
} = usePaymentStore();
```

### Report Store
```javascript
import useReportStore from './stores/reportStore';

const {
  reports,
  filters,
  setFilters,
  addReport
} = useReportStore();
```

## 🔌 Configuration de l'API

Le proxy est configuré dans `package.json`:
```json
"proxy": "http://localhost:8080"
```

L'URL de base par défaut: `http://localhost:8080/api/v1`

Pour changer, définir la variable d'environnement:
```bash
REACT_APP_API_URL=https://api.genuc.cd/api/v1
```

## 🔐 Authentification JWT

Le token est automatiquement ajouté à tous les requêtes:
```javascript
// Stocké dans localStorage sous 'authToken'
const token = localStorage.getItem('authToken');
```

## ✅ Checklist d'intégration

- [ ] Backend GENUC running (`npm start` dans GENUC-BACKEND)
- [ ] `npm install` pour installer les dépendances
- [ ] Importer les services dans tes composants
- [ ] Utiliser les hooks personnalisés (`usePayments`, `useExchangeRate`, `useReports`)
- [ ] Tester les appels API avec Postman/Thunder Client
- [ ] Configurer les variables d'environnement si besoin

## 📝 Exemples d'intégration

Voir les pages existantes pour des exemples:
- `src/pages/etudiant/EtudiantPaiements.jsx` → Utiliser `usePayments()`
- `src/pages/finances/` → Utiliser `useReports()` et `useExchangeRate()`
- `src/pages/admin/` → Utiliser `authorizationService`

## 🐛 Dépannage

**Erreur CORS?**
- Vérifier que le backend est sur `http://localhost:8080`
- Le proxy dans `package.json` devrait le gérer automatiquement

**Token expiré?**
- Implémenter la logique de refresh token
- Actuellement gère l'erreur 401 en redirigeant vers `/login`

**Appels API en erreur?**
- Vérifier les logs du backend
- Vérifier que les endpoints existent
- Utiliser Redux DevTools ou console pour déboguer

