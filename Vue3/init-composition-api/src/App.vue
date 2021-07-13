<template>
  <div>
    <button @click="a++">{{ a }}</button>
    <button @click="b++">{{ b }}</button>
    <p>{{ total }}</p>
    <div v-for="number in history" :key="number">
      {{ number }}
    </div>
  </div>
</template>

<script>
import { useNumbers } from "./composables/useNumber";

export default {
  setup() {
    return useNumbers();
  },
};
</script>

<style scoped>
p {
  font-size: 40px;
}
button {
  height: 100px;
  width: 100px;
  font-size: 40px;
}
</style>
