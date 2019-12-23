<template>
  <div class="col-lg-4 col-md-8 col-xs-12 m-auto">
    <div class="card border-0">
      <div class="card-body">
        <center>
          <figure class="my-3">
            <a href="/">
              <img src="../assets/logo.png" alt="logo"/>
            </a>
          </figure>
        </center>
        <form-login/>
      </div>
      <div class="card-footer">
        <center>
          <v-btn to="/signup" flat color="primary">Daftar PPM sekarang</v-btn>
        </center>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import FormLogin from'../components/ModuleLogin/FormLogin';
import Footer from'../components/Footer';

export default {
  components:{
    Footer,
    FormLogin,
  }
}
</script>

