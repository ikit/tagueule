import ColorPalette from "./ColorPalette";
import Shape from "./Shape";
import ShapeType from "./ShapeType";

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
    setFromShapesCollection(shapesCollection) {

        const newShapes = [];

        // On récupère les layers à dessiner
        for (const c of shapesCollection.shapes) {
            const sc = c.collections[c.selectedIndex];
            const shape = sc.elements[sc.selectedIndex];
            if (shape) {
                const newShape = new Shape(c.type, `/assets/${sc.path}/${shape}.svg`);
                newShapes.push(newShape);

                // On récupère la version précédente pour le type de shape afin de voir si c'est nécessaire de redessiner cette partie là
                const formerShape = this.shapes.find(e => e.type == newShape.type);
                if (formerShape && formerShape.path !== newShape.path) {
                    // Il faut redessiner cette partie là de l'avatar
                    // TODO : OPTI
                }
            }
        }

        this.shapes = newShapes;
        console.log("setFromShapesCollection", newShapes);
        
        // layers = layers.map(e => ({ 
        //   shapePath: `${e.path}${e.shapes[e.selectedIndex]}.png`, 
        //   backPath: e.objects[e.selectedIndex] ? `${e.path}${e.objects[e.selectedIndex]}.svg` : null, 
        //   lvl: e.layersLevels[0]}));

        // // On ordonne les layers pour les dessiner dans l'ordre
        // layers = layers.sort((a, b) => { return a.lvl - b.lvl})
    }
}