<template>
  <div id="app" class="w-full mx-auto bg-gray-100">
    <div
      class="px-2 fixed h-12 border-b border-gray-400 flex justify-start bg-gray-100 overflow-x-scroll"
      style="width: 100%; z-index: 999999 !important"
    >
      <div
        class="z-50 relative inline-block text-left flex flex-col my-auto mr-2"
        style="z-index: 999999999 !important"
      >
        <div>
          <span
            class="rounded-md shadow-sm"
            @click="dropdowns.type = !dropdowns.type"
          >
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-400 px-4 py-1 bg-gray-200 text-xs leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              {{ $store.state.type }}
              <svg
                class="-mr-1 ml-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </span>
        </div>

        <div
          v-if="dropdowns.type"
          class="origin-top-right fixed left-0 mt-4 ml-4 w-56 rounded-md shadow-lg"
        >
          <div
            class="rounded-md bg-white shadow-xs"
            @mouseleave="dropdowns.type = false"
          >
            <div
              @click="dropdowns.type = false"
              class="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <a
                v-for="(type, t) in ['hot', 'best', 'top', 'new']"
                :key="`type-${t}`"
                class="cursor-pointer block px-4 py-1 text-xs leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
                @click="$store.commit('SET_TYPE', type)"
              >
                {{ type }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        class="my-auto cursor-pointer mr-2 select-none"
        v-for="(fav, f) in $store.state.favoriteSubs"
        :key="'fav-' + f"
        @click="$router.push({ path: '/' + fav })"
      >
        <span class="rounded-md shadow-sm">
          <div
            :class="
              `inline-flex justify-center w-full rounded-md px-4 py-1 text-xs leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 ${
                $route.params.pathMatch == fav
                  ? 'border border-yellow-200 bg-yellow-100'
                  : 'border border-gray-200 bg-gray-100'
              }`
            "
            id="options-menu"
          >
            /r/{{ fav }}
          </div>
        </span>
      </div>
    </div>
    <router-view />
    <vue-progress-bar style="height: 3px !important"></vue-progress-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdowns: {
        type: false
      }
    };
  }
};
</script>

<style></style>
