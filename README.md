# Echo Memories

## 🧠 Qu'est-ce que c'est ?

**Echo Memories** est une application de mémorisation fondée sur le système de **répétition espacée**. Chaque carte possède un niveau, et plus on réussit à la mémoriser, plus l'intervalle de révision s’allonge :

- Niveau 1 → Revoir dans **1 jour**
- Niveau 2 → Revoir dans **3 jours**
- Niveau 3 → Revoir dans **7 jours**
- Niveau 4 → Revoir dans **15 jours**
- Niveau 5 → Revoir dans **30 jours**

➡️ Une fois le niveau 5 atteint et les 30 jours passés, on considère la carte comme **retenue**.

> ✅ **C’est aussi une Progressive Web App (PWA)** : elle fonctionne **hors ligne**, peut être **installée sur un téléphone**, et gère les **notifications**.

---

## 📄 Contenu de l'application

L'application contient **4 pages principales** :

### 1. Accueil
- Affiche des infos sur l’application
- Contient un bouton pour accéder à la page Catégories

### 2. Catégories
- Contient des **catégories originales**
- Chaque catégorie contient des **thèmes**
- Chaque thème contient des **cartes question / réponse**
- Possibilité de **créer des catégories** avec un titre et une couleur


### 3. Notifications
- Permet de :
  - Choisir une **heure de notification**
  - Lancer une **notification toutes les 5 minutes**
  - **Enregistrer ou stopper** les notifs
- En dessous : une section **"À réviser aujourd'hui"**, qui liste **uniquement les cartes à réviser le jour même**.

### 4. Calendrier
- Affiche **toutes les cartes programmées pour révision**
- Montre leur **niveau actuel** et la **date de prochaine révision**
- Lié au bouton **"Réussi ✅"** de la page carte

---

## ⚙️ Fonctionnement détaillé

### Page Catégories
- On peut créer une **catégorie**
- En cliquant, on arrive à une page contenant des **thèmes**
- On peut créer un **thème**
- En cliquant sur un thème, on arrive à une page contenant des **cartes Q/R**
- Sur chaque carte :
  - Un clic = afficher la réponse
  - 2 boutons :  
    - ✅ **"Réussi"** : augmente le niveau de la carte  
    - ❌ **"Échoué"** : remet le niveau à 0

### Page Notification
- Partie haute : permet de choisir une **heure de départ** pour des notifications régulières toutes les **5 minutes**
- Boutons pour **activer ou stopper**
- Partie basse : cartes à **réviser aujourd’hui uniquement**

### Page Calendrier
- Montre toutes les cartes à venir
- Affiche :
  - Question
  - Niveau
  - Prochaine date de révision

---

## 🚀 Comment installer le projet depuis GitHub

1. **Cloner le repo**
   ```bash
   git clone https://github.com/ton-compte/echo-memories.git
   cd echo-memories

2. **Installer les dépendances**
    ```bash
    npm install

3. **Créer un build de production**
    ```bash
    npm run build

4. **Lancer un serveur statique pour tester la PWA**
    ```bash
    npm install -g serve
    serve -s build

5. **Ouvrir l'application dans le navigateur**

- Accéder à : `http://localhost:3000`

6. **Tester le fonctionnement PWA**

- Ouvrir les **Outils de développement (F12)** dans le navigateur
- Aller dans l'onglet **Application**
- Vérifier :
    - ✅ Le fichier **Manifest** est présent
    - ✅ Le **Service Worker** est enregistré et actif
    - ✅ Cochez l’option **Hors ligne** et rechargez pour tester le mode hors ligne

---

## 🗂️ Organisation du projet

L'arborescence est claire :

```
📁 public/  
├─ images, service-worker.js, manifest... 
📁 src/     
├─ components/          → Navbar, Footer, Card, etc.
├─ pages/               → Chaque page principale 
├─ store/               → Données par défaut (questions, thèmes) 
├─ styles/              → Feuilles CSS organisées par page 
├─ App.tsx              → App principale 
├─ index.tsx / index.js → Entrée de l’app
```

---

## 🛠️ Technologies utilisées 

- **ReactJS**
- **Typescript**
- **HTML / CSS / Javascript**
- **PWA avec Service Worker & Manifest**

--- 

## 👨‍💻  Auteur

**Thomas Iafrate**