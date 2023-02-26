<script lang="ts" setup>
import { ref } from 'vue'
import  { uploadFiles }  from  '../compositions/file-uploader'

const props = defineProps<{
  description: {
    methodLink: string,
    title: string,
    runButtonTitle: string,
    filesDescription:
      {
        name: string,
        description: string,
        link: string
      }[]
  },
  color: string
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
const setFileToUser = async (response: any) => {
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
  <div style="position: relative;">
    <div v-if="active" style="position: absolute; top: 0; width: 100%;">
      <div style="text-align: center;">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </div>
    <div>
<!--      <h1 class="text-h2 font-weight-bold">{{description.title}}</h1>-->

      <v-row class="d-flex align-start justify-center">

        <v-col cols="auto" style="min-width: 200px;">
          <h1 class="text-h4 font-weight-bold">{{description.title}}</h1>
        </v-col>
        <v-col cols="auto" style="min-width: 200px;">
          <h2>Input files:</h2>
          <div
            v-for="file in description.filesDescription"
            style="text-align: left;"
          >
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
                  class="ml-2"
                  variant="text"
                  icon="mdi-download"
                  :disabled="!file.link"
                ></v-btn>
              </template>
            </v-tooltip>
          </div>
        </v-col>

        <v-col cols="auto" style="min-width: 400px;">
          <v-file-input
            ref="fileInput"
            v-model="files"
            multiple
            label="File input"
            style="max-width: 380px;"
          >
            <template v-slot:selection="{ fileNames }">
              <template v-for="fileName in fileNames" :key="fileName">
                <v-chip
                  label
                  color="primary"
                  class="me-2"
                >
                  {{ fileName }}
                </v-chip>
              </template>
            </template>
          </v-file-input>
        </v-col>

        <v-col cols="auto" style="min-width: 200px;">
          <v-tooltip text="Calculate" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon
                @click.prevent="async () => {
                  setActive()
                  await setFileToUser(await uploadFiles(files, `${VITE_URL}${description.methodLink}`))
                  this.$refs.fileInput.reset()
                  setInactive()
                }"
                :color="color ? color : 'primary'"
                rel="noopener noreferrer"
                size="x-large"
                target="_blank"
                variant="flat"
                :disabled="!files.length || active"
              >
                <v-icon
                  color="white"
                  size="large"
                >mdi-cog-outline</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
