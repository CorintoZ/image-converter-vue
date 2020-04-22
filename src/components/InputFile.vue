<template>
  <div>
    <form enctype="multipart/form-data" novalidate>
      <div class="dropbox">
        <input
          type="file"
          :name="uploadFieldName"
          @change="filesChange($event.target.name, $event.target.files)"
          accept="image/png"
          class="input-file"
        />
        <p>
          Drag your file here to begin<br />
          or click to browse
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadFieldName: 'image'
    }
  },
  computed: {},
  methods: {
    save(formData) {
      // Upload data to the server
      this.$store.dispatch('uploadImage', formData)
    },
    filesChange(fieldName, fileList) {
      const formData = new FormData()

      if (!fileList.length) return

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name)
      })
      // save it
      this.save(formData)
    }
  }
}
</script>

<style scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  max-width: 60%;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  border-radius: 10px;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
