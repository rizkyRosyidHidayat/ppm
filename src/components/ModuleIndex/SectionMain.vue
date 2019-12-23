<template>
  <section class="section-main">    
    <div class="container">
      <Header/>
      <center>
        <p class="text-white lead ppm">
          Penggalian Potensi Mahasiswa <br>
          <span class="text-danger">
            <b>Akan dimulali dalam waktu</b>
          </span>
        </p>
        <Countdown 
          deadline="September 2, 2019" 
          class="text-white"
        ></Countdown>

        <v-btn
          color="red"
          depressed
          round
          large
          dark
          class="mb-4"
          to="/signup"
        >
          Daftar Sekarang
        </v-btn>
      </center>
    </div>    
  </section>
</template>

<script>
import Countdown from './SectionMain/Countdown'
import Header from './SectionMain/Header'

export default {
  components: {    
    Header,
    Countdown,
  },
}
</script>

<style lang="stylus">
  .section-main
    width 100%
    background-image: url('../../assets/bg-main.png')
    background-size: cover
    background-position: bottom

  .ppm
    font-size 2rem
</style>
