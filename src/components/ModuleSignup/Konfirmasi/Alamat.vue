<template>
  <div>
    <div class="border-bottom pb-3 mb-3">
      <p>
        <b>Alamat</b>
      </p>
      <div class="row">
        <div class="col">
          <p>Alamat</p>
          <p>RT/RW</p>
          <p>Kecamatan</p>
          <p>Kode Pos</p>
          <p>Negara</p>
          <p>Provinsi</p>
          <p>Kabupaten</p>
          <p>Alamat Yogyakarta</p>
        </div>
        <div class="col">
          <p>: {{peserta.alamat_asal}}</p>
          <p>: {{peserta.rt}}/{{peserta.rw}}</p>
          <p>: {{peserta.kecamatan}}</p>
          <p>: {{peserta.kode_pos}}</p>
          <p>: {{peserta.nama_negara}}</p>
          <p>: {{peserta.nama_daerah}}</p>
          <p>: {{peserta.nama_kab}}</p>
          <p>: {{peserta.alamat_yk}}</p>
        </div>
      </div>
      <div class="clearfix">
        <v-btn
          depressed
          class="float-right"
          @click="step"
        >
          Edit
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    peserta () {
      return this.$store.getters.getDataPeserta  
    },
  },  

  methods: {
    step () {
      this.$emit('step', 3)
    }
  }
}
</script>

