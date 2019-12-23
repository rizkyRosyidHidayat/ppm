<template>
  <v-card>
    <v-card-title>
      <span class="headline">Tambah Prestasi</span>
    </v-card-title>
    <v-form
      ref="form"
      lazy-validation
    >
      <v-card-text>
        <v-text-field
          v-model="prestasi.nama_prestasi"
          label="Nama prestasi"
          required
          :rules="requiredRule"
        ></v-text-field>
        <v-select
          v-model="prestasi.cak_prestasi"
          :items="cakPrestasi"
          item-text="cak_prestasi"
          item-value="cak_prestasi"
          :rules="requiredRule"
          label="Tingkat"
          required
        ></v-select>
        <v-select
          v-model="prestasi.id_bid_prestasi"
          :items="itemBidang"
          item-text="nama_bid"
          item-value="id_bid_prestasi"
          :rules="requiredRule"
          label="Bidang"
          required
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          flat
          @click="close"
        >
          Kembali
        </v-btn>
        <v-btn
          color="primary"
          flat
          @click="validate"
          type="submit"
        >
          Simpan
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { postPrestasi } from '@/services'

export default {
  data: () => ({
    itemBidang: [
      {id_bid_prestasi: 1, nama_bid: 'Teknologi Informasi'},
      {id_bid_prestasi: 3, nama_bid: 'Seni'},
      {id_bid_prestasi: 4, nama_bid: 'Karya Ilmiah'},
      {id_bid_prestasi: 2, nama_bid: 'Olahraga'},
      {id_bid_prestasi: 5, nama_bid: 'Ekstrakulikuler'},
    ],
    cakPrestasi: [
      {id: 1, cak_prestasi: 'Internasional'},
      {id: 2, cak_prestasi: 'Nasional'},
      {id: 3, cak_prestasi: 'Region'},
      {id: 4, cak_prestasi: 'Lokal'},
    ],
    prestasi: { 
      npm: '',       
      nama_prestasi: '',
      cak_prestasi: '',
      id_bid_prestasi: 0,
    },
    requiredRule: [
      v => !!v || 'Harus diisi ya :)'
    ],
  }),

  computed: {
    dataMhs () {
      return this.$store.getters.getDataMhs
    }
  },

  methods: {
    close () {
      this.$emit('close', false)
    },

    validate (e) {
      e.preventDefault()
      if (this.$refs.form.validate(e)) {
        this.prestasi.npm = this.dataMhs.npm 
        this.$store.dispatch('postPrestasi', this.prestasi).then(res => {
          console.log('berhasil')
          this.close()
        })
      }        
    },
  },
}
</script>

<style>

</style>
