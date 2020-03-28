
import Asset from "./Asset";

/**
 * Défini un avatar
 */
export default class Avatar {
    shapes = [];

    constructor() {
    }

    // Met à jour l'avatar à partir des informations 
    setFromShapesCollection(shapesCollection) {
        const newShapes = [];

        // On récupère les layers à dessiner
        for (const c of shapesCollection.shapes) {
            const sc = c.collections[c.selectedIndex];
            const shape = sc.elements[sc.selectedIndex];
            if (shape) {
                const newShape = new Asset(c.type, `/assets/${sc.path}/${shape}.svg`);
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
    }
}