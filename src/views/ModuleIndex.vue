<template>
  <div>
    <SectionMain/>
    <SectionVideoPPM/>
    <SectionKontak/>
    <SectionFooter/>
  </div>
</template>

<script>
import SectionMain from '../components/ModuleIndex/SectionMain'
import SectionAbout from '../components/ModuleIndex/SectionAbout'
import SectionVideoPPM from '../components/ModuleIndex/SectionVideoPPM'
import SectionKontak from '../components/ModuleIndex/SectionKontak'
import SectionFooter from '../components/ModuleIndex/SectionFooter'

export default {
    components: { 
      SectionFooter,
      SectionKontak,
      SectionVideoPPM,
      SectionAbout,
      SectionMain,
    },
}
</script>

<style>

</style>
