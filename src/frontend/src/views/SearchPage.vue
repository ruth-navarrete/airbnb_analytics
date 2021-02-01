<template>
  <div>
    <b-container>
      <Header :index="index"/>
      <SearchForm/>
      <Result/>
    </b-container>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchPageComponents/SearchForm";
import Result from "@/components/SearchPageComponents/Result";
import Header from "@/components/Header";

export default {
  name: "SearchPage",
  components: {Header, Result, SearchForm},
  data(){
    return{
      index: 0,
    }
  }
}
</script>

<style scoped>

</style>