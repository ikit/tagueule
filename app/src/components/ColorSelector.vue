<template>
        <v-card
            class="mx-auto"
            max-width="500"
            style="position: absolute; right: 10px; top: 50px;"
            tile
        >
            <p style="color: rgba(0, 0, 0, 0.6)">Palette des couleurs</p>
            <div v-for="(item, i) in colorPalette.palette" :key="i" style="display: flex; margin-bottom: 5px; padding: 0 10px">
              <div style="width: 200px; line-height: 40px;">{{ item.type }}</div>
                <v-btn v-for="(col, ic) in item.colors" :key="ic" class="mx-2" fab small> {{ col }}</v-btn>
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
      canvasItems: [] // La liste des objets (FabricJS) à dessiner dans l'ordre dans le canvas
    }),
    mounted: function () {
      console.log(this.colorPalette);
    },
    methods: {
      
    }
  }
</script>
