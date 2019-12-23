<template>
  <div class="card">
    <div class="card-header">
      <span class="h3">Alamat</span>
    </div>
    <div class="card-body">
      <v-form
        ref="form"
        lazy-validation
      >
        <div class="row">
          <v-text-field
            v-model="alamat.alamat_asal"
            :rules="requiredRule"
            label="Alamat"
            required      
            class="col-lg-6 col-xs-12"
          ></v-text-field>
          <div class="row col-lg-6 col-xs-12">
            <div class="col">
              <v-text-field
                v-model="alamat.rt"
                :rules="requiredRule"
                label="RT"
                min="1"
                required
                type="number"
              ></v-text-field>
            </div>
            <div class="col">
              <v-text-field
                v-model="alamat.rw"
                :rules="requiredRule"
                label="RW"
                type="number"
                min="1"
                required
              ></v-text-field>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-xs-12">
            <v-text-field
              v-model="alamat.kecamatan"
              :rules="requiredRule"
              label="Kecamatan"
              required
            ></v-text-field>
          </div>
          <div class="col-lg-6 col-xs-12">
            <v-text-field
              v-model="alamat.kode_pos"
              :rules="requiredRule"
              label="Kode Pos"
              mask="#####"
              required
            ></v-text-field>
          </div>
        </div> 
        <div class="row">
          <v-select
            v-model="alamat.id_negara"
            :items="itemNegara"
            item-text="nama_negara"
            item-value="id_negara"
            :rules="requiredRule"
            label="Negara"      
            required
            class="col-lg-6 col-xs-12"
          ></v-select>
          <v-select
            v-model="alamat.id_daerah"
            :items="itemDaerah"
            item-text="nama_daerah"
            item-value="id_daerah"
            :rules="requiredRule"
            label="Provinsi"      
            required
            class="col-lg-6 col-xs-12"
          ></v-select>
        </div>
        <div class="row mb-3">
          <v-select
            v-model="alamat.id_kab"
            :rules="requiredRule"
            :items="itemKab"
            item-text="nama_kab"
            item-value="id_kab"
            label="Kabupaten"      
            required
            class="col-lg-6 col-xs-12"
          ></v-select>
          <v-text-field
            v-model="alamat.alamat_yk"
            :rules="requiredRule"
            label="Alamat di Yogyakarta"
            hint="Mohon diisi dengan alamat yang diyogyakarta (kos/kontrakan)"
            persistent-hint
            required
            class="col-lg-6 col-xs-12"
          ></v-text-field>
        </div>
        <div class="clearfix">
          <v-btn
            color="primary"
            @click="validate"
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
            <span v-else>Edit</span>
          </v-btn>
        </div>
      </v-form>
      <v-snackbar
        v-model="show"
        :timeout="2000"
        absolute
        bottom
        left
      >
        {{ textNotif }}
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { editMhs, getNegara, getDaerah, getKabupaten, getFullDaerah, getFullKabupaten } from '@/services'

export default {
  data: () => ({
    dataAlamat: {
      alamat_asal: '',
      rw: null,
      rt: null,
      kecamatan: '',
      kode_pos: null,
      id_daerah: null,
      id_negara: null,
      id_kab: null,
      alamat_yk: '',
    },
    requiredRule: [
      v => !!v || 'Harus diisi ya :)'
    ],
    itemKab: [],
    itemDaerah: [],
    itemNegara: [],
    show: false,
    textNotif: '',
    isLoading: false,
    isDisabled: false,
  }),

  created (){
    getNegara()
      .then(res => {
        this.itemNegara = res.data.data
      })
    getFullDaerah()
      .then(res => {
        this.itemDaerah = res.data.data
      })
    getFullKabupaten()
      .then(res => {
        this.itemKab = res.data.data
      })
  },

  watch: {
    'alamat.id_negara': function (value) {
      getDaerah(value)
        .then(res => {
          this.itemDaerah = res.data.data
        })
    },
    'alamat.id_daerah': function (value) {
      getKabupaten(value)
        .then(res => {
          this.itemKab = res.data.data
        })
    }
  },
  
  methods: {
    validate (e) {
      e.preventDefault()
      if (this.$refs.form.validate(e)) {
        this.dataAlamat.alamat_asal = this.alamat.alamat_asal
        this.dataAlamat.rw = this.alamat.rw
        this.dataAlamat.rt = this.alamat.rt
        this.dataAlamat.kecamatan = this.alamat.kecamatan
        this.dataAlamat.kode_pos = this.alamat.kode_pos
        this.dataAlamat.id_daerah = this.alamat.id_daerah
        this.dataAlamat.id_negara = this.alamat.id_negara
        this.dataAlamat.id_kab = this.alamat.id_kab
        this.dataAlamat.alamat_yk = this.alamat.alamat_yk

        this.$store.commit('updateAlamatMhs', this.dataAlamat) 
        var dataAlamat = this.$store.getters.getDataMhs
        this.isDisabled = true
        this.isLoading = true
        editMhs(this.alamat.npm, dataAlamat)
          .then( res => {   
            window.localStorage.setItem('userdata', JSON.stringify(dataAlamat))         
            this.show = true
            this.textNotif = 'Data berhasil diedit'
            this.isDisabled = false
            this.isLoading = false
          })
          .catch( err => {
            this.show = true
            this.textNotif = 'Data gagal diedit'
            this.isDisabled = false
            this.isLoading = false
          })    
      }
    },
  },

  computed: {
    alamat () {
      return this.$store.getters.getDataMhs
    }
  },
}
</script>

<style>

</style>
