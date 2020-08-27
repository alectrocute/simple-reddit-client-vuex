<template>
  <div id="app" class="px-3 w-full mx-auto bg-gray-100">
    <div class="w-full h-12 flex justify-start">
      <router-link class="my-auto text-lg" :to="`/${$route.params.pathMatch}`"
        >/r/{{
          $route.params.pathMatch || $store.state.defaultSub
        }}</router-link
      >

      <div class="my-auto ml-2 text-lg" v-if="$store.state.loading">
        Fetching...
      </div>
    </div>
    <router-view />
  </div>
</template>
