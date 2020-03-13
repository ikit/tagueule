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
          shapePath: `${e.path}${e.shapes[e.selectedIndex]}.png`, 
          backPath: e.objects[e.selectedIndex] ? `${e.path}${e.objects[e.selectedIndex]}.svg` : null, 
          lvl: e.layersLevels[0]}));

        // On ordonne les layers pour les dessiner dans l'ordre
        layers = layers.sort((a, b) => { return a.lvl - b.lvl})

        // On dessine dans le canvas
        const scale = 1/2;

        for (const layer of layers) {
          // En premier la couleur de fond
          if (layer.backPath) {
            fabric.loadSVGFromURL(layer.backPath, 
              function(objs) {
                // scale image down, and flip it, before adding it onto canvas
                // const grp = fabric.util.groupSVGElements(objs, opts);
                for (const o of objs) {
                  o.scale(0.5);
                  o.set({left: o.left * scale, top: o.top * scale, fill: "blue"})
                  canvas.add(o);
                  console.log("ADD SVG", o)
                }
                //canvas.add(grp);
                //objs.scaleToHeight(100);
              }
            );
          }
          // Par dessus les contours
          if (layer.shapePath) {
            fabric.Image.fromURL(layer.shapePath, function(oImg) {
              // scale image down, and flip it, before adding it onto canvas
              oImg.scale(scale); // img source are 512x512 and canvas 256x256
              canvas.add(oImg);
            });
          }
        }
      },
    }
  }
</script>
