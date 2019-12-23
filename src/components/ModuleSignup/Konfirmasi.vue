<template>
  <div>
    <p class="alert alert-info">
      Jika ada data yang belum sesuai silahkan bisa diedit terlebih dahulu
    </p>    
    <AkunPPM @step="step"/>
    <DataPribadi @step="step"/>
    <Alamat @step="step"/>            
    <v-btn 
      color="primary" 
      @click="back"
      flat
    >
      Back
    </v-btn>    
    <v-btn 
      color="primary" 
      @click="next"
    >
      Finish
    </v-btn>    
    <v-snackbar
      v-model="snackbar"
      top
      color="error"
    >
      Pendaftaran gagal, mohon dilihat kembali data yang di inputkan :)
      <v-btn
        color="white"
        flat
        @click="closeSnackbar"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import AkunPPM from './Konfirmasi/AkunPPM'
import DataPribadi from './Konfirmasi/DataPribadi'
import Alamat from './Konfirmasi/Alamat'
import { postPeserta } from '@/services'

export default {
  components: {
    Alamat,
    DataPribadi,
    AkunPPM,
  },

  data: () => ({
    snackbar: false
  }),

  methods: {
    step (e) {
      this.$emit('next-step', e)
    },    
    back () {
      this.$emit('next-step', 3)
    },
    next () {
      var dataPeserta = this.$store.getters.getDataPeserta
      postPeserta(dataPeserta)
        .then(res => {
          this.$router.replace({ name: 'login' })
        })
        .catch(e => {
          this.snackbar = true
        })
    },
    closeSnackbar () {
      this.snackbar = false
    }
  }
}
</script>
