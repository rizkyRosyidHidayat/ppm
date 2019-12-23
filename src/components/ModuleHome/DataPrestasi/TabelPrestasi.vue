<template>
  <div class="card">
    <div class="card-header">
      <div class="h3">Prestasi</div>
    </div>
    <div class="card-body">   
      <div class="alert alert-info">
        Jika mempunyai pengalaman ikut lomba 
        walaupun menang atau tidak silahkan di isi, 
        jika tidak ada dikosongin tidak apa-apa
      </div>   
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{on}">
            <v-btn
              color="primary"
              dark
              v-on="on"
            >
              Tambah Prestasi
            </v-btn>
          </template>
          <!-- tampil tambah prestasi -->
          <FormTambahPrestasi @close="close"/>
        </v-dialog>
      </v-toolbar>
      <!-- tabel -->
      <v-data-table
        :headers="headers"
        :items="prestasi"
        hide-actions
      >
        <template v-slot:items="props">
          <td>{{props.item.nama_prestasi}}</td>
          <td>{{props.item.cak_prestasi}}</td>
          <td>{{props.item.nama_bid}}</td>
          <td>
            <!-- <v-icon
              small
              @click="editItem(props.item)"
              class="mr-2"
            >
              edit
            </v-icon> -->
            <v-icon
              small
              @click="deleteItem(props.item.id_prestasi)"
            >
              delete
            </v-icon>
          </td>
        </template>
        <template v-slot:no-data>
          <p class="h6">
            Data kosong
          </p>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import FormTambahPrestasi from './FormTambahPrestasi'
  import {getPrestasi, deletePrestasi} from '@/services'

  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: 'Nama', value: 'nama_prestasi', sortable: false },
        { text: 'Tingkat', value: 'cak_prestasi', sortable: false },
        { text: 'Bidang', value: 'nama_bid', sortable: false },
        { text: 'Actions', value: 'nama_prestasi', sortable: false }
      ]
    }),

    components: {
      FormTambahPrestasi,
    },

    created () {
      this.$store.dispatch('getPrestasi')
    },

    computed: {
      ...mapState(['prestasi'])
    },

    watch: {
      dialog (val) {
        val || this.close(false)
      }
    },

    methods: {
      close (e) {
        this.dialog = e
      },

      deleteItem (id){
        this.$store.dispatch('deletePrestasi', id)
      },
    }
  }
</script>