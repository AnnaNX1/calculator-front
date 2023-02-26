<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps<{
  description: {
    methodLink: {type: string, required: true},
    title: {type: string, required: true},
    runButtonTitle: {type: string, required: true},
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

import  { uploadFiles }  from  '../compositions/file-uploader'
const setFileToUser = async (response) => {
  const headers = response.headers
  const blob = new Blob([await response.blob()], { type: headers['content-type'] })
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a')
  a.href = url;
  a.download = `${props.description.title}.xlsx`;
  // a.download = `1.xlsx`;
  a.click();
  a.remove()
}
const VITE_URL = import.meta.env.VITE_URL;
</script>

<template>
  <div>
    <div v-if="active">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div>
      <h1 class="text-h2 font-weight-bold">{{description.title}}</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <h2>Input files:</h2>
          <div v-for="file in description.filesDescription">
            {{file.name}}
            <span v-if="file.description">({{file.description}})</span>
            <v-tooltip text="Load file" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  color="primary"
                  :href="`${VITE_URL}${file.link}`"
                  rel="noopener noreferrer"
                  target="_blank"
                  class="ma-2"
                  variant="text"
                  icon="mdi-download"
                  :disabled="!file.link"
                ></v-btn>
              </template>
            </v-tooltip>
          </div>
        </v-col>

        <v-col cols="auto">
          <v-file-input
            ref="fileInput"
            v-model="files"
            multiple
            label="File input"
          ></v-file-input>
        </v-col>

        <v-col cols="auto">{{files}}
          <v-btn
            @click.prevent="async () => {
              setActive()
              const response = await uploadFiles(files, `${VITE_URL}${description.methodLink}`)
              this.$refs.fileInput.reset()
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

            {{description.runButtonTitle}}
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
