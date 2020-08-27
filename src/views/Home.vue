<template>
  <div
    v-if="!$store.state.loading"
    class="w-full flex justify-between overflow-x-hidden"
  >
    <div class="w-1/2 pr-2">
      <Item
        v-for="(item, i) in $store.state.listing.children"
        :key="'item-card-' + i"
        :data="item.data"
        :iter="i"
        :class="
          $store.state.target == item.data
            ? 'bg-yellow-100 hover:bg-yellow-100 border border-yellow-300'
            : ''
        "
      />
    </div>
    <Target />
  </div>
</template>

<script>
// @ is an alias to /src
import Item from "@/components/Item.vue";
import Target from "@/components/Target.vue";
export default {
  name: "Home",
  components: {
    Item,
    Target
  },
  watch: {
    "$route.params.pathMatch": {
      handler: function(n, o) {
        this.$store.dispatch(
          "getListing",
          this.$route.params.pathMatch || this.$store.state.defaultSub
        );
      }
    }
  },
  mounted() {
    this.$store.dispatch(
      "getListing",
      this.$route.params.pathMatch || this.$store.state.defaultSub
    );
    this.registerKeydownListeners();
  },
  beforeDestroy() {
    this.clearKeydownListeners();
  },
  methods: {
    registerKeydownListeners() {
      document.addEventListener("keydown", k => {
        if (k.key == "ArrowLeft") this.$store.dispatch("bumpTargetIndex", -1);
        if (k.key == "ArrowRight") this.$store.dispatch("bumpTargetIndex", 1);
      });
    },
    clearKeydownListeners() {
      document.removeEventListeners();
    }
  }
};
</script>
