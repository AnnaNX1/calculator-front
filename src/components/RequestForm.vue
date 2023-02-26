<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps<{
  title: { type: string, required: true },
  runButtonTitle: { type: string, required: true },
  filesDescription: {
    type: [
      {
        name: string,
        description: string,
        link: string
      }],
    required: true
  }
}
>()
let active = ref(false)
function setActive() {
  active.value = true
}
function setInactive() {
  active.value = false
}
// import  useFileList  from  '../compositions/file-list'
// const { files, addFiles, removeFile } = useFileList()

const files = ref([])

import  createUploader  from  '../compositions/file-uploader'
const { uploadFiles } = createUploader(`http://localhost:3000/findPriceForMarketplace/ym/calcEffByPrice`)

const setFileToUser = async (response) => {
  const headers = response.headers
  const blob = new Blob([await response.blob()], { type: headers['content-type'] })
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a')
  a.href = url;
  a.download = `${props.title}.xlsx`;
  // a.download = `1.xlsx`;
  a.click();
  a.remove()
}
</script>

<template>
  <div>{{files}}
    <div v-if="active">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div>
      <h1 class="text-h2 font-weight-bold">{{title}}</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <h2>Load files:</h2>
          <div v-for="file in filesDescription">
            {{file.name}}
            <span v-if="file.description">({{file.description}})</span>
            <span v-if="file.link">load</span>
          </div>
        </v-col>

        <v-col cols="auto">
          <v-file-input
            v-model="files"
            multiple
            label="File input"
          ></v-file-input>
        </v-col>

        <v-col cols="auto">
          <v-btn
            @click.prevent="async () => {
              setActive()
              const response = await uploadFiles(files)
              setInactive()
              await setFileToUser(response)
            }"
            color="primary"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
          >
            <v-icon
              icon="mdi-speedometer"
              size="large"
              start
            />

            {{runButtonTitle}}
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
