<template>
  <div>
    <v-card
        class="mx-auto"
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
            <v-btn 
              v-for="col in item.colors" :key="col.id" 
              fab 
              style="width: 30px; height: 30px;" 
              :color="col.color"
              @click="displayColorPicker(i, col.id)"
            >
            </v-btn>
        </div>
    </v-card>
    
    <v-card
        class="mx-auto"
        tile
        v-if="colorToPick" 
    >
      <v-color-picker 
        ref="colorPicker" 
        :swatches="currentSwatches" 
        show-swatches 
        hide-canvas 
        flat
        mode="hexa"
        :value="pickerValue"
        v-on:input="changeColor"
      >
      </v-color-picker>
      <v-btn @click="colorToPick = null">Terminé</v-btn>
    </v-card>
  </div>
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
          ],
          swatches: [
            // Skins
            ['#FFFFFF', '#CC9933'],
            ['#FFDCCC', '#996633'],
            ['#FFCC99', '#664422'],
            ['#F4A265', '#DBDBDB'],
            ['#DD925B', '#000000'],
          ]},
        { label: "Bouche", colors: [ 
          { id: "col20", color: "#fff", note: "Dents"},
          { id: "col21", color: "#f00", note: "Langue"},
          { id: "col22", color: "#f00", note: "Lèvres"},
          { id: "col23", color: "#f00", note: "Gencives"},
          // { id: "col24", color: "#ffdccc"},
          // { id: "col25", color: "#ffdccc"}
          ],
          swatches: [
            ['#FFFFFF', '#E66C6C', '#eBA085'],
            ['#E5E5E5', '#E94742', '#DF0304'],
            ['#D3C8AA', '#CD2D28', '#D9077B'],
            ['#C6AC66', '#97110C', '#F8A8E9'],
            ['#A49526', '#000000', '#6CD4f5'],
          ]},
        { label: "Yeux", colors: [ 
          { id: "col30", color: "#fff", note: "Blanc de l'oeil"},
          { id: "col31", color: "#996633", note: "Iris"},
          // { id: "col32", color: "#ffdccc", note: "Pupille"},
          // { id: "col33", color: "#ffdccc"},
          // { id: "col34", color: "#ffdccc"},
          // { id: "col35", color: "#ffdccc"}
          ],
          swatches: [
            ['#FFFFFF', '#9faf78', '#FF0000'],
            ['#c3c7d0', '#9c6541', '#00BBFF'],
            ['#7d8095', '#70371a', '#00CC88'],
            ['#4d7b90', '#462e2f', '#DDEE00'],
            ['#4a8ac1', '#ad794a', '#FF8800'],
          ]},
        { label: "Cheveux", colors: [ 
          { id: "col40", color: "#996633"},
          { id: "col41", color: "#f00"},
          // { id: "col42", color: "#ffdccc"},
          // { id: "col43", color: "#ffdccc"},
          // { id: "col44", color: "#ffdccc"},
          // { id: "col45", color: "#ffdccc"}
          ],
          swatches: [
            ['#FFFFFF', '#ffe790', '#fc6613'],
            ['#CECECE', '#e9c33b', '#6f0000'],
            ['#8D8D8D', '#e9a13b', '#239d55'],
            ['#494949', '#c27200', '#65bcdb'],
            ['#101010', '#7b4800', '#bc5aba'],
          ]},
        { label: "Cheveux longs", colors: [ 
          { id: "col50", color: "#996633"},
          { id: "col51", color: "#f00"},
          // { id: "col52", color: "#ffdccc"},
          // { id: "col53", color: "#ffdccc"},
          // { id: "col54", color: "#ffdccc"},
          // { id: "col55", color: "#ffdccc"}
          ],
          swatches: [
            ['#FFFFFF', '#ffe790', '#fc6613'],
            ['#CECECE', '#e9c33b', '#6f0000'],
            ['#8D8D8D', '#e9a13b', '#239d55'],
            ['#494949', '#c27200', '#65bcdb'],
            ['#101010', '#7b4800', '#bc5aba'],
          ]},
        { label: "Arrière plan", colors: [ 
          { id: "col00", color: null},
          // { id: "col01", color: "#ffdccc"},
          // { id: "col02", color: "#ffdccc"},
          // { id: "col03", color: "#ffdccc"},
          // { id: "col04", color: "#ffdccc"},
          // { id: "col05", color: "#ffdccc"}
          ],
          swatches: [
            ['#ffffff', '#CCCCCC', '#888888', '#000000'],
            ['#FF0000', '#ff5757', '#860000'],
            ['#00FF00', '#7aed7a', '#159f15'],
            ['#0000FF', '#4a9aff', '#004193'],
            ['#FFEE00', '#fff99f', '#ffaf00'],
          ]},


      ],
      currentSwatches: [],
      colorToPick: null, // la couleur de la palette en train d'être modifié via le colorPicker
      pickerValue: null, // le model de donnée du picker
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

      displayColorPicker(paletteIdx, colorId) {
        this.currentSwatches = this.palette[paletteIdx].swatches || [];
        this.colorToPick = this.palette[paletteIdx].colors.find(e => e.id === colorId);
        this.pickerValue = this.colorToPick.color;
      },

      // Change une couleur dans le sélecteur
      changeColor(value) {
        this.colorToPick.color = value;
        this.$emit('colorsChanged');
      },

      // Change aléatoirement toute les couleurs
      randomize(colorId, color) {
        for (const p of this.palette) {
          for (const c of p.colors) {
            c.color = this.colorPalette.getRandomColor();
          }
        }
        this.applyColors(this.colorPalette);
        this.$emit('colorsChanged');
      }
    }
  }
</script>
