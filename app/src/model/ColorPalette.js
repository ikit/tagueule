import { AssetType } from "./AssetType";


const DEFAULT = {
    // Background
    col00: "#fff", col01: null, col02: null, col03: null, col04: null, col05: null, col06: null, col07: null, col08: null, col09: null,
    // Face
    col10: "#ffdccc", col11: null, col12: null, col13: null, col14: null, col15: null, col16: null, col17: null, col18: null, col19: null,
    // Mouth
    col20: "#fff", col21: null, col22: null, col23: null, col24: null, col25: null, col26: null, col27: null, col28: null, col29: null,
    // Eyes
    col30: "#fff", col31: null, col32: null, col33: null, col34: null, col35: null, col36: null, col37: null, col38: null, col39: null,
    // Hairs
    col40: "#996633", col41: null, col42: null, col43: null, col44: null, col45: null, col46: null, col47: null, col48: null, col49: null,
    // Long Hairs
    col50: "#996633", col51: null, col52: null, col53: null, col54: null, col55: null, col56: null, col57: null, col58: null, col59: null,
    // Accessories
    col60: "#fff", col61: null, col62: null, col63: null, col64: null, col65: null, col66: null, col67: null, col68: null, col69: null,
    col70: "#fff", col71: null, col72: null, col73: null, col74: null, col75: null, col76: null, col77: null, col78: null, col79: null,
    col80: "#fff", col81: null, col82: null, col83: null, col84: null, col85: null, col86: null, col87: null, col88: null, col89: null,
    col90: "#fff", col91: null, col92: null, col93: null, col94: null, col95: null, col96: null, col97: null, col98: null, col99: null,
}

/**
 * Décris les couleurs utilisés pour chaques parties d'un avatar
 */
export default class ColorPalette {
    colors = {}; // La table de mapping des couleurs id <=> colors

    constructor() {
        this.reset();
    }

    // Réinitialise la palette de couleurs en fonction des types de formes existant
    reset() {
        for (const t in AssetType) {
            // Pour chaque type de forme, au maximum 10 couleurs peuvent être réglées
            // null équivaut à pas de couleur c'est à dire transparent
            for (let idx = 0; idx < 10; idx++) {
                this.colors[`col${t*10 + idx}`] = DEFAULT[`col${t*10 + idx}`];
            }
        }
    }

    // Réinitialise la palette avec les couleurs de l'avatar fourni
    loadFromAvatar(avatar) {
        console.log("TODO loadFromAvatar", avatar);
    }

    // Récupère la couleur à partir de son id
    getColor(id) {
        return this.colors[id] || null;
    }

    // Met à jour la couleur indiqué
    setColor(id, color) {
        this.colors[id] = color;
    }

    // Génère une coulour aléatoirement
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}