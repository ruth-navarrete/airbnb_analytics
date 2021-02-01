<template>
  <div>
    <b-container>
      <Header :index="index"/>
      <div class="mb-4">
        <Chart1 class="mt-4"/>
        <Chart2 class="mt-4"/>
        <Chart3 class="mt-4"/>
        <Chart4 class="mt-4"/>
        <Chart5 class="mt-4"/>
        <Chart6 class="mt-4"/>
      </div>
    </b-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Chart1 from "@/components/ChartPageComponents/Chart1";
import Chart2 from "@/components/ChartPageComponents/Chart2";
import Chart3 from "@/components/ChartPageComponents/Chart3";
import Chart4 from "@/components/ChartPageComponents/Chart4";
import Chart5 from "@/components/ChartPageComponents/Chart5";
import Chart6 from "@/components/ChartPageComponents/Chart6";

export default {
  name: "Chart",
  components: {Chart6, Chart5, Chart4, Chart3, Chart2, Chart1, Header},
  data() {
    return {
      index: 2
    }
  }
}
</script>

<style scoped>
</style>