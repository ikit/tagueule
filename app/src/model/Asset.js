export default class Asset {
    type = 0; // Le type de l'asset (cf AssetType)
    path = "/assets/faces/clean/01.svg"; // Le chemin où il se situe

    constructor(type, path) {
        this.type = type;
        this.path = path;
    }
}