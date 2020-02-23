<template>
  <div style="width: 256px; height: 256px; margin: 50px auto">
    <canvas id="canvas" width="256" height="256" style="border: 1px solid #000; margin: auto"></canvas>
  </div>
</template>

<script>
  import { fabric } from "fabric";
  let canvas = null;
  export default {
    name: 'AvatarGenerator',
    props: {
      data: {
          type: Array,
          default: () => ([]),
      },
    },
    data: () => ({
      
    }),
    mounted: function () {
      canvas = new fabric.Canvas('canvas');

      this.refreshCanvas() ;
    },
    methods: {  
      refreshCanvas() {
        // On clean tout
        for (const item of canvas.getObjects()) {
          canvas.remove(item);
        }

        // On récupère les layers à dessiner
        let layers = this.data.filter(e => e.shapes[e.selectedIndex] !== null) ;
        
        layers = layers.map(e => ({ 
          path: `${e.path}${e.shapes[e.selectedIndex]}.png`, 
          lvl: e.layersLevels[0]}));

        // On ordonne les layers pour les dessiner dans l'ordre
        layers = layers.sort((a, b) => { return a.lvl - b.lvl})

        // On dessine dans le canvas
        // TODO: En premier les couleurs
        // En second les contours
        for (const layer of layers) {
          fabric.Image.fromURL(layer.path, function(oImg) {
            // scale image down, and flip it, before adding it onto canvas
            oImg.scale(0.5); // img source are 512x512 and canvas 256x256
            canvas.add(oImg);
          });
        }
      },
    }
  }
</script>
