<template>
  <v-container>
    <v-responsive class="d-flex align-center text-center fill-height">
      <div>
        <h1
          class="text-h2 font-weight-bold title"
          style="color: #fc0; margin-top: 15px;"
        >YM</h1>
        <request-form
          :description="description['ym']['get eff']"
          color="#fc0"
        ></request-form>
        <request-form
          :description="description['ym']['get price']"
          color="#fc0"
        ></request-form>
      </div>
      <div>
        <h1 style="color: #0050e0;" class="text-h2 font-weight-bold title">Ozon</h1>
        <request-form
          :description="description['ozon']['get eff']"
          color="#0050e0"
        ></request-form>
        <request-form
          :description="description['ozon']['get price']"
          color="#0050e0"
        ></request-form>
      </div>

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

<style>
.title {
  margin-bottom: 30px;
}
</style>
