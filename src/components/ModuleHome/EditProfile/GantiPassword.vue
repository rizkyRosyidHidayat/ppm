<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500px"
    >
      <template v-slot:activator="{on}">
        <v-btn
          depressed
          v-on="on"
        >
          ganti password
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Ganti password
        </v-card-title>
        <v-card-text>
          <FormGantiPassword @dialog="hideDialog"/>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
import FormGantiPassword from './GantiPasswordFolder/FormGantiPassword'

export default {
  components: {
    FormGantiPassword,
  },

  data: () => ({
    dialog: false,
  }),

  methods: {
    hideDialog () {
      this.dialog = false
    }
  }
}
</script>

<style>

</style>
