<template>
  <b-card class="text-center shadow-sm">
    <template #header>
      <h6 class="mb-0">The number of reviews of a neighbourhood over a year impact
        availability</h6>
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
  name: "Chart4",
  data() {
    return {
      time_edit:0,
      fields: [
        {
          key: 'neighbourhood',
          label: 'neighbourhood',
        },
        {
          key: 'reviews',
          label: 'reviews',
          sortable: true,
        },
        {
          key: 'availability',
          label: 'availability',
          sortable: true,
        }
      ],
      items: [
        // {neighbourhood: 'A', reviews: 150, availability: 310},
        // {neighbourhood: 'B', reviews: 43, availability: 40},
      ],
      bar: {
        legend: {},
        xAxis: {
          type: "value",
          scale: true,
          axisLabel: {
            formatter: "{value}"
          },
          splitLine: {
            show: false
          },
          name: "reviews",
          nameLocation: "middle",
          nameTextStyle: {
            align: "center",
            verticalAlign: "top",
            padding: [10, 10, 10, 10]
          }
        },
        yAxis: {
          type: "value",
          scale: true,
          axisLabel: {
            formatter: "{value}"
          },
          splitLine: {
            show: false
          },
          name: "availability",
          nameLocation: "end",
        },
        dataZoom:[
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 10
          }
        ],
        series: [{
          type: "scatter",
          data: [
            // [150, 310],
            // [43, 40],
          ],
          emphasis: {
            label: {}
          }
        }]
      }
    }
  },
  methods: {
    buildData(response) {
      this.time_edit = response.data['time']
      response.data['chart'].forEach(
          element => {
            var reviews = Math.round(element[1]['reviews'] / element[1]['counts']);
            var availability = Math.round(element[1]['availability'] / element[1]['counts']);
            this.items.push({
                  neighbourhood: element[0],
                  reviews: reviews,
                  availability: availability,
                }
            )
            this.bar.series[0].data.push([reviews,availability])
          }
      )
      // console.log(response.data.length)
    },
  },
  created: function () {
    const _this = this;
    var url = "/chart4";
    this.$axios.get(url).then(_this.buildData);
  }
}
</script>

<style scoped>

</style>