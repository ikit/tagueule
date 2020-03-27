<template>
  <div >
    <v-card :width="scale*512 + 30" :height="scale*512 + 45 + 40" style="margin: 50px auto; position:relative">
      <div style="position: absolute; top: 15px; left: 15px; right: 15px; bottom: 70px; border: 1px solid #aaa; background: url('/assets/workbackground.png') repeat"></div>
      <div style="position: absolute; top: 15px; left: 15px;">
        <canvas id="canvas" ref="canvas" width="512" height="512"></canvas>
      </div>
      <div style="position: absolute; right: 15px; bottom: 15px;">
        <v-btn icon color="primary">
          <v-icon>fa-copy</v-icon>
        </v-btn>
        <v-btn icon color="primary">
          <v-icon>fa-hashtag</v-icon>
        </v-btn>
        <v-btn icon color="primary" @click="saveAsPng">
          <v-icon>fa-save</v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>

</template>

<script>
  import { fabric } from "fabric";
  import { Avatar } from "../model/Avatar";
  import { ColorPalette } from "../model/ColorPalette";
  import * as FileSaver from "file-saver";


  let canvas = null;
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
      sizes: [{ scale:0.125, name: "64px" }, { scale:0.25, name: "128px" }, { scale:0.5, name: "256px" }, { scale:1, name: "512px" }],
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
                    lvl: Number.parseInt(tokens[0].substring(3)),
                    colorId: tokens.length > 1 ? tokens[1] : null,
                    color: "blue",
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
        // On réordonne les items correctement
        this.canvasItems = this.canvasItems.sort((a, b) => { return a.lvl - b.lvl})

        // On redessine tout
        for (const item of this.canvasItems) {
          item.object.scale(this.scale);
          item.object.set({left: item.object.left * this.scale, top: item.object.top * this.scale, fill: this.colorPalette.getColor(item.colorId)});
          canvas.add(item.object);
                  
        }
      },

      // Sauvegarde l'avatar actuel en tant qu'image png
      saveAsPng() {
        // const img = this.$refs.canvas.toDataURL('png');

        this.$refs.canvas.toBlob(function(blob) {
          FileSaver.saveAs(blob, "tagueule.png");
        });
      }
    }
  }
</script>
