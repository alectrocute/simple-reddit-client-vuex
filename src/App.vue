<template>
  <div id="app" class="px-3 w-full mx-auto bg-gray-100">
    <div
      class="h-12 flex justify-start overflow-y-scroll"
      style="width: 100%; z-index: 999999 !important"
    >
      <router-link
        class="my-auto text-sm border border-gray-200 bg-gray-100 opacity-50 rounded p-2"
        :to="`/${$route.params.pathMatch}`"
        >/r/{{
          $route.params.pathMatch || $store.state.defaultSub
        }}</router-link
      >

      <p
        v-for="(fav, f) in $store.state.favoriteSubs"
        :key="'fav-' + f"
        class="text-sm border border-gray-300  bg-gray-200 p-2 rounded my-auto ml-2 opacity-75 hover:opacity-50 cursor-pointer"
        @click="$router.push({ path: '/' + fav })"
      >
        /r/{{ fav }}
      </p>
    </div>
    <router-view />
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>
