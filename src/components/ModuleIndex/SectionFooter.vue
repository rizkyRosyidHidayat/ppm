<template>
  <footer>
    <div class="container py-5">
      <center>
        <div class="mb-3">
          <img src="../../assets/logo.png" alt="logo">
        </div>
        <ul class="nav justify-content-center mb-5">
          <li class="nav-item">
            <a class="nav-link" href="https://instagram.com/ppmamikom2019">Instagram</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://twitter.com/ppmamikom">Twitter</a>
          </li>
        </ul>
        <div>
          &copy; 2019. Penggalian Potensi Mahasiswa Amikom
        </div>
      </center>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style>
  footer{
    background-image: url('../../assets/footer2.jpg');
    background-size: cover;
    background-position: top;
    color: #fff;
  }
  .nav .nav-item .nav-link{
    color: #fff;
    transition: all 0.2s ease;
  }
  .nav .nav-item .nav-link:hover{
    color: rgb(194, 194, 194);
  }
</style>
