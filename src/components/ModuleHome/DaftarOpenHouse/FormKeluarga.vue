<template>
    <div class="card-body">
      <v-form
        lazy-validation
        ref="form"        
      >
        <div class="row">      
          <v-text-field
            v-model="dataKeluarga.nama_kel"
            :rules="requiredRule"
            label="Nama Lengkap"
            required
            class="col-lg-6 col-xs-12"
          ></v-text-field>  
          <v-select
            v-model="dataKeluarga.id_hub_kel"
            :items="itemHubungan"
            item-text="nama"
            item-value="id_hub_kel"
            :rules="requiredRule"
            label="Hubungan keluarga"
            required
            class="col-lg-6 col-xs-12"
          ></v-select>  
        </div> 
        <div class="row">
          <v-radio-group 
            v-model="dataKeluarga.jk" 
            row 
            class="col-lg-12 col-xs-12"
            :rules="requiredRule"
            validate-on-blur
          >
            <v-radio label="Laki-laki" value="laki-laki" color="primary"></v-radio>
            <v-radio label="Perempuan" value="perempuan" color="primary"></v-radio>
          </v-radio-group> 
        </div>  
        <div class="row">
          <v-text-field
          v-model="dataKeluarga.email"
          :rules="emailRules"
          label="Email"
          required
          class="col-lg-6 col-xs-12"
        ></v-text-field>
        </div>
        <div class="row">
          <v-text-field
            v-model="dataKeluarga.telepon"
            :rules="hpRule"
            label="No. Hp"
            mask="#### #### #####"
            required
            class="col-lg-6 col-xs-12"
          ></v-text-field>           
          <v-text-field
            v-model="dataKeluarga.pekerjaan"
            :rules="requiredRule"
            label="Pekerjaan"
            required
            class="col-lg-6 col-xs-12"
          ></v-text-field>
        </div>       
        <v-text-field
          v-model="dataKeluarga.alamat"
          :rules="requiredRule"
          label="Alamat"
          required
        ></v-text-field>
        <div class="clearfix">
          <v-btn
            color="primary"
            @click.prevent="validate"
            type="submit"
            class="float-right"
            :disabled="isDisabled"
          >
            <v-progress-circular
              indeterminate
              color="white"
              :size="25"
              v-if="isLoading"
            ></v-progress-circular>
            <span v-else>Daftar</span>
          </v-btn>
        </div>
      </v-form>      
      <v-snackbar
        v-model="snackbar"
        top
        color="error"
      >
        daftar gagal, mohon diteliti lagi salah :(
        <v-btn
          color="white"
          flat
          @click="closeSnackbar"
        >
          Close
        </v-btn>
      </v-snackbar>
    </div>
</template>

<script>
import {postKeluarga} from '@/services'

export default {
  data: () => ({
    dataKeluarga: {
      npm: '',
      nama_kel: '',
      jk: '',
      telepon: '',
      pekerjaan: '',
      alamat: '',
      id_hub_kel: '',
      email: '',
    },
    requiredRule: [
      v => !!v || 'Harus diisi ya :)', 
    ],
    emailRules: [
      v => !!v || 'Harus diisi ya :)',
      v => /.+@.+/.test(v) || 'Harus email ya ;)'
    ],
    itemHubungan: [
      { "id_hub_kel": '1', "nama": 'Ayah' },
      { "id_hub_kel": '2', "nama": 'Ibu' },
      { "id_hub_kel": '3', "nama": 'Kakak' },
      { "id_hub_kel": '4', "nama": 'Paman' },
      { "id_hub_kel": '6', "nama": 'Bibi' },
      { "id_hub_kel": '7', "nama": 'Kakek' },
      { "id_hub_kel": '10', "nama": 'Wali' },
    ], 
    snackbar: false,
    isLoading: false,
    isDisabled: false,
  }),

  methods: {
    validate (e) {
      if (this.$refs.form.validate(e)) {
        this.dataKeluarga.npm = this.dataMhs.npm
        this.isLoading = true
        this.isDisabled = true
        this.$store.dispatch('postKeluarga', this.dataKeluarga).then(res => {
          this.$emit('isEmpty', 1)
          this.isLoading = false
          this.isDisabled = false
        })
      }
    },
    closeSnackbar () {
      this.snackbar = false
      this.isLoading = false
      this.isDisabled = false
    }
  },

  computed: {    
    hpRule () {
      return [
        ...this.requiredRule,
        v => v.length >= 11 || 'Minimal 11 karakter'
      ]
    },

    dataMhs () {
      return this.$store.getters.getDataMhs
    }
  }
}
</script>

<style>

</style>
