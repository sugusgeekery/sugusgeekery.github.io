<template>
  <div class="body">
    <Header></Header>
    <div class="container">
      <div class="wrapper">
        <div class="aside">
          <Navigation></Navigation>
        </div>
        <div class="section">
          <router-view />
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

@Component({
  name: "OrderView",
  components: {
    Header,
    Navigation
  }
})
export default class OrderView extends Vue {}
</script>
