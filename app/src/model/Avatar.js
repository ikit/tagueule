import { ColorPalette } from "./ColorPalette";
import { Shape } from "./Shape";
import { ShapeType } from "./ShapeType";

/**
 * Défini un avatar
 */
export default class Avatar {
    shapes = [];

    constructor() {
        this.reset();
    }

    // Réinitialise l'avatar avec tout les rélage de base
    reset() {
        this.shapes = [];
        for (const t in ShapeType) {
            // Pour chaque type de forme, au maximum 3 couleurs peuvent être réglée
            // null équivaut à pas de couleur c'est à dire transparent
            //this.shapes.push(new Shape());
        }
    }

    // Réinitialise l'avatar avec tout les rélages tirés au hasard
    random() {
        this.colorPalette = new ColorPalette();
        this.shapes = [];
        for (const t in ShapeType) {
            // Pour chaque type de forme, au maximum 3 couleurs peuvent être réglée
            // null équivaut à pas de couleur c'est à dire transparent
            //this.shapes.push(new Shape());
        }
    }

    // Calcule la signature correspondant à l'avatar
    getSignature() {
        return "TODO";
    }

    // Décode la signature et retourne l'avatar correspondant
    setFromSignature(avatar) {
        this.shapes = Array.from(avatar.shapes);
        this.random();
    } 

    // Met à jour l'avatar à partir des informations 
    setFromShapesBrowser(shapesBrowser) {
        console.log("setFromShapesBrowser", shapesBrowser);
    }
}