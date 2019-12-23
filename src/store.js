import Vue from 'vue'
import Vuex from 'vuex'
import { 
  editMhs,
  getPrestasi, postPrestasi, deletePrestasi,
  postKeluarga, getKeluarga, deleteKeluarga,
  postPenyakit, getPenyakitMhs, deletePenyakitMhs,
} from '@/services'

Vue.use(Vuex)

const dataMahasiswa = {
  npm: '',
  password: '',
  email: '',
  hp: '',
  nama: '',
  foto: '',
  jk: '',
  id_agama: '',
  tgl_lahir: '',
  tempat_lahir: '',
  slta_asal: '',
  alamat_asal: '',
  rw: '',
  rt: '',
  kecamatan: '',
  kode_pos: '',
  id_daerah: '',
  id_negara: '',
  id_kab: '',
  alamat_yk: '',
}

export default new Vuex.Store({
  state: {
    peserta: {
      ...dataMahasiswa
    },
    prestasi: [],
    penyakit: [],
    mhs: Object.assign({}, dataMahasiswa),
    selectedNegara: {},
    selectedDaerah: {},
    selectedKabupaten: {},
    keluarga: [],
  },

  getters: {
    getDataPeserta (state) {
      return {
        ...state.peserta,
        ...state.selectedNegara,
        ...state.selectedDaerah,
        ...state.selectedKabupaten
      }
    },
    getDataPrestasi (state) {
      return state.prestasi
    },
    getDataPenyakit (state) {
      return state.penyakit
    },
    getDataMhs (state) {
      return state.mhs
    },
  },

  mutations: {    
    updateAkun(state, payload){
      state.peserta.npm = payload.npm
      state.peserta.password = payload.password
      state.peserta.email = payload.email
      state.peserta.hp = payload.hp
    },
    updatePribadi(state, payload){      
      state.peserta.nama = payload.nama
      state.peserta.jk = payload.jk
      state.peserta.id_agama = payload.id_agama
      state.peserta.tgl_lahir = payload.tgl_lahir
      state.peserta.tempat_lahir = payload.tempat_lahir
      state.peserta.slta_asal = payload.slta_asal
    },
    updateAlamat(state, payload){
      state.peserta.alamat_asal = payload.alamat_asal
      state.peserta.rw = payload.rw
      state.peserta.rt = payload.rt
      state.peserta.kecamatan = payload.kecamatan
      state.peserta.kode_pos = payload.kode_pos
      state.peserta.id_daerah = payload.daerah.id_daerah
      state.peserta.id_negara = payload.negara.id_negara
      state.peserta.id_kab = payload.kabupaten.id_kab
      state.peserta.alamat_yk = payload.alamat_yk

      state.selectedNegara = payload.negara
      state.selectedDaerah = payload.daerah
      state.selectedKabupaten = payload.kabupaten

    },

    updateFoto (state, payload) {
      state.peserta.foto = payload
    },

    updatePrestasi(state, payload){
      state.prestasi = payload
    },
    updatePenyakit(state, payload){
      state.penyakit = payload
    },
    
    updateMhs (state, payload) {
      state.mhs = payload
    },
    updateAkunMhs (state, payload) {
      state.mhs.npm = payload.npm
      state.mhs.email = payload.email
      state.mhs.hp = payload.hp
    },    
    updatePribadiMhs(state, payload){      
      state.mhs.nama = payload.nama
      state.mhs.jk = payload.jk
      state.mhs.id_agama = payload.id_agama
      state.mhs.tgl_lahir = payload.tgl_lahir
      state.mhs.tempat_lahir = payload.tempat_lahir
      state.mhs.slta_asal = payload.slta_asal
    },
    updateAlamatMhs(state, payload){
      state.mhs.alamat_asal = payload.alamat_asal
      state.mhs.rw = payload.rw
      state.mhs.rt = payload.rt
      state.mhs.kecamatan = payload.kecamatan
      state.mhs.kode_pos = payload.kode_pos
      state.mhs.id_daerah = payload.id_daerah
      state.mhs.id_negara = payload.id_negara
      state.mhs.id_kab = payload.id_kab
      state.mhs.alamat_yk = payload.alamat_yk
    },

    updateKeluarga (state, payload) {
      state.keluarga = payload
    },

    updatePenyakit (state, payload) {
      state.penyakit = payload
    },
  },

  actions: {
    // mahasiswa
    editMhs (context, update, payload) {
      context.commit(update, payload)
      var data = context.getters.getDataMhs
      return editMhs (context.state.mhs.npm, data)
        .then(res => {
          return res
        })
    },

    // prestasi
    getPrestasi (context) {
      getPrestasi(context.state.mhs.npm)
        .then(res => {
          context.commit('updatePrestasi', res.data.data)
        })
    },

    postPrestasi (context, payload) {
      return postPrestasi(payload)
        .then(res => {
          res = context.dispatch('getPrestasi')
          return res
        })  
    },

    deletePrestasi(context, payload) {
      deletePrestasi(payload)
        .then(res => {
          var prestasi = context.state.prestasi.filter(function (val) {
            return val.id_prestasi !== payload
          })
          context.commit('updatePrestasi', prestasi)
        })
    },

    // keluarga
    postKeluarga (context, payload) {
      return postKeluarga(payload)
        .then(res => {
          const keluarga = [...context.state.keluarga, payload]
          context.commit('updateKeluarga', keluarga)
          return res
        })
    },

    getKeluarga (context) {
      getKeluarga(context.state.mhs.npm)
        .then(res => {
          context.commit('updateKeluarga', res.data.data)
        })
    },

    deleteKeluarga (context) {
      deleteKeluarga(context.state.keluarga[0].id_kel)
        .then(res => {
          context.commit('updateKeluarga', [])
        })
    },

    // penyakit
    getPenyakitMhs (context) {
      getPenyakitMhs (context.state.mhs.npm)
        .then(res => {
          context.commit('updatePenyakit', res.data.data.penyakit)
        })
    },

    postPenyakit (context, payload) {
      return postPenyakit(payload)
        .then(res => {
          this.res = context.dispatch('getPenyakitMhs')
          return res
        })
    },

    deletePenyakitMhs (context, payload) {
      deletePenyakitMhs (payload)
        .then(res => {
          var data = context.state.penyakit.filter(function (val) {
            return val.id_penyakit !== payload
          })
          context.commit('updatePenyakit', data)
          return res
        })
    },
  }
})

