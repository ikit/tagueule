
export default class Shape {
    type = 0; // Le type de la forme (cf ShapeType)
    path = "/assets/faces/clean/01.svg"; // Le chemin où se situe le fichier d'où a été récupéré la forme
    color = "#fff"; // La couleur définie pour colorier la forme
    colorId = ""; // L'identifiant de couleur utilisé par la forme
    level = 0; // le z-index de la forme lors du dessin


    constructor(type, path) {
        this.type = type;
        this.path = path;
    }
}