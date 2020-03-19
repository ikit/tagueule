/**
 * Décrit le type de la forme
 * Donne aussi une indication sur l'ordre (z-index) avec laquelle elle
 * sera dessinée
 * Le chemin où sont situés les svg correspondant à ces formes doit être: `/assets/${shapeType}/${shapeFamilly}/${shapeNumber}.svg`
 */
const ShapeType = {
    "background":0,
    "face":1,
    "faceAccessory":2,
    "mouth":3,
    "mouthAccessory":4,
    "eye":5,
    "eyeAccessory":6,
    "hair":7,
    "longHair":8,
    "hairAccessory":9,
};
Object.freeze(ShapeType);
