<template>
  <div
    class="top-0 right-0 w-1/2 flex flex-col fixed overflow-y-scroll"
    style="height: calc(100vh - 55px); top: 55px"
  >
    <div
      v-if="target.title"
      class="text-black text-xl font-serif bg-gray-100 w-full z-50 p-4"
    >
      {{ target.title }}
    </div>

    <div class="w-full relative flex select-none" style="height: 100%">
      <div class="m-auto">
        <!-- example, using custom adult gif site -->
        <div v-if="targetUrl && targetUrl.includes('redgifs.com')">
          <iframe
            :src="targetUrl.replace('watch', 'ifr')"
            frameborder="0"
            scrolling="no"
            allowfullscreen
            style="width: 100%"
          ></iframe>
        </div>

        <!-- for typical gifv, like imgur -->
        <div v-else-if="targetUrl && targetUrl.includes('.gifv')">
          <video
            muted
            autoplay
            loop
            :src="targetUrl.replace('.gifv', '.mp4')"
            style="width: 100%;"
          ></video>
        </div>

        <!-- for typical mp4 (rare) -->
        <div v-else-if="targetUrl && targetUrl.includes('.mp4')">
          <video
            muted
            autoplay
            loop
            :src="targetUrl"
            style="width: 100%"
          ></video>
        </div>

        <!-- for typical image -->
        <v-lazy-image
          v-else-if="targetUrl"
          style="width: 100%"
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
              this.$Progress.fail();
            }
          "
        />
      </div>
    </div>

    <div class="relative flex flex-col w-full h-full">
      <div class="w-full h-auto pt-1 pr-1 z-50 text-white flex justify-between">
        <a
          class="opacity-25 p-1 hover:bg-black bg-gray-900 rounded border border-gray-800  cursor-pointer"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" class="bookmark w-4 h-4">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
          </svg>
        </a>
        <a
          :href="targetUrl"
          target="_blank"
          class="p-1 hover:bg-black bg-gray-900 rounded border border-gray-800 cursor-pointer"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            class="external-link w-4 h-4"
          >
            <path
              d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
            ></path>
            <path
              d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
            ></path>
          </svg>
        </a>
      </div>
      <!-- <div class="w-full block bg-black h-20"></div> -->
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
      loaded: false,
      timeout: null
    };
  },
  watch: {
    "target.url": {
      handler: function(n, o) {
        this.targetUrl = null;
        this.loaded = false;
        // console.log("[target-url]", n, o);
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.targetUrl = n;
        }, 5);
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
  transition: all 0.3s ease;
  filter: blur(8px);
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
