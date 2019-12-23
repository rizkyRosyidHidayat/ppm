<template>
  <div class="col-lg-6 col-md-8 col-xs-12 mx-auto my-5">            
    <div class="card border-0" style="overflow: hidden;">
      <router-view/>
    </div>
    <Footer/>
  </div>  
</template>
<script>
import Footer from '../components/Footer'

export default {
  components: {
    Footer,
  }
}
</script>

