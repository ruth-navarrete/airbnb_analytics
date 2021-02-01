<template>
  <b-card class="text-center shadow-sm">
    <template #header>
      <h6 class="mb-0">Number of listing over a province</h6>
    </template>
    <b-card-text>
      <b-row>
        <b-col cols="6">
          <b-table sticky-header="sticky-header" :items="items" :fields="fields" head-variant="light"></b-table>
          <h5>
            <b-badge  variant="light">Time Costs: {{time_edit}}ms</b-badge>
          </h5>        </b-col>
        <b-col cols="6">
          <v-chart class="myChart" :options="bar"/>
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>
// Number of listing over a province
export default {
  name: "Chart1",
  data() {
    return {
      time_edit:0,
      fields: [
        {
          key: 'name',
          label: 'Province'
        },
        {
          key: 'value',
          label: 'Number of Listings',
          sortable: true
        }
      ],
      items: [
        // {name: 'A', value: 12},
        // {name: 'B', value: 45},
        // {name: 'C', value: 23},
      ],
      bar: {
        renderer:'svg',
        legend: {
          type:'scroll',
          data: [
              // 'A', 'B', 'C'
          ]
        },
        series: {
          type: 'pie',
          radius: '55%',
          data: [
            // {value: 12, name: 'A'},
            // {value: 45, name: 'B'},
            // {value: 23, name: 'C'},
          ],
        },
      },
    }
  },
  methods: {
    buildData(response) {
      // response.data = response.data['chart'].slice(0, 15)
      this.time_edit=response.data['time']
      response.data['chart'].slice(0, 15).forEach(
          element => {
            this.items.push({
              name: element.neighbourhood_group,
              value: element.num,
            });
            this.bar.series.data = this.items;
            this.bar.legend.data.push(element.neighbourhood_group)
          }
      )
    }
  },
  created: function () {
    const _this = this;
    var url = "/provincelistings";
    this.$axios.get(url).then(_this.buildData);
  },
}
</script>

<style scoped lang="scss">
.myChart {
  width: 100%;
}
</style>