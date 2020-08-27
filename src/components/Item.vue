<template>
  <div
    @click="target"
    v-if="ready"
    class="hover:bg-gray-300 select-none cursor-pointer item flex justify-start bg-gray-200 border border-gray-300 text-gray-900 my-2 h-24"
  >
    <div class="flex flex-col text-xs flex-none my-auto mr-4 w-10">
      <span>{{ upvotes }}</span>
      <span class="opacity-50">{{ liked_percentage }}</span>
    </div>
    <a
      :href="data.url"
      target="_blank"
      class="my-auto w-16 h-16 rounded-lg overflow-hidden flex-none"
    >
      <img
        class="object-cover h-full bg-gray-300"
        v-if="!data.is_self && data.thumbnail !== 'default'"
        :src="data.thumbnail"
      />
      <div v-else class="w-full h-full bg-gray-300 object-cover"></div>
    </a>
    <div class="relative overflow-hidden flex flex-col ml-4 my-auto w-full">
      <p class="text-md truncate w-full">
        {{ data.title }}
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
      this.$Progress.start();
      this.$store.commit("SET_TARGET", this.data);
      this.$store.commit("SET_TARGET_ID", this.iter);
      this.$Progress.finish();
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
