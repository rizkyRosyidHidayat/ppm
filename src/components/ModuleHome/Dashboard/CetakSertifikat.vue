<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="row">
        <div class="col-12 col-sm-6">
          <div class="media">
            <v-avatar color="grey lighten-3">
              <img :src="foto" alt="avatar"/>
            </v-avatar>
            <div class="media-body ml-2">
              <h5 class="mt-0">{{ mhs ? mhs.nama : '' }}</h5>
              <div class="subtitle">
                <span>
                  Kelompok : <b>{{ kelompok }}</b>
                </span>
                <!-- <span>
                  Status : <b class="text-danger">belum konfirmasi</b>
                </span> -->
              </div>
            </div>
          </div>
        </div>
        <div class="clearfix col-12 col-sm-6">
          <v-btn
            color="primary"
            class="float-right"
            disabled
          >
            Cetak co-card
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getKelompok } from "@/services";
export default {
  data: () => ({
    kelompok: '',
    foto: '',
  }),

  computed: {
    mhs () {
      return this.$store.getters.getDataMhs
    }
  },

  created () {
    this.foto = 'http://ppm.amikom.ac.id/resource/mahasiswa/foto_mhs/'+this.mhs.npm+'.jpg'
    getKelompok(this.mhs.npm)
      .then(res => {
        this.kelompok = res.data.data.nama_kelompok
      })
  },


}
</script>

<style>

</style>
