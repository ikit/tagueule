# tagueule

Tagueule est un générateur d'avatar reprenant le look d'un vieux générateur (2004) trouvé sur le site Koreus. Cette ancien générateur étant destiné à disparaitre car 100% Flash, j'ai eu envie de le refaire avec des technos récentes, tout en l'enrichissant et le modernisant.

 * [Version de 2004](https://www.koreus.com/files/200407/generateur_avatars.html)
 * [Nouvelle version](http://tagueule.io)

## Contribution
Ce projet est libre et open-source. Sous license [GPL 3.0](https://github.com/ikit/tagueule/blob/master/LICENSE).

Toutes participation est la bienvenue. En particulier les artistes en herbes qui souhaiteraient enrichir l'application avec de nouvelles formes ou fonctionnalités.

**Nous recherchons de l'aide pour:**
 * Refaire en svg les tracés (actuellement en png) des formes
 * Ajouter des ombres pour donner plus de relief et de vie au avatars
 * Contribuer à enrichir la bibliothèque en ajoutant de nouvelles formes
 * [Relever les bugs](https://github.com/ikit/tagueule/issues) et pourquoi aider à les corriger vous savez développer




## Installation
**Via le dockerfile**
```
cd ~/git/tagueule/app
docker build -t tagueuleImage .
docker run -it -p 8080:80 --rm --name tagueule-app tagueuleImage
```
L'application est désormais accessible à l'adresse `localhost:8080`


**Via NodeJS directement**
```
cd ~/git/tagueule/app
npm install
npm run dev
```
L'application est désormais accessible à l'adresse `localhost:8080`


## Fonctionnement du générateur


### Organisation des bibliothèques et collections
```
npm run build
```

### Composition des SVG
La création des formes en SVG doit rigouresement respecter certaines règles afin de bien s'intégrer dans le générateur

Les règles d'or:
 * Garder une structure simple, pas de groupe, etc
 * Nommer les éléments avec un ID selon le parte : `lvlXXX[-colYY][-ZZ]`
 * * `lvlXXX`: où XXX varie de 0 à 999 indique le niveau où sera dessinée la forme (le z-index si vous préférez). Il faut respecter les plages prédéfinies
 * * * 0 à 9: L'arrière plan (défaut: 5)
 * * * 10 à 19: Les cheveux long (défaut: 15)
 * * * 20 à 29: Le visage (défaut: 25)
 * * * 30 à 39: Les accessoires du visage (défaut: 35)
 * * * 40 à 49: La bouche (défaut: 45)
 * * * 50 à 59: Les accessoires de la bouche (défaut: 55)
 * * * 60 à 69: Les yeux (défaut: 65)
 * * * 70 à 79: Les accessoires des yeux (défaut: 75)
 * * * 80 à 89: Les cheveux (défaut: 85)
 * * * 90 à 99: Les accessoires des cheveux (défaut: 95)
 * * `colYY`: où YY varie de 0 à 99 indique la couleur qui sera utilisé pour remplir la forme.
 * * * 10 à 19: Couleurs du visage (peau: 10, barbe: 11, ...)
 * * * 20 à 29: Couleurs de la bouche (dent: 20, langue: 21, levres: 22, gencives: 23...)
 * * * 30 à 39: Couleurs des yeux (blanc de l'oeil: 30, pupille: 31, ...)
 * * * 40 à 49: Couleurs des cheveux
 * * * 50 à 59: Couleurs des cheveux longs

 



### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
