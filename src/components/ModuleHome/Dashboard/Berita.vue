<template>
  <div class="card">
    <div class="card-header">
      <span class="h3">Berita Utama</span>
    </div>
    <div class="card-body">
      <v-list>
        <v-list-tile 
          v-for="(item, index) in berita"
          :key="index"
          class="mb-3"
        >
          <v-list-tile-action>
            <v-btn icon>
              <v-icon color="info">info</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <b>{{item.judul}}</b>
            </v-list-tile-title>
            <v-list-tile-title v-text="item.konten"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
  </div>
</template>

<script>
import { getBerita } from "@/services";
export default {
  data: () => ({
    berita: []
  }),

  created () {
    getBerita()
      .then(res => {
        this.berita = res.data.data
      })
  },
}
</script>

<style>

</style>
