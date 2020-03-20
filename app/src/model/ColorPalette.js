import { ShapeType } from "./ShapeType";

/**
 * Décris les couleurs utilisés pour chaques parties d'un avatar
 */
export default class ColorPalette {
    palette = {}

    constructor() {
        this.reset();
    }

    // Réinitialise la palette de couleurs en fonction des types de formes existant
    reset() {
        for (const t in ShapeType) {
            // Pour chaque type de forme, au maximum 3 couleurs peuvent être réglée
            // null équivaut à pas de couleur c'est à dire transparent
            this.palette[t] = [null, null, null];
        }
    }

    // Réinitialise la palette avec les couleurs de l'avatar fourni
    loadFromAvatar(avatar) {
        console.log("TODO", avatar);
    }
}