<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <span style="font-variant: small-caps;">{{ title }}</span>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/ikit/tagueule"
        target="_blank"
        text
      >
        <v-icon left >fab fa-github</v-icon>
        <span class="mr-2">Version {{ version }}</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <div>
        <AvatarGenerator ref="avatarGenerator" :avatar="avatar" :colorPalette="colorPalette"/>
        <ColorSelector ref="colorSelector" :colorPalette="colorPalette" v-on:colorsChanged="updateAvatar"/>
        
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

import * as pjson from "../package.json";

export default {
  name: 'App',

  components: {
    AvatarGenerator,
    ShapesBrowser,
    ColorSelector
  },

  data: () => ({
    title: pjson.default.name,
    version: pjson.default.version,
    colorPalette: new ColorPalette(),
    avatar: new Avatar(),
    shapesCollection: new ShapesCollection(),
    sizes: [
      { name: "en petit", scale: 0.25},
      { name: "en moyen", scale: 0.5},
      { name: "en gros", scale: 1},
    ]
  }),
  mounted: function() {
    // On récupère les paramètres de l'url
    console.log(window.location.search);
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