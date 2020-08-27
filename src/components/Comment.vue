<template>
  <div class="w-full h-24 block">
    {{ comment.self_text }}
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: Object
  }
};
</script>

<style></style>
