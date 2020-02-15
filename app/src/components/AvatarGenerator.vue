<template>
  <div>
    <div style="width: 256px; height: 256px; margin: 50px auto">
      <canvas id="canvas" width="256" height="256" style="border: 1px solid #000; margin: auto"></canvas>
    </div>
    <div style="text-align: center">
      <v-btn @click="prevShape()">
        &lt;
      </v-btn>

      <v-btn @click="nextShape()">
        &gt;
      </v-btn>
    </div>
  </div>
</template>

<script>
  import { fabric } from "fabric";
  let canvas = null;
  export default {
    name: 'AvatarGenerator',
    data: () => ({
      currentSection: "face",
      faceShapes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      faceShapeIdx: 0
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

        // On redessine
        const item = this.faceShapes[this.faceShapeIdx].toString().padStart(2, '0');
        fabric.Image.fromURL(`/assets/faceshapes/${item}.png`, function(oImg) {
          // scale image down, and flip it, before adding it onto canvas
          oImg.scale(0.5);
          canvas.add(oImg);
        });
      },
      prevShape() {
        if (this.faceShapes.length > 1) {
          this.faceShapeIdx--;
          this.faceShapeIdx %= this.faceShapes.length;
          if (this.faceShapeIdx < 0) {
            this.faceShapeIdx = this.faceShapes.length - 1;
          }
          this.refreshCanvas() ;
        }
      },
      nextShape() {
        if (this.faceShapes.length > 1) {
          this.faceShapeIdx++;
          this.faceShapeIdx %= this.faceShapes.length;
          this.refreshCanvas() ;
        }
      }
    }
  }
</script>
