<template>
  <b-card class="text-center shadow-sm">
    <template #header>
      <h6 class="mb-0">Each host earn from a year of rent</h6>
    </template>
    <b-card-text>
      <b-row>
        <b-col cols="6">
          <b-table sticky-header="sticky-header" :items="items" :fields="fields" head-variant="light"></b-table>
          <h5>
            <b-badge  variant="light">Time Costs: {{time_edit}}ms</b-badge>
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
  name: "Chart5",
  data() {
    return {
      time_edit:0,
      fields: [
        {
          key: 'host_id',
          label: 'host id',
        },
        {
          key: 'num_of_listings',
          label: 'num of listings',
          // sortable: true,
        },
        {
          key: 'Total_earned',
          label: 'Total earned',
          // sortable: true,
        }
      ],
      items: [
        // {'host_id': '8556845', 'num_of_listings': 2, 'Total_earned': 177777},
        // {'host_id': '5467535', 'num_of_listings': 4, 'Total_earned': 7456346},
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
            end: 50
          }
        ],
        xAxis: {
          data: [
            // 2, 4
          ]
        },
        yAxis: {
          type: "value",
          scale: true,
          axisLabel: {
            formatter: "$ {value}"
          },
          splitLine: {
            show: false
          }
        },
        series: [{
          type: "bar",
          data: [
            // 177777, 7456346
          ]
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
                  host_id: element[0],
                  num_of_listings: element[1]['listing_ids'],
                  Total_earned: element[1]['total_earned']
                }
            );
            this.bar.xAxis.data.push(element[0])
            this.bar.series[0].data.push(element[1]['total_earned'])
          }
      )
      // console.log(response.data.length)
    },
  },
  created: function () {
    const _this = this;
    var url = "/chart5";
    this.$axios.get(url).then(_this.buildData);
  }
}
</script>

<style scoped>

</style>