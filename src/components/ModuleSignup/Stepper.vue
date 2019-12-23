<template>
  <v-stepper v-model="el" alt-labels>
    <div class="card-header p-0 d-sm-block">
      <v-stepper-header class="shadow-none">
        <v-stepper-step
          :complete="el>1"
          step="1"
          class="pl-0"
        >
          Akun PPM         
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          :complete="el>2"
          step="2"
        >
          Data Pribadi
        </v-stepper-step>      
        <v-divider></v-divider>
        <v-stepper-step
          :complete="el>3"
          step="3"
        >
          Alamat
        </v-stepper-step>           
        <v-divider></v-divider>
        <v-stepper-step
          :complete="el>4"
          step="4"
        >
          Konfirmasi
        </v-stepper-step>
      </v-stepper-header>
    </div>
    <div class="card-body">
      <v-stepper-items>
        <v-stepper-content step="1">   
          <AkunPPM @next-step="controll"/>
        </v-stepper-content>
        <v-stepper-content step="2">
          <!-- content -->
          <DataPribadi @next-step="controll"/>
        </v-stepper-content>
        <v-stepper-content step="3">
          <!-- content -->
          <Alamat @next-step="controll"/>
        </v-stepper-content>
        <v-stepper-content step="4">
          <Konfirmasi @next-step="controll"/>
        </v-stepper-content>
      </v-stepper-items>
    </div>
  </v-stepper>
</template>

<script>
  import DataPribadi from './DataPribadi'
  import AkunPPM from './AkunPPM'
  import Alamat from './Alamat'
  import Konfirmasi from './Konfirmasi'

  export default {
    data: () => ({
      el: 1,
    }),
    components:{
      Konfirmasi,
      Alamat,
      AkunPPM,
      DataPribadi,
    },
    methods: {
      controll(e){
        this.el = e;
      },
    }
  }
</script>

<style>
  @media (max-width: 576px) {
    .d-sm-block {
      display: none!important;
    }
  }

</style>
