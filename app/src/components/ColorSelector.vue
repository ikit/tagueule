<template>
    <v-card
        class="mx-auto"
        max-width="500"
        style="position: absolute; right: 10px; top: 50px;"
        tile
    >
        <div style="color: #aaa; padding: 10px 5px 20px 5px; position: relative">
          <v-icon style="vertical-align: middle">fa-palette</v-icon> Palette des couleurs
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon color="primary" v-on="on" @click="randomize" style="position: absolute; top: 5px; right: 10px">
                <v-icon>fa-dice</v-icon>
              </v-btn>
            </template>
            <span>Modifier aléatoirement les couleurs</span>
          </v-tooltip>
        </div>
        <div v-for="(item, i) in palette" :key="i" style="display: flex; margin-bottom: 5px; padding: 0 10px">
          <div style="width: 200px; line-height: 40px;">{{ item.label }}</div>
            <v-btn v-for="col in item.colors" :key="col.id" class="mx-2" fab small :color="col.color" @click="changeColor(col.id, col.color)"></v-btn>
        </div>
    </v-card>
</template>

<script>
  import { ColorPalette } from "../model/ColorPalette";


  let canvas = null;
  export default {
    name: 'ColorSelector',
    props: {
      colorPalette: {
          type: ColorPalette,
          default: () => (null),
      },
    },
    data: () => ({
      palette: [
        { label: "Visage", colors: [ 
          { id: "col10", color: "#ffdccc", note: "Peau"},
          { id: "col11", color: "#996633", note: "Barbe"},
          // { id: "col12", color: "#ffdccc"},
          // { id: "col13", color: "#ffdccc"},
          // { id: "col14", color: "#ffdccc"},
          // { id: "col15", color: "#ffdccc"}
        ]},
        { label: "Bouche", colors: [ 
          { id: "col20", color: "#fff", note: "Dents"},
          { id: "col21", color: "#f00", note: "Langue"},
          { id: "col22", color: "#f00", note: "Lèvres"},
          { id: "col23", color: "#f00", note: "Gencives"},
          // { id: "col24", color: "#ffdccc"},
          // { id: "col25", color: "#ffdccc"}
        ]},
        { label: "Yeux", colors: [ 
          { id: "col30", color: "#fff", note: "Blanc de l'oeil"},
          { id: "col31", color: "#996633", note: "Iris"},
          // { id: "col32", color: "#ffdccc", note: "Pupille"},
          // { id: "col33", color: "#ffdccc"},
          // { id: "col34", color: "#ffdccc"},
          // { id: "col35", color: "#ffdccc"}
        ]},
        { label: "Cheveux", colors: [ 
          { id: "col40", color: "#996633"},
          { id: "col41", color: "#f00"},
          // { id: "col42", color: "#ffdccc"},
          // { id: "col43", color: "#ffdccc"},
          // { id: "col44", color: "#ffdccc"},
          // { id: "col45", color: "#ffdccc"}
        ]},
        { label: "Cheveux longs", colors: [ 
          { id: "col50", color: "#996633"},
          { id: "col51", color: "#f00"},
          // { id: "col52", color: "#ffdccc"},
          // { id: "col53", color: "#ffdccc"},
          // { id: "col54", color: "#ffdccc"},
          // { id: "col55", color: "#ffdccc"}
        ]},
        { label: "Arrière plan", colors: [ 
          { id: "col00", color: null},
          // { id: "col01", color: "#ffdccc"},
          // { id: "col02", color: "#ffdccc"},
          // { id: "col03", color: "#ffdccc"},
          // { id: "col04", color: "#ffdccc"},
          // { id: "col05", color: "#ffdccc"}
        ]},


      ] // La liste des objets (FabricJS) à dessiner dans l'ordre dans le canvas
    }),
    mounted: function () {
    },
    methods: {
      // Met à jour une palette de couleur avec les couleurs sélectionnées dans le sélecteur
      applyColors(colorPalette) {
        for (const p of this.palette) {
          for (const c of p.colors) {
            colorPalette.setColor(c.id, c.color);
          }
        }
      },

      // Change une couleur dans le sélecteur
      changeColor(colorId, color) {
        console.log("TODO changeColor", colorId, color)
      },

      // Change aléatoirement toute les couleurs
      randomize(colorId, color) {
        for (const p of this.palette) {
          for (const c of p.colors) {
            c.color = this.colorPalette.getRandomColor();
          }
        }
        this.applyColors(this.colorPalette);
        this.$emit('colorsChanged')
      }
    }
  }
</script>
