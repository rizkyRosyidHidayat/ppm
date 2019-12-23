<template>
  <div>
    <AkunPPM/>
    <EditFoto/>
    <DataPribadi/>
    <Alamat/>
  </div>
</template>

<script>
import AkunPPM from './EditProfile/AkunPPM'
import DataPribadi from './EditProfile/DataPribadi'
import Alamat from './EditProfile/Alamat'
import EditFoto from './EditProfile/EditFoto'

export default {
  components: {
    Alamat,
    DataPribadi,
    AkunPPM,
    EditFoto,
  },
}
</script>

<style>

</style>
