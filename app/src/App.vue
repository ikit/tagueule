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
        <AvatarGenerator ref="avatar" :data="shapes"/>
        
      <div style="text-align: center">
        <v-btn @click="prevShape()">
          &lt;
        </v-btn>

        <v-btn @click="nextShape()">
          &gt;
        </v-btn>
      </div>

        <v-footer absolute style=" height: 200px; padding: 0">
          <v-tabs 
            centered
            v-model="currentTab"
            @change="updateShapeCollection"
            style="margin: 0; padding: 0">
              <v-tab 
                v-for="s in shapes" 
                :key="s.tabName">{{s.tabName}}</v-tab>
          </v-tabs>
          <div class="shapesList">
            <!-- liste d'image en fonction de l'onglet sélectionné -->
            <img 
              v-for="(i, idx) in shapes[currentTab].shapes" 
              :key="idx" 
              @click="selectShape(idx)"
              :src="`${shapes[currentTab].path}${i}.png`"/>
          </div>
        </v-footer>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import AvatarGenerator from './components/AvatarGenerator';
import ColorPalette from "./model/ColorPalette";
import Avatar from "./model/Avatar";
import ShapeBrowser from "./model/ShapeBrowser";
import ShapeType from "./model/ShapeType";

export default {
  name: 'App',

  components: {
    AvatarGenerator,
  },

  data: () => ({
    currentTab: 0,
    currentImgs: [],
    colorPalette: new ColorsPalette(),
    avatar: new Avatar(),
    shapeBrowser: new ShapeBrowser(),
  }),
  mounted: function() {
    this.updateShapeCollection();

    console.log("colorPalette", this.colorPalette);
    console.log("avatar", this.avatar);
    console.log("shapeBrowser", this.shapeBrowser);
  },
  methods: {
    updateShapeCollection () {
      console.log("updateShapeCollection", this.currentTab);
      this.currentImgs = this.shapes[this.currentTab].shapes;
    },
    selectShape(idx) {
      console.log("select ", this.currentTab, idx);
      this.shapes[this.currentTab].selectedIndex = idx;
      this.$refs.avatar.refreshCanvas();
    },
      prevShape() {
        if (this.shapes[this.currentTab].shapes.length > 1) {
          this.shapes[this.currentTab].selectedIndex--;
          this.shapes[this.currentTab].selectedIndex %= this.shapes[this.currentTab].shapes.length;
          if (this.shapes[this.currentTab].selectedIndex < 0) {
            this.shapes[this.currentTab].selectedIndex = this.shapes[this.currentTab].shapes.length - 1;
          }
          this.$refs.avatar.refreshCanvas();
        }
      },
      nextShape() {
        if (this.shapes[this.currentTab].shapes.length > 1) {
          this.shapes[this.currentTab].selectedIndex++;
          this.shapes[this.currentTab].selectedIndex %= this.shapes[this.currentTab].shapes.length;
          this.$refs.avatar.refreshCanvas();
        }
      }
  }
};
</script>

<style>



.shapesList {
  overflow: auto;
  white-space: nowrap;
  height: 150px;
  background: #f5f5f5;
  padding: 25px 5px 0 5px;


}

.shapesList img {
    height: 100px;
    display: inline-block;
    margin-right: 10px; 
    border: 1px solid #bbb;
  }
</style>