<template>  
  <div>    
    <div class="border-bottom pb-3 mb-3">
      <p><b>Akun PPM</b></p>    
      <div class="row">
        <div class="col">
          <p>Nomor Mahasiswa</p>
          <p>Email</p>
          <p>No Hp</p>
        </div>
        <div class="col">
          <p>: {{peserta.npm}}</p>
          <p>: {{peserta.email}}</p>
          <p>: {{peserta.hp}}</p>
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
  computed: {
    peserta () {
      return this.$store.getters.getDataPeserta
    }
  },

  methods: {
    step () {
      this.$emit('step', 1)
    }
  }
}
</script>

