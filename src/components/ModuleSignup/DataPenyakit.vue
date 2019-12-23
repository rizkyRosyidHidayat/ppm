<template>
  <div>
    <template v-if="pil === 'penyakit'">
      <DaftarPenyakit/>
    </template>
    <div v-else-if="pil === 'tanya'">
      <div class="clearfix card-body">
        <p class="lead">
          Apakah kamu mempunyai riwayat atau penyakit sekarang ?
        </p>
        <div class="float-right">
          <v-btn 
            @click="tampilPenyakit"
            flat
            color="primary"
          >
            Iya
          </v-btn>
          <v-btn 
            to="/login"
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
import DaftarPenyakit from './DataPenyakit/DaftarPenyakit'

export default {
  components: {
    DaftarPenyakit,
  },

  data: () => ({
    pil: 'tanya'
  }),

  methods: {
    tampilPenyakit () {
      this.pil = 'penyakit'
    }
  }
}
</script>
