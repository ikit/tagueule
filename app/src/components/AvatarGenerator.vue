<template>
  <div style="width: 256px; height: 256px; margin: 50px auto">
    <canvas id="canvas" width="256" height="256" style="border: 1px solid #000; margin: auto"></canvas>
  </div>
</template>

<script>
  import { fabric } from "fabric";
  import { Avatar } from "../model/Avatar";


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
        console.log("ttata resetAvatar", this.avatar, this.scale)
        // On vide le cache
        this.canvasItems.length = 0;
        
        // let layers = this.avatar.shapes.map(e => ({ 
        //   shapePath: `${e.path}${e.shapes[e.selectedIndex]}.png`, 
        //   backPath: e.objects[e.selectedIndex] ? `${e.path}${e.objects[e.selectedIndex]}.svg` : null, 
        //   lvl: e.layersLevels[0]}));

        // // On ordonne les layers pour les dessiner dans l'ordre
        // layers = layers.sort((a, b) => { return a.lvl - b.lvl})

        // // On dessine dans le canvas
        // const scale = 1/2;


        // On va récupérer tout les éléments à dessiner de chaque SVG afin de pouvoir les ordonner correctement et les redessiner dans le canvas
        for (const layer of this.avatar.shapes) {
          layer.ready = false;
          var that = this;
          fabric.loadSVGFromURL(layer.path, 
            function(objs) {
              // scale image down, and flip it, before adding it onto canvas
              // const grp = fabric.util.groupSVGElements(objs, opts);
              for (const o of objs) {
                console.log(">>>", o.id);
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
              console.log(" - Ready", layer);
              // On indique qu'on est pret à redessinner
              that.refreshCanvas();
            }
          );
        }
      },
      // Ne recharge que l'élément modifié
      refreshAvatar() {



        
      },
      // Redessine tous les items du canvas quand ceux-ci sont tous pret à être affiché
      refreshCanvas() {

        // Avant de redessiner, on vérifie que tous les items sont pret
        const notReady = this.avatar.shapes.filter(e => !e.ready) ;
        if (notReady.length > 0) {
          // Certains éléments sont encore en train d'être chargé, on attend
          console.log("refreshCanvas NOT READY", notReady)
          return;
        }
          console.log("refreshCanvas READY", this.canvasItems)
        
        // On clean tout
        for (const item of canvas.getObjects()) {
          canvas.remove(item);
        }
        // On réordonne les items correctement
        this.canvasItems = this.canvasItems.sort((a, b) => { return a.lvl - b.lvl})

        // On redessine tout
        for (const item of this.canvasItems) {
console.log(item);

          item.object.scale(this.scale);
          item.object.set({left: item.object.left * this.scale, top: item.object.top * this.scale, fill: item.color});
          canvas.add(item.object);
                  
        }
      }
    }
  }
</script>
