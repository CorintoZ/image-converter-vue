<template>
  <div>
    <h1 style="text-align:center">Image Converter</h1>
    <InputFile></InputFile>
    <Task v-for="(image, index) in images" :image="image" :key="index"></Task>
  </div>
</template>

<script>
import InputFile from '@/components/InputFile.vue'
import Task from '@/components/Task.vue'
export default {
  components: {
    InputFile,
    Task
  },
  computed: {
    images() {
      return this.$store.getters.allImages
    }
  }
}
</script>

<style lang="scss" scoped></style>
