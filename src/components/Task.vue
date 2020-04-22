<template>
  <div class="task">
    <!-- <div :class="isUpload ? uploading : ready"></div> -->
    <p style="padding: 2px;">{{ image.name }}</p>
    <img
      v-if="image.status === 'uploading'"
      src="@/assets/eclipse.svg"
      alt="Uploading"
    />
    <div
      style="cursor:pointer"
      v-if="image.status === 'done'"
      @click="download"
    >
      <img
        src="@/assets/download.svg"
        style="padding-top: 5px"
        width="80px"
        height="40px"
        alt="Uploading"
      />
    </div>
    <p v-if="image.status === 'cancelled'" class="cancelled">CANCELLED</p>
    <button
      v-if="image.status !== 'cancelled' && image.status !== 'done'"
      @click="cancel"
    >
      Cancel
    </button>
  </div>
</template>

<script>
export default {
  props: ['image'],
  methods: {
    download() {
      // Create a download event
      var fileLink = document.createElement('a')
      fileLink.href = this.image.name
      fileLink.setAttribute('download', this.image.name)
      document.body.appendChild(fileLink)

      fileLink.click()
      fileLink.remove()
    },
    cancel() {
      this.$props.image.rq.cancel()
    }
  }
}
</script>

<style scoped>
.task {
  display: flex;
  width: 60%;
  margin-right: auto;
  margin-left: auto;
  max-height: 50px;
  justify-content: flex-end;
  margin-bottom: 20px;
  background-color: rgb(169, 169, 169);
  border-radius: 15px;
}
.cancelled {
  color: red;
  margin-right: 10px;
  margin-left: 10px;
}
</style>
