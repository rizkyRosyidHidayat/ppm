<template>
  <div>
    <div class="border-bottom pb-3 mb-3">      
      <p>
        <b>Data Pribadi</b>
      </p>
      <div class="mb-3">
        <img v-bind:src="peserta.foto" v-if="peserta.foto" class="img-thumbnail"/> 
      </div>
      <div class="row">
        <div class="col">
          <p>Nama Lengkap</p>
          <p>Jenis Kelamin</p>
          <p>Tempat Lahir</p>
          <p>Tanggal Lahir</p>
          <p>Agama</p>
          <p>Sekolah Asal</p>
        </div>
        <div class="col">
          <p>: {{peserta.nama}}</p>
          <p>: {{peserta.jk}}</p>
          <p>: {{peserta.tempat_lahir}}</p>
          <p>: {{peserta.tgl_lahir}}</p>
          <p>: {{agama}}</p>
          <p>: {{peserta.slta_asal}}</p>
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
export default {
  data: () => ({
    agama: '',
  }),

  computed: {
    peserta () {
      return this.$store.getters.getDataPeserta 
    },
  },  

  watch: {
    'peserta.id_agama': function (value) {
      switch (value) {
        case 1:
            this.agama = 'Islam'
            break;
        case 2:
            this.agama = 'Hindhu'
            break;
        case 3:
            this.agama = 'Kristen'
            break;
        case 4:
            this.agama = 'Katholik'
            break;
        case 5:
            this.agama = 'Budha'
            break;
        case 6:
            this.agama = 'Lainnya'
            break;                
        default:
            break;
      } 
    }
  },
  
  methods: {
    step () {
      this.$emit('step', 2)
    }
  }
}
</script>

