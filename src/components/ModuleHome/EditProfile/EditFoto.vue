<template>
  <div class="card mb-4">
    <div class="card-header">
      <div class="h3">
        Ubah foto
      </div>
    </div>
    <div class="card-body">
      <EditFoto/>
    </div>
  </div>
</template>

<script>
import EditFoto from "./EditFoto/Cropper";

export default {
  components: {
    EditFoto,
  },
}
</script>

<style>

</style>
