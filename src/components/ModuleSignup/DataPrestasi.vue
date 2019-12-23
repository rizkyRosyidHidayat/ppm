<template>
  <div>
    <template v-if="pil === 'prestasi'">
      <TabelPrestasi/>  
    </template>
    <div v-else-if="pil === 'tanya'">
      <div class="clearfix card-body">
        <p class="lead">
          Apakah kamu mempunyai prestasi ?
        </p>
        <div class="float-right">
          <v-btn 
            @click="tampilPrestasi"
            flat
            color="primary"
          >
            Iya
          </v-btn>
          <v-btn 
            to="/penyakit"
            flat
            color="primary"
          >
            Tidak
          </v-btn>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import TabelPrestasi from './DataPrestasi/TabelPrestasi'

export default {
  data: () => ({
    pil: 'tanya'
  }),

  methods: {
    tampilPrestasi () {
      this.pil = 'prestasi'
    }
  },

  components: {
    TabelPrestasi
  }
}
</script>
