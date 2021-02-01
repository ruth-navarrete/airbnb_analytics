<template>
  <b-container>
    <Header :index="index"/>
    <ModifyMain/>
  </b-container>
</template>

<script>
import Header from "@/components/Header";
import ModifyMain from "@/components/ModifyPageComponents/ModifyMain";

export default {
  name: "Modify",
  components: {ModifyMain, Header},
  data() {
    return {
      index: 1
    }
  }
}
</script>

<style scoped>

</style>