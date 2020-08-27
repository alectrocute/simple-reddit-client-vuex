<template>
  <div
    @click="target"
    v-if="ready"
    class="hover:bg-gray-300 select-none cursor-pointer item flex justify-start bg-gray-200 border border-gray-300 text-gray-900 my-2"
  >
    <div class="flex flex-col text-xs flex-none my-auto mr-4">
      <span>{{ upvotes }}</span>
      <span class="opacity-50">{{ liked_percentage }}</span>
    </div>
    <a :href="data.url" target="_blank">
      <img
        class="rounded w-12 h-auto hover:border border-gray-400 cursor-pointer hover:opacity-75"
        v-if="!data.is_self"
        :src="data.thumbnail"
      />
    </a>
    <div class="flex flex-col ml-4 my-auto">
      <p class="relative text-md truncate w-auto">
        {{ data.title.slice(0, data.title.length > 50 ? 50 : data.title.length)
        }}{{ data.title.length > 50 ? "..." : "" }}
      </p>
      <div class="w-full flex mt-1 overflow-hidden">
        <img
          class="w-3 mr-1"
          v-for="(award, a) in data.all_awardings"
          :title="award.description"
          :key="`subaward-${a}`"
          :src="award.icon_url"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",
  data() {
    return {
      ready: false
    };
  },
  props: {
    data: Object,
    iter: Number
  },
  mounted() {
    this.ready = true;
  },
  methods: {
    target() {
      this.$store.commit("SET_TARGET", this.data);
      this.$store.commit("SET_TARGET_ID", this.iter);
    }
  },
  computed: {
    upvotes: function() {
      return this.data && this.data.ups ? this.data.ups : null;
    },
    liked_percentage: function() {
      return this.data && this.data.upvote_ratio
        ? this.data.upvote_ratio.toString().replace("0.", "") + "%"
        : null;
    }
  }
};
</script>

<style>
.item {
  position: relative;
  padding: 20px;
}
</style>
