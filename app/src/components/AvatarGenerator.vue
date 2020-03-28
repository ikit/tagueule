<template>
  <div class="background">
    <canvas id="canvas" ref="canvas" class="canvas" width="256px" height="256px"></canvas>
  </div>
</template>

<script>
  import { fabric } from "fabric";
  import { Avatar } from "../model/Avatar";
  import { ColorPalette } from "../model/ColorPalette";
  import * as FileSaver from "file-saver";


  let canvas = null;
  let canvasDom = document.getElementsByTagName('canvas')[0];
  export default {
    name: 'AvatarGenerator',
    props: {
      avatar: {
          type: Avatar,
          default: () => (null),
      },
      scale: {
          type: Number,
          default: () => (0.5), // scale * 512px = 256px
      },
      colorPalette: {
          type: ColorPalette,
          default: () => (null),
      },
    },
    data: () => ({
      canvasItems: [] // La liste des objets (FabricJS) à dessiner dans l'ordre dans le canvas
    }),
    mounted: function () {
      canvas = new fabric.Canvas('canvas');
      this.resetAvatar() ;
    },
    methods: {
      // Charge l'ensemble des éléments composant l'avatar
      resetAvatar() {
        // On vide le cache
        this.canvasItems.length = 0;

        // On va récupérer tout les éléments à dessiner de chaque SVG afin de pouvoir les ordonner correctement et les redessiner dans le canvas
        for (const layer of this.avatar.shapes) {
          layer.ready = false;
          var that = this;
          fabric.loadSVGFromURL(layer.path, 
            function(objs) {
              // scale image down, and flip it, before adding it onto canvas
              // const grp = fabric.util.groupSVGElements(objs, opts);
              for (const o of objs) {
                if (o.id.startsWith("lvl")) {
                  // On extrait les infos lvl et colorId contenu dans l'id de l'objet svg
                  const tokens = o.id.split("-");
                  that.canvasItems.push({
                    asset: layer.path,
                    lvl: Number.parseInt(tokens[0].substring(3)),
                    colorId: tokens.length > 1 ? tokens[1] : null,
                    color: null,
                    object: o // On garde cet élément pour le dessiner plus tard quand tout les fichiers svg auront été parsés
                  })
                }
              }
              layer.ready = true;
              // On indique qu'on est pret à redessinner
              that.refreshCanvas();
            }
          );
        }
      },

      // Ne recharge que l'élément modifié
      refreshAvatar() {
        // TODO
      },

      // Redessine tous les items du canvas quand ceux-ci sont tous pret à être affiché
      refreshCanvas() {
        // Avant de redessiner, on vérifie que tous les items sont pret
        const notReady = this.avatar.shapes.filter(e => !e.ready) ;
        if (notReady.length > 0) {
          // Certains éléments sont encore en train d'être chargé, on attend
          return;
        }
        
        // On clean tout
        for (const item of canvas.getObjects()) {
          canvas.remove(item);
        }
        
        // On s'assure que le canvas est de la bonne taille
        // console.log(canvas, canvasDom);
        // this.$refs.canvas.width = this.scale * 512;
        // this.$refs.canvas.height = this.scale * 512;
        // this.$refs.canvas.style.width = `${this.scale * 512}px`;
        // this.$refs.canvas.style.height = `${this.scale * 512}px`;

        // On réordonne les items correctement
        this.canvasItems = this.canvasItems.sort((a, b) => { return a.lvl - b.lvl})

        // On redessine tout
        for (const item of this.canvasItems) {
          item.object.scale(this.scale);
          item.color = this.colorPalette.getColor(item.colorId);
          item.object.set({left: item.object.left * this.scale, top: item.object.top * this.scale, fill: item.color});
          canvas.add(item.object);
        }
      },

      // Sauvegarde l'avatar actuel en tant qu'image png
      saveAsPng() {
        this.$refs.canvas.toBlob(function(blob) {
          FileSaver.saveAs(blob, "tagueule.png");
        });
      },
    }
  }
</script>


<style scoped>
.background {
  border: 1px solid #aaa; 
  background: url('/assets/workbackground.png') repeat;
}
</style>