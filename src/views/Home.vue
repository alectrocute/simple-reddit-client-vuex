<template>
  <div v-if="!$store.state.loading" class="w-full mt-2">
    <Item
      v-for="(item, i) in $store.state.listing.children"
      :key="'item-card-' + i"
      :data="item.data"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Item from "@/components/Item.vue";

export default {
  name: "Home",
  components: {
    Item
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
  }
};
</script>
