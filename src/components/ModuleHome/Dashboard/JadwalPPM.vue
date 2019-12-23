<template>
  <div class="card mb-4">
    <div class="card-header">
      <span class="h3">Jadwal PPM</span>
    </div>
    <div class="card-body">
      <v-data-table
        :headers="headers"
        :items="jadwal"
        hide-actions
        
      >
        <template v-slot:items="props">
          <td>{{props.item.nama_acara}}</td>
          <td>{{props.item.tanggal}}</td>
          <td>{{props.item.jam_mulai.slice(0,5)+' - '+props.item.jam_akhir.slice(0,5)}}</td>
          <td>{{props.item.nama_ruang}}</td>
          <td>
            <span v-if="props.item.status_hadir">
              <v-icon color="green">check_box</v-icon>
            </span>
            <span v-else>
              <v-icon color="red">cancel</v-icon>
            </span>
          </td>
        </template>
        <template v-slot:no-data>
          <p class="h6">
            Data kosong
          </p>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { getJadwal } from "@/services";
export default {
  data: () => ({
    jadwal: [],
    headers: [
      { text: 'Acara', value: 'Acara', sortable: false },
      { text: 'Tanggal', value: 'Tanggal', sortable: false },
      { text: 'Jam', value: 'Jam', sortable: false },
      { text: 'Tempat', value: 'Tempat', sortable: false },
      { text: 'Kehadiran', value: 'Kehadiran', sortable: false },
    ],
    ket: [],
  }),

  computed: {
    mhs () {
      return this.$store.getters.getDataMhs
    }
  },

  created () {
    getJadwal(this.mhs.npm)
      .then(res => {
        this.jadwal = res.data.acara
      }) 
  },
}
</script>

<style>

</style>
