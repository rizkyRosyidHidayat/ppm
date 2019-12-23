<template>
  <div>
    <CetakSertifikat/>
    <JadwalPPM/>
    <Berita/>
  </div>
</template>

<script>
import CetakSertifikat from './Dashboard/CetakSertifikat';
import Berita from './Dashboard/Berita';
import JadwalPPM from './Dashboard/JadwalPPM';

export default {
  components: {
    JadwalPPM,
    Berita,
    CetakSertifikat,
  }
}
</script>

<style>
  @media (min-width: 992px) {
    .mobile-header {
      display: none!important;
    }
  }
</style>
