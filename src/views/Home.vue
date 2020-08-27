<template>
  <div
    v-if="!$store.state.loading"
    class="w-full flex justify-between overflow-x-hidden"
  >
    <div class="w-1/2 pr-4" id="item-container">
      <Item
        v-for="(item, i) in $store.state.listing.children"
        :key="'item-card-' + i"
        :id="'item-card-' + i"
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
        this.getListing();
      }
    }
  },
  mounted() {
    this.registerKeydownListeners();
    this.getListing();
  },
  beforeDestroy() {
    this.clearKeydownListeners();
  },
  methods: {
    getListing() {
      this.$Progress.start();
      this.$store
        .dispatch(
          "getListing",
          this.$route.params.pathMatch || this.$store.state.defaultSub
        )
        .then(() => {
          this.$Progress.finish();
        });
    },
    keydownListener(k) {
      if (k.key == "ArrowLeft") {
        this.$Progress.start();
        this.$store.dispatch("bumpTargetIndex", -1);
        try {
          document
            .getElementById("item-card-" + this.$store.state.targetId)
            .scrollIntoView({
              block: "nearest"
            });
        } catch (e) {
          return;
        }

        this.$Progress.finish();
      }

      if (k.key == "ArrowRight") {
        this.$Progress.start();
        this.$store.dispatch("bumpTargetIndex", 1);
        try {
          document
            .getElementById("item-card-" + this.$store.state.targetId)
            .scrollIntoView({
              block: "nearest"
            });
        } catch (e) {
          return;
        }

        this.$Progress.finish();
      }
    },
    registerKeydownListeners() {
      document.addEventListener("keydown", this.keydownListener);
    },
    clearKeydownListeners() {
      document.removeEventListener("keydown", this.keydownListener);
    }
  }
};
</script>
