<template>
  <b-card class="text-center shadow-sm">
    <template #header>
      <h6 class="mb-0">The average earning of hosts in a province</h6>
    </template>
    <b-card-text>
      <b-row>
        <b-col cols="6">
          <b-table sticky-header="sticky-header" :items="items" :fields="fields" head-variant="light"></b-table>
          <h5>
            <b-badge variant="light">Time Costs: {{ time_edit }}ms</b-badge>
          </h5>
        </b-col>
        <b-col cols="6">
          <v-chart class="myChart" style="width: 100%" :options="bar"/>
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "Chart6",
  data() {
    return {
      time_edit: 0,
      fields: [
        {
          key: 'Province',
          label: 'Province',
        },
        {
          key: 'Rate',
          label: 'Rate',
          sortable: true,
        },
      ],
      items: [
        // {'Province': 'A', 'Rate': 17747},
        // {'Province': 'B', 'Rate': 45345},
        // {'Province': 'C', 'Rate': 4444},
        // {'Province': 'D', 'Rate': 45454},
      ],
      bar: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          containLabel: true
        },
        legend: {},
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 50,
          }
        ],
        xAxis: {
          data: [
            // 'A', 'B', 'C', 'D'
          ]
        },
        yAxis: {
          type: "value",
          scale: true,
          axisLabel: {
            formatter: "{value}"
          },
          splitLine: {
            show: false
          }
        },
        series: [{
          type: "bar",
          data: [
            // 17747, 45345, 4444, 45454
          ],
        }]
      }
    }
  },
  methods: {
    buildData(response) {
      this.time_edit = response.data['time']
      response.data['chart'].forEach(
          element => {
            this.items.push(
                {
                  Province: element['neighbourhood_group'],
                  Rate: element['rate']
                }
            );
            this.bar.xAxis.data.push(element['neighbourhood_group'])
            this.bar.series[0].data.push(element['rate'])
          }
      )
      // console.log(response.data.length)
    },
  },
  created: function () {
    const _this = this;
    var url = "/chart6";
    this.$axios.get(url).then(_this.buildData);
  }
}
</script>

<style scoped>

</style>