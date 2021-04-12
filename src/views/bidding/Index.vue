<template>
  <div class="body">
    <Header></Header>
    <div class="container">
      <div class="wrapper">
        <div class="aside">
          <Navigation></Navigation>
        </div>
        <div class="section">
          <BiddingHome></BiddingHome>
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
import BiddingHome from "./components/BiddingHome.vue";

@Component({
  name: "BiddingView",
  components: {
    Header,
    Navigation,
    BiddingHome
  }
})
export default class BiddingView extends Vue {}
</script>
