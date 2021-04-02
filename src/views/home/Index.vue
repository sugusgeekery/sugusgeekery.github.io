<template>
  <div class="body">
    <Header></Header>
    <div class="container">
      <div class="wrapper">
        <div class="aside">
          <Navigation></Navigation>
        </div>
        <div class="section">
          <Home></Home>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation } from "vuex-class";

import Header from "@/components/Header.vue";
import Navigation from "@/components/Navigation.vue";
import Home from "./components/Home.vue";

@Component({
  name: "HomeView",
  components: {
    Header,
    Navigation,
    Home
  }
})
export default class HomeView extends Vue {}
</script>
