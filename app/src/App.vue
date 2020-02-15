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
      <AvatarGenerator/>

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
    faces: 10,
    selectedFace: 1,
  }),
};
</script>
