
export default class Shape {
    type = 0; // Le type de la forme (cf ShapeType)
    path = "/assets/faces/clean/01.svg"; // Le chemin où se situe le fichier correspondant à la forme
    colors = []; // Les couleurs définient pour colorier la forme

    constructor() {
        console.log("Shape constructor")
        //this.type = type;
    }
}