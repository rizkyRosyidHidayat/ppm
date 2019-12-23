<template>
  <ol class="list-group list-group-flush">
    <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(val, index) of penyakit" :key="index">
      <span>
        {{ index+1+'. ' }}
        {{ val.nama_penyakit }}
      </span>
      <div>
        <button type="button" class="close" aria-label="Close" @click="hapus(val.id_penyakit)">
          <span aria-hidden="true">
            <i class="material-icons">delete</i>
          </span>
        </button>
      </div>
    </li>
  </ol>
</template>

<script>
import { mapState } from "vuex";
import { getPenyakitMhs, deletePenyakitMhs } from "@/services";

export default {
  data: () => ({
    // penyakit: [],
  }),

  created () {
    this.$store.dispatch('getPenyakitMhs')
  },

  computed: {
    ...mapState(['penyakit'])
  },

  methods: {
    hapus (id) {
      this.$store.dispatch('deletePenyakitMhs', id)
        .then(res => {
          console.log('berhasil')
        })
    },
  }
}
</script>

<style>

</style>
