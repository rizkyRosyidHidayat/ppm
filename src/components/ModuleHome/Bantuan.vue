<template>
  <div class="card">
    <div class="card-header">
      <span class="h3">
        Bantuan
      </span>
    </div>
    <div class="card-body p-0">
      <v-expansion-panel class="mb-0">
        <v-expansion-panel-content
          v-for="(item,i) in items"
          :key="i"
        >
          <template v-slot:header>
            <div>{{ item.pertanyaan }}</div>
          </template>
          <v-card>
            <v-card-text v-html="item.jawaban"></v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>
  </div>
</template>

<script>
import { getFAQ } from "@/services";
export default {
  data: () => ({
    items: [],
  }),
  
  created () {
    getFAQ()
      .then(res => {
        this.items = res.data.data
      })
  },
}
</script>

<style>

</style>
