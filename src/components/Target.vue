<template>
  <div
    v-if="targetUrl"
    class="right-0 w-1/2 rounded-t h-full flex fixed overflow-y-scroll"
    style="height: 90%"
  >
    <div class="m-auto border border-yellow-200 bg-yellow-100">
      <v-lazy-image
        v-if="targetUrl && target.thumbnail"
        class="object-cover rounded-t"
        :src="targetUrl"
        :src-placeholder="target.thumbnail"
        @load="
          () => {
            this.loaded = true;
          }
        "
        @error="
          () => {
            this.loaded = false;
          }
        "
      />
      <p class="p-2 text-xs text-yellow-900">
        {{ target.title }}
      </p>
    </div>
  </div>
</template>

<script>
import VLazyImage from "v-lazy-image";

export default {
  name: "Target",

  components: {
    VLazyImage
  },
  data() {
    return {
      targetUrl: null,
      loaded: false
    };
  },
  watch: {
    "target.url": {
      handler: function(n, o) {
        this.targetUrl = null;
        this.loaded = false;
        console.log("[target-url]", n, o);
        this.targetUrl = n;
      }
    }
  },

  computed: {
    target() {
      return this.$store.state.target ? this.$store.state.target : null;
    }
  }
};
</script>

<style>
.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
