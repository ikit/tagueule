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
        <AvatarGenerator/>
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

export default {
  name: 'App',

  components: {
    AvatarGenerator,
  },

  data: () => ({
    currentTab: 0,
    currentImgs: [],
    shapes: [
      {
        tabName: "Visage",
        selectedIndex: 0,
        path: "/assets/faceshapes/",
        shapes: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
        shapeColor: {
          color1: "#fff0",
          color2: null,
          set: ["#fff0", "#fff", "#f00", "#0f0", "#00f"]
        },
        objects: [],
        objectColor: null,
        layersLevels: [0]
      },
      {
        tabName: "Yeux",
        selectedIndex: 0,
        path: "/assets/eyes/",
        shapes: ["01", "02"],
        shapeColor: {
          color1: "#fff0",
          color2: null,
          set: ["#fff0", "#fff", "#f00", "#0f0", "#00f"]
        },
        objects: [],
        objectColor: null,
        layersLevels: [50]
      },
      {
        tabName: "Nez",
        selectedIndex: 0,
        path: "/assets/noses/",
        shapes: ["01", "02", "03"],
        shapeColor: {
          color1: "#fff0",
          color2: null,
          set: ["#fff0", "#fff", "#f00", "#0f0", "#00f"]
        },
        objects: [],
        objectColor: null,
        layersLevels: [40]
      },
      {
        tabName: "Bouche",
        selectedIndex: 0,
        path: "/assets/mouthes/",
        shapes: ["01", "02", "03", "04"],
        shapeColor: {
          color1: "#fff0",
          color2: null,
          set: ["#fff0", "#fff", "#f00", "#0f0", "#00f"]
        },
        objects: [],
        objectColor: null,
        layersLevels: [20]
      },
      {
        tabName: "Oreilles",
        selectedIndex: 0,
        path: "/assets/mouthes/",
        shapes: ["01", "02", "03", "04"],
        shapeColor: {
          color1: "#fff0",
          color2: null,
          set: ["#fff0", "#fff", "#f00", "#0f0", "#00f"]
        },
        objects: [],
        objectColor: null,
        layersLevels: [20]
      },
      {
        tabName: "Barbe",
        selectedIndex: 0,
        path: "/assets/mouthes/",
        shapes: ["01", "02", "03", "04"],
        shapeColor: {
          color1: "#fff0",
          color2: null,
          set: ["#fff0", "#fff", "#f00", "#0f0", "#00f"]
        },
        objects: [],
        objectColor: null,
        layersLevels: [10, 30]
      },
      {
        tabName: "Cheveux",
        selectedIndex: 0,
        path: "/assets/mouthes/",
        shapes: ["01", "02", "03", "04"],
        shapeColor: {
          color1: "#fff0",
          color2: null,
          set: ["#fff0", "#fff", "#f00", "#0f0", "#00f"]
        },
        objects: [],
        objectColor: null,
        layersLevels: [70, 45]
      },
      {
        tabName: "Cheveux longs",
        selectedIndex: 0,
        path: "/assets/mouthes/",
        shapes: ["01", "02", "03", "04"],
        shapeColor: {
          color1: "#fff0",
          color2: null,
          set: ["#fff0", "#fff", "#f00", "#0f0", "#00f"]
        },
        objects: [],
        objectColor: null,
        layersLevels: [-20]
      },
      {
        tabName: "Arrière plan",
        selectedIndex: 0,
        path: "/assets/mouthes/",
        shapes: ["01", "02", "03", "04"],
        shapeColor: null,
        objects: [],
        objectColor: null,
        layersLevels: [-50]
      }
    ]
  }),
  mounted: function() {
    this.updateShapeCollection();
  },
  methods: {
    updateShapeCollection () {
      console.log("updateShapeCollection", this.currentTab);

      this.currentImgs = this.shapes[this.currentTab].shapes;
    },
    selectShape(idx) {
      console.log("select ", this.currentTab, idx);
      this.shapes[this.currentTab].selectedIndex = idx;

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