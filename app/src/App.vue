<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <span class="d-flex appTitle">Ta gueule !</span>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <div>
        <AvatarGenerator ref="avatar" :data="avatar"/>
        
      <div style="text-align: center">
        <!-- <v-btn @click="prevShape()">
          &lt;
        </v-btn>

        <v-btn @click="nextShape()">
          &gt;
        </v-btn> -->
      </div>

        <v-footer absolute style=" height: 200px; padding: 0">
          <ShapesBrowser ref="browser" :data="shapesCollection"></ShapesBrowser>
        </v-footer>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import AvatarGenerator from './components/AvatarGenerator';
import ShapesBrowser from './components/ShapesBrowser';

import ColorPalette from "./model/ColorPalette";
import Avatar from "./model/Avatar";
import ShapesCollection from "./model/ShapesCollection";
import ShapeType from "./model/ShapeType";

export default {
  name: 'App',

  components: {
    AvatarGenerator,
    ShapesBrowser
  },

  data: () => ({
    colorPalette: new ColorPalette(),
    avatar: new Avatar(),
    shapesCollection: new ShapesCollection(),
  }),
  mounted: function() {
    // this.updateShapeCollection();

    console.log("colorPalette", this.colorPalette);
    console.log("avatar", this.avatar);
    console.log("shapesCollection", this.shapesCollection);
  },
  methods: {
    // selectShape(idx) {
    //   console.log("select ", this.currentTab, idx);
    //   this.shapes[this.currentTab].selectedIndex = idx;
    //   this.$refs.avatar.refreshCanvas();
    // },
    // prevShape() {
    //   if (this.shapes[this.currentTab].shapes.length > 1) {
    //     this.shapes[this.currentTab].selectedIndex--;
    //     this.shapes[this.currentTab].selectedIndex %= this.shapes[this.currentTab].shapes.length;
    //     if (this.shapes[this.currentTab].selectedIndex < 0) {
    //       this.shapes[this.currentTab].selectedIndex = this.shapes[this.currentTab].shapes.length - 1;
    //     }
    //     this.$refs.avatar.refreshCanvas();
    //   }
    // },
    // nextShape() {
    //   if (this.shapes[this.currentTab].shapes.length > 1) {
    //     this.shapes[this.currentTab].selectedIndex++;
    //     this.shapes[this.currentTab].selectedIndex %= this.shapes[this.currentTab].shapes.length;
    //     this.$refs.avatar.refreshCanvas();
    //   }
    // }
  }
};
</script>

<style>

</style>