<template>
  <v-app>
    <v-app-bar app color="primary">
      <span style="font-variant: small-caps;">{{ title }}</span>
      <v-spacer></v-spacer>
      <v-btn href="https://github.com/ikit/tagueule" target="_blank" text>
        <v-icon left >fab fa-github</v-icon>
        <span class="mr-2">Version {{ version }}</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <div>
        <v-card :width="scale*512 + 30" :height="scale*512 + 45 + 40" style="margin: 50px auto; position: relative">
          <AvatarGenerator 
            ref="avatarGenerator" 
            style="position: absolute; left: 15px; top: 15px; right: 15px; bottom: 70px;"
            :avatar="avatar" 
            :colorPalette="colorPalette"
            :scale="scale">
          </AvatarGenerator>

          <div style="position: absolute; left: 15px; bottom: 15px;">
            <!--
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon color="primary" v-on="on" @click="save">
                  <v-icon>fa-save</v-icon>
                </v-btn>
              </template>
              <span>Sauvegarder cet avatar dans l'historique</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon color="primary" v-on="on" @click="changeSize">
                  <v-icon>fas fa-expand-alt</v-icon>
                </v-btn>
              </template>
              <span>Changer la taille de l'avatar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon color="primary" v-on="on" @click="getAvatarHashcode">
                  <v-icon>fa-hashtag</v-icon>
                </v-btn>
              </template>
              <span>Obtenir l'url de cet avatar</span>
            </v-tooltip>
            -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon color="primary" v-on="on" @click="saveAsPng">
                  <v-icon>fa-save</v-icon>
                </v-btn>
              </template>
              <span>Télécharger l'image de cet avatar</span>
            </v-tooltip>
          </div>
            
          <div style="position: absolute; right: 15px; bottom: 15px;">
            <!--
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon color="primary" v-on="on" @click="randomize">
                  <v-icon>fa-dice</v-icon>
                </v-btn>
              </template>
              <span>Générer aléatoirement</span>
            </v-tooltip>
            -->
          </div>
        </v-card>


        <ColorSelector 
          ref="colorSelector" 
          style="position: absolute; right: 10px; top: 50px; max-width:500px"
          :colorPalette="colorPalette" 
          v-on:colorsChanged="updateAvatar">
        </ColorSelector>
        
        <v-footer absolute style=" height: 200px; padding: 0">
          <ShapesBrowser 
            ref="browser" 
            :data="assetsCollection"
            v-on:selectionUpdated="updateAvatar()"></ShapesBrowser>
        </v-footer>

        <v-snackbar
          v-model="errDisplayed"
          bottom
          :timeout="6000"
        >
          {{ errMessage }}
          <v-btn text @click="errDisplayed = false">
            <v-icon>fa-times</v-icon>
          </v-btn>
        </v-snackbar>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { Base64 } from 'js-base64';
import AvatarGenerator from './components/AvatarGenerator';
import ShapesBrowser from './components/ShapesBrowser';
import ColorSelector from './components/ColorSelector';

import ColorPalette from "./model/ColorPalette";
import Avatar from "./model/Avatar";
import AssetsCollection from "./model/AssetsCollection";
import AssetType from "./model/AssetType";

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
    errDisplayed: false,
    errMessage: null,
    version: pjson.default.version,
    colorPalette: new ColorPalette(),
    avatar: new Avatar(),
    assetsCollection: new AssetsCollection(),
    scale: 0.5
  }),
  mounted: function() {
    // On récupère les paramètres de l'url si nécessaire
    const hash = window.location.pathname.substring(1);
    if (hash) {
      // On essaye d'annalyser le bousin
      try {
        let json = Base64.decode(hash);
        json = JSON.parse(json);
        this.colorPalette.updateFromJson(json.palette);
        this.assetsCollection.updateFromJson(json.assets);
      } catch {
        this.errMessage = "Impossible de récupérer les informations de l'avatar depuis l'url";
        this.errDisplayed = true;
      }
    }

    setTimeout( _ => this.updateAvatar());  
  },
  methods: {
    // Force les composants ihm à se mettre à jours à partir des infos du model
    updateAvatar() {
      this.avatar.setFromShapesCollection(this.assetsCollection);
      this.$refs.colorSelector.applyColors(this.colorPalette);
      this.$refs.avatarGenerator.resetAvatar();
    },

    // Change la taille de l'avatar
    // changeSize() {
    //   this.scale = this.scale == 1 ? 0.5 : 1;
    //   this.updateAvatar();
    // },

    // Sauvegarde 
    save() {
      console.log("TODO: getHashcode")
    },

    // Calcule le hashcode de l'avatar qui permet de reparamétrer directement l'éditeur pour obtenir l'avatar
    getAvatarHashcode() {
      console.log("getHashcode", this.avatar.shapes);
      const json = {

      }
      const hash = Base64.encodeURI(JSON.stringify(this.avatar.shapes));
      console.log(hash);
    },

    // Décode la signature et retourne l'avatar correspondant
    setAvatarFromHashcode(hashcode) {
      console.log("setFromHashcode", hashcode);
      console.log(this.avatar.shapes)
      const value = Base64.decode(hashcode);
      this.avatar.shapes = JSON.parse(value);

      console.log(this.avatar.shapes)
    },

    // Sauvegarde l'avatar actuel en tant qu'image png
    saveAsPng() {
      this.$refs.avatarGenerator.saveAsPng();
    },

    // Génére aléatoirement un avatar en modifiant seulement les formes
    randomize() {
      this.$emit('randomizeShapes');
    }
  }
};
</script>

<style>

</style>