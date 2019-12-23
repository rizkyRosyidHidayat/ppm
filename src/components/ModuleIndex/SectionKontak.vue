<template>
  <section class="section-kontak py-5" id="kontak">
    <div class="container">
      <p class="h1">
        Pusat Informasi
      </p>
      <p class="lead mb-5">
        Untuk informasi lebih lanjut tentang PPM 
        bisa menghubungi
      </p>
      <div class="row">
        <div class="col-lg-4">
          <div class="border border-primary alert py-4">
            <center>
              <v-btn fab large color="primary" class="mb-5">
                <v-icon dark large>person_pin_circle</v-icon>
              </v-btn>
              <div class="lead">
                <p class="h4">
                  Universitas Amikom Yogyakarta
                </p>
                <span class="text-secondary">
                  Gedung 4, basement
                </span>
              </div>
            </center>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="border border-danger alert py-4">
            <center>
              <v-btn fab large dark color="red" class="mb-5">
                <v-icon dark large>mail</v-icon>
              </v-btn>
              <div class="lead">
                <p class="h4">
                  Email PPM Amikom
                </p>
                <span class="text-secondary">
                  ppm@amikom.ac.id
                </span>
              </div>
            </center>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="border border-success alert py-4">
            <center>
              <v-btn fab large color="success" class="mb-5">
                <v-icon dark large>phone</v-icon>
              </v-btn>
              <div class="lead">
                <p class="h4">
                  Whatsapp & Telepon
                </p>
                <span class="text-secondary">
                  +62 895 1313 38568
                </span>
              </div>
            </center>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style>
  .section-kontak{
    background-color: #000407;
    color: #fff;
  }
</style>
