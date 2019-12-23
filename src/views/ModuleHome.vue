<template>
  <div class="col-lg-8 col-xs-12 mx-auto my-sm-3 my-md-5">
    <div class="row">
      <div class="col-lg-4 col-xs-12 web-header">
        <SideMenu/>
      </div>
      <div class="col-lg-8 col-xs-12">        
        <div class="mobile-header">
          <MobileHeader/>
        </div>
        <router-view/>
        <Footer/>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from '../components/ModuleHome/SideMenu'
import MobileHeader from '../components/ModuleHome/MobileHeader'
import Footer from '../components/Footer'

export default {
  components: {
    Footer,
    SideMenu,
    MobileHeader,
  }, 

  
}
</script>

<style>
  @media (max-width: 992px) {
    .web-header {
      display: none!important;
    }
  }
</style>
