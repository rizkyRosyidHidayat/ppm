<template>
  <div class="navbar row mb-4">
    <div class="col-lg-4 col-sm-12">
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <a class="nav-link" href="#tentang">Tentang PPM</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#kontak">Kontak</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/bantuan">FAQ</a>
        </li>
      </ul>
    </div>

    <div class="col-lg-4 col-sm-12">
      <center>
        <img src="../../../assets/logo.png" alt="logo" class="img-fluid" style="width: 185px;">
      </center>
    </div>

    <div class="col-lg-4 col-sm-12">      
      <center>
        <v-btn
          color="red"
          round
          depressed
          dark
          to="/login"
        >
          Login
        </v-btn>   
      </center>     
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .nav .nav-item .nav-link{
    color: #fff;
    transition: all 0.2s ease;
  }
  .nav .nav-item .nav-link:hover{
    color: rgb(194, 194, 194);
  }
</style>
