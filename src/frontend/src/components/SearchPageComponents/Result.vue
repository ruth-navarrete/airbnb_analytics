<template>
  <div v-show="show">
    <b-card class="mt-4 shadow">
      <b-card-body>
        <b-row>
          <b-table :fields="fields" :items="items" outlined></b-table>
        </b-row>
        <b-row>
          <b-col cols="6" style="text-align: right">
            <b-button style="width: 50%;" v-show="p_show" v-on:click="search(-1)">Previous 15 result</b-button>
          </b-col>
          <b-col cols="6">
            <b-button style="width: 50%" v-show="n_show" v-on:click="search(1)">Next 15 result</b-button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import Msg from "@/assets/js/msg.js"

export default {
  name: "Result",

  data() {
    return {
      current_page: 0,
      show: false,
      p_show: false,
      n_show: true,
      fields: [
        {
          key: 'name',
          sortable: false,
          label: 'Listing Name',

        },
        {
          key: 'price',
          sortable: true,
          label: 'Price'
        },
        {
          key: 'neighbourhood_group',
          label: 'Province',
          sortable: false
        },
        {
          key: 'neighbourhood',
          label: 'Neighbourhood',
          sortable: false
        },
        {
          key: 'room_type',
          label: 'Room Type',
          sortable: false
        }
      ],
      items: [],
      form: null
    }
  },

  methods: {
    search(pk) {
      var _this = this;
      this.current_page += pk;
      this.form['pk'] = this.current_page
      var url='/search'
      this.$axios.get(url, {
        params: this.form
      }).then(
          function (res) {
            console.log(res);
            _this.items = res.data.items;
            _this.p_show = res.data.has_previous;
            _this.n_show = res.data.has_next;
            _this.show = true;
          }
      )
    }
  },

  mounted: function () {
    let _this = this;
    Msg.$on('search', function (m) {
      _this.form = m;
      console.log(_this.form)
      _this.current_page = 0;
      _this.search(0);
    })
  }
}

</script>

<style scoped>

</style>