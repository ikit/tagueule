


## Composition des SVG
La création des formes en SVG doit rigouresement respecter certaines règles afin de bien s'intégrer dans le générateur

Les règles d'or:
 * Une image de 512x512 pixel (pas de scale)
 * Garder une structure simple, pas de groupe, etc
 * Nommer les éléments avec un ID selon le modèle suivant : `lvlXXX[-colYY][-ZZ]`
 * * `lvlXXX`: où XXX varie de 0 à 999 indique le niveau où sera dessinée la forme (le z-index si vous préférez). Afin de bien se comporter avec les autres assets, il faut respecter les plages prédéfinies
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
 * * * ...: A venir les plages de couleur pour les accessoires
 * * `ZZ`: peut être ce que vous voulez, ça permet de créer des id uniques pour des éléments qui sont tous au même niveau avec une même couleur (par exemple les yeux)

## Le conseil du pro
Même si la forme que vous faites concerne les cheveux, vous pouvez utiliser les levels et plage de couleurs d'autres éléments dans votre SVG, ça permettra de faire par exemple des cheveux qui passent aussi bien devant que derrière la tête, ou les yeux. 