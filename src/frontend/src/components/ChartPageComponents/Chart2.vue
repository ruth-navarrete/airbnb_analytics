<template>
  <b-card class="text-center shadow-sm">
    <template #header>
      <h6 class="mb-0">Impact of a neighborhood on price and availability</h6>
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
          <v-chart class="myChart" :options="bar"/>
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "Chart2",
  data() {
    return {
      time_edit: 0,
      type_x: 'neighbourhood',
      fields: [
        {
          key: 'Neighborhood',
        },
        {
          key: 'avg_day',
          label: 'Avg non available days',
          sortable: true,
        },
        {
          key: 'avg_price',
          label: 'Avg Price',
          sortable: true,
        }
      ],
      items: [
        // {Neighborhood: 'A', avg_day: 354, avg_price: 12},
        // {Neighborhood: 'B', avg_day: 55, avg_price: 45},
        // {Neighborhood: 'C', avg_day: 200, avg_price: 23},
      ],
      bar: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Avg non available days', 'Avg Price'],
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            data: [
              // 'A', 'B', 'C'
            ]
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 1,
            end: 3
          }
        ],
        series: [
          {
            name: 'Avg non available days',
            type: 'bar',
            barGap: 0,
            data: []
          },
          {
            name: 'Avg Price',
            type: 'bar',
            barGap: 0,
            data: []
          }
        ]
      }
    }
  },
  methods: {
    buildData(response) {
      this.time_edit = response.data['time']
      response.data['chart'].forEach(
          element => {
            var avg_day = Math.round(element[1]['days'] / element[1]['counts']);
            var avg_price = Math.round(element[1]['price'] / element[1]['counts'])
            this.items.push(
                {
                  Neighborhood: element[0],
                  avg_day: avg_day,
                  avg_price: avg_price,
                }
            );
            this.bar.xAxis[0].data.push(element[0])
            this.bar.series[0].data.push(avg_day)
            this.bar.series[1].data.push(avg_price)

          }
      )
    }
  },
  created: function () {
    const _this = this;
    var url = "/priceavailability";
    this.$axios.get(url, {
      params: {
        name: this.type_x
      }
    }).then(_this.buildData);
  },
}
</script>

<style scoped lang="scss">
.myChart {
  width: 100%;
}
</style>