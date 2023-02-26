<template>
  <v-container>
    <v-responsive class="d-flex align-center text-center fill-height">
      <h1 class="text-h2 font-weight-bold">YM</h1>
      <request-form
        :description="description['ym']['get eff']"
      ></request-form>
      <request-form
        :description="description['ym']['get price']"
      ></request-form>
      <h1 class="text-h2 font-weight-bold">Ozon</h1>
      <request-form
        :description="description['ozon']['get eff']"
      ></request-form>
      <request-form
        :description="description['ozon']['get price']"
      ></request-form>
    <!--  <HelloWorld />-->
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
  import HelloWorld from '@/components/HelloWorld.vue'
  import RequestForm from "@/components/RequestForm.vue"
  import description from "@/compositions/description.json"
  const VITE_URL = import.meta.env.VITE_URL;
</script>
