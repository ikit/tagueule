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
        <AvatarGenerator ref="avatarGenerator" :avatar="avatar" :colorPalette="colorPalette"/>
        <ColorSelector ref="colorSelector" :colorPalette="colorPalette"/>
        
      <div style="text-align: center">
        <!-- <v-btn @click="prevShape()">
          &lt;
        </v-btn>

        <v-btn @click="nextShape()">
          &gt;
        </v-btn> -->
      </div>

        <v-footer absolute style=" height: 200px; padding: 0">
          <ShapesBrowser 
            ref="browser" 
            :data="shapesCollection"
            v-on:selectionUpdated="updateAvatar($event)"></ShapesBrowser>
        </v-footer>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import AvatarGenerator from './components/AvatarGenerator';
import ShapesBrowser from './components/ShapesBrowser';
import ColorSelector from './components/ColorSelector';

import ColorPalette from "./model/ColorPalette";
import Avatar from "./model/Avatar";
import ShapesCollection from "./model/ShapesCollection";
import ShapeType from "./model/ShapeType";

export default {
  name: 'App',

  components: {
    AvatarGenerator,
    ShapesBrowser,
    ColorSelector
  },

  data: () => ({
    colorPalette: new ColorPalette(),
    avatar: new Avatar(),
    shapesCollection: new ShapesCollection(),
  }),
  mounted: function() {
  },
  methods: {
    updateAvatar(event) {
      this.avatar.setFromShapesCollection(this.shapesCollection);
      this.$refs.colorSelector.applyColors(this.colorPalette);
      this.$refs.avatarGenerator.resetAvatar();

    }
  }
};
</script>

<style>

</style>