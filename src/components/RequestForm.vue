<script lang="ts" setup>
defineProps<{
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
</script>

<template>
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
            multiple
            label="File input"
          ></v-file-input>
        </v-col>

        <v-col cols="auto">
          <v-btn
            color="primary"
            href="https://next.vuetifyjs.com/introduction/why-vuetify/#feature-guides"
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
</template>
