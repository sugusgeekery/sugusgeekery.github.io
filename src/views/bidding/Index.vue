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
import { defineComponent } from "vue";

import Header from "@/views/components/Header.vue";
import Navigation from "@/views/components/Navigation.vue";
import BiddingHome from "./components/BiddingHome.vue";

export default defineComponent({
  name: "BiddingView",
  components: {
    Header,
    Navigation,
    BiddingHome
  },
  setup() {
    return {};
  }
});
</script>
