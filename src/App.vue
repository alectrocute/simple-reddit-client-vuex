<template>
  <div id="app" class="px-3 w-full mx-auto bg-gray-100">
    <div class="w-full h-12 flex justify-between">
      <router-link
        class="my-auto text-lg"
        :to="`/${$route.params.pathMatch}`"
        >{{ $route.params.pathMatch || $store.state.defaultSub }}</router-link
      >
      <div class="my-auto ml-2 text-lg" v-if="$store.state.loading">
        ...
      </div>
    </div>
    <router-view />
  </div>
</template>
