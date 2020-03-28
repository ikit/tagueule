
## Technologies
 * NodeJS v12
 * Vuejs
 * Vuetify
 * FabricJS
 * format SVG


### Organisation des bibliothèques et collections
Tous les assets sont stockés dans `/public/assets/{AssetType}/{collection}/XX.svg`.
Les assets sont les fichiers svg qui représentent les différentes composantes de l'avatar à dessiner.
Ces assets peuvent être de 9 types différents et chaque type va avoir son dossier dédié:
| Type | enum (`AssetType`) |
| ---  | ---  |
| Le décor | `background` |
| Le visage (barbe compris) | `face` |
| Les accessoires du visage (bouton, cicatrices, piercing) | `faceAccessory` |
| La bouche | `mouth` |
| Les accessoires de la bouche (masques) | `mouthAccessory` |
| Les yeux | `eye` |
| Les accessoires des yeux (lunettes)| `eyeAccessory` |
| Les cheveux (du haut du crane) | `hair` |
| Les cheveux longs (qui tombent derrière le visage) | `longHair` |
| Les accessoires pour les cheveux | `hairAccessory` |

Ensuite pour chaque type, on va regrouper ces fichiers dans des "collections à thème".
A minima, on a la collection `default` qui regroupe des formes de base. Mais il va y avoir des collections différentes en fonction d'un thème qu'aura voulu l'artiste qui a dessiné ces assets.

Par exemple pour les assets du visages, on va trouver la collection `beares` qui reprend les formes de bases en y mettant des barbes, et on pourrait imaginer créer des collections plus loufoques comme `fruits` qui permettrait de faire des visages en forme de fruit, ou `bugs` en forme insectoïdes comme dans le jeu Hollow Knight...

Enregistrer les images ne suffit pas, il faut aussi les "déclarer" dans le model `src/model/AssetsCollection.js` afin que l'application sache qu'elles existes.

## Fonctionnement du générateur

