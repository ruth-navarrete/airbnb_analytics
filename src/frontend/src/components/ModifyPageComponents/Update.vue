<template>
  <div>
    <b-row>
      <b-col>
        <label>Currently Editing Listing ID: {{ ListingId }}</label>
        <b-row>
          <b-col>
            <b-form-input id="input-12" v-model="ListingId" class="mb-2"></b-form-input>
          </b-col>
          <b-col>
            <b-button v-on:click="search">Search</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row v-if="show1">
      <b-col cols="6">
        <b-alert show="show" :variant="state">{{ res }}</b-alert>
      </b-col>
    </b-row>

    <b-form class="mt-4" v-if="show2">
      <b-row>
        <b-col cols="6">
          <b-form-group
              id="input-group-13"
          >
            <label>Current Availability: {{ form.Availability }}</label>
            <b-form-input
                id="input-13"
                v-model="form.Availability"
                required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group id="input-group-14">
            <label>Current Price: {{ form.Price }} $</label>
            <b-form-input
                id="input-14"
                v-model="form.Price"
                required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="text-right">
          <b-button v-on:click="update">Update</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "Update",
  props: ['CurrentDataset'],
  data() {
    return {
      ListingId: null,
      show: false,
      form: {
        Availability: null,
        Price: null
      },
      show1: false,
      show2: false,
      state: 'danger',
      res: 'Not Found'
    }
  },
  methods: {
    search() {
      this.state = "danger";
      this.show1 = false;
      this.show2 = false;
      this.res = "Not Found";
      this.found = false;

      var _this = this;
      if (this.ListingId != null) {
        let url = '/search'

        this.$axios.get(url, {
          params: {
            'id': this.ListingId
          }
        }).then(function (res) {
          console.log(res)
          if (res.data.items.length === 0) {
            _this.show1 = true
          } else {
            _this.form.Availability = res.data.items[0].availability_365;
            _this.form.Price = res.data.items[0].price;
            _this.res = 'Found';
            _this.state = 'success'
            _this.show1 = true
            _this.show2 = true
          }
        })
      }
    },

    update() {
      let url = '/modify'
      const params = new URLSearchParams();
      params.append('id', this.ListingId)
      params.append('availability_365', this.form.Availability);
      params.append('price', this.form.Price);
      this.$axios.put(
          url, params
      ).then(function (response) {
        console.log(response)
        alert("Successfully Updated")
      })
    }
  }


}
</script>

<style scoped>

</style>