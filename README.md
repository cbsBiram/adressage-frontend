## I- Installation


Assurez-vous que python et pip sont installés sur votre machine
Cloner le projet

```sh
 git clone https://github.com/cbsBiram/adressage-frontend.git
 cd adressage-frontend
```

Installer les dépendances

```sh
 npm install -g expo-cli # Installer expo
 npm install # Installer les dépendance
 npm start # you can also use: expo start pour démarrer l'application
```


## II- Les branches


### 1- Nouvelle branche

```sh
git checkout -b <Branch_Name>
git branch  # pour vérifier que l'on est bien placé sur la branche créée
```

### 2- Changement de branche

```sh
git checkout <Branch_Name>
```


## III- Versioning du code


### Pour récupérer les changements effectués sur la branche Master
```sh
git pull origin master
```

### Pour pusher les modifications locales
```sh
git add .
git commit -m "<Message>"
git push
```


## IV) Variables d'environnement


Configurer des variables d'environnements nous permet de pouvoir utiliser certaines variables en fonction de l'environnement de développement qui peut être en production ou en développement.
Ex: API Key, password etc.

### 1- Tout d'abord créer le fichier ".env" à la racine du projet, au même niveau que "package.json".

### 2- Ouvrir ce fichier et l'éditer comme suit: 

```sh
API_ADDRESS = "https://..." #Veuillez me contacter pour disposer de l'url du backend déployée en production.
```

### 3- Installer react-native-dotenv

```sh
npm i react-native-dotenv
```

### 4- Configurer le fichier babel.config.js pour qu'il ressemble à:

```sh
module.exports = function(api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo',
            'module:metro-react-native-babel-preset',
            'module:react-native-dotenv'
        ],
    };
};
```

### 5- Consulter le fichier ./app/services/httpServices.js pour voir comment utiliser la variable créée

## Lien utile pour les commandes git:

En apprendre plus [ici](https://gitexplorer.com/) 

---
