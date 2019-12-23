<template>
  <v-form
    ref="form"
    lazy-validation
  >
    <p class="h1">
      Alamat
    </p>
    <div class="row">
      <v-text-field
        v-model="dataAlamat.alamat_asal"
        :rules="msg"
        label="Alamat"
        required      
        class="col-lg-6 col-xs-12"
      ></v-text-field>
      <div class="row col-lg-6 col-xs-12">
        <div class="col">
          <v-text-field
            v-model="dataAlamat.rt"
            :rules="msg"
            label="RT"
            min="1"
            required
            type="number"
          ></v-text-field>
        </div>
        <div class="col">
          <v-text-field
            v-model="dataAlamat.rw"
            :rules="msg"
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
          v-model="dataAlamat.kecamatan"
          :rules="msg"
          label="Kecamatan"
          required
        ></v-text-field>
      </div>
      <div class="col-lg-6 col-xs-12">
        <v-text-field
          v-model="dataAlamat.kode_pos"
          :rules="msg"
          label="Kode Pos"
          mask="#####"
          required
        ></v-text-field>
      </div>
    </div> 
    <div class="row">
      <v-select
        v-model="dataAlamat.negara"
        :items="itemNegara"
        item-text="nama_negara"
        :rules="msg"
        label="Negara"      
        required
        return-object
        class="col-lg-6 col-xs-12"
      ></v-select>
      <v-select
        v-model="dataAlamat.daerah"
        :items="itemDaerah"
        item-text="nama_daerah"
        :rules="msg"
        label="Provinsi"      
        required
        return-object
        class="col-lg-6 col-xs-12"
      ></v-select>
    </div>
    <div class="row mb-3">
      <v-select
        v-model="dataAlamat.kabupaten"
        :rules="msg"
        :items="itemKab"
        item-text="nama_kab"
        label="Kabupaten"      
        required
        return-object
        class="col-lg-6 col-xs-12"
      ></v-select>
      <v-text-field
        v-model="dataAlamat.alamat_yk"
        :rules="msg"
        label="Alamat di Yogyakarta"
        hint="Mohon diisi dengan alamat yang diyogyakarta (kos/kontrakan)"
        persistent-hint
        required
        class="col-lg-6 col-xs-12"
      ></v-text-field>
    </div>
    <v-btn flat @click="back">
      Back
    </v-btn>
    <v-btn
      color="primary"
      @click="validate"
      type="submit"
    >
      Next
    </v-btn>
  </v-form>
</template>

<script>
import { getNegara, getDaerah, getKabupaten } from '@/services'

export default {
  data: () => ({
    dataAlamat: {
      alamat_asal: '',
      rw: null,
      rt: null,
      kecamatan: '',
      kode_pos: null,
      daerah: {
        id_daerah: 0,
        nama_daerah: ''
      },
      negara: {
        id_negara: 0,
        nama_negara: 'loading'
      },
      kabupaten: {
        id_kab: 0,
        nama_kab: ''
      },
      alamat_yk: '',
    },
    msg: [
      v => !!v || 'Harus diisi ya :)'
    ],
    itemKab: [],
    itemDaerah: [],
    itemNegara: []
  }),

  watch: {
    'dataAlamat.negara': function (value) {
      getDaerah(value.id_negara)
        .then(res => {
          this.itemDaerah = res.data.data
        })
    },
    'dataAlamat.daerah': function (value) {
      getKabupaten(value.id_daerah)
        .then(res => {
          this.itemKab = res.data.data
        })
    }
  },
  
  methods: {
    validate (e) {
      e.preventDefault()
      if (this.$refs.form.validate(e)) {
        this.$store.commit('updateAlamat', this.dataAlamat)
        this.$emit('next-step', 4)      
      }
    },
    back () {
      this.$emit('next-step', 2)
    },
  },

  created(){
    getNegara()
      .then(res => {
        this.itemNegara = res.data.data        
        var indonesia = this.itemNegara.find(negara => negara.nama_negara.toLowerCase() === 'indonesia')
        this.dataAlamat.negara = indonesia
        return indonesia
      })
      .then(indonesia => {
        getDaerah(indonesia.id_negara)
          .then(res => {
            this.itemDaerah = res.data.data
          })
      })
  },
}
</script>

