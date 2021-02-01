<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-row>
        <b-col cols="4">
          <b-form-group
              id="input-group-1"
              label="Listing ID"
              label-for="input-1"
          >
            <b-form-input
                id="input-1"
                v-model="form.id"
                required
                placeholder="Enter Listing ID"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group id="input-group-2" label="Listing Name" label-for="input-2">
            <b-form-input
                id="input-2"
                v-model="form.name"
                required
                placeholder="Enter Listing Name"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group id="input-group-3" label="Availability">
            <b-form-input
                id="input-3"
                v-model="form.availability_365"
                type="number"
                required
                placeholder="Enter Availability"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <b-form-group
              id="input-group-4" label="Host ID" label-for="input-4">
            <b-form-input
                id="input-4"
                v-model="form.host_id"
                required
                placeholder="Enter Host ID"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group id="input-group-5" label="Host Name" label-for="input-5">
            <b-form-input
                id="input-5"
                v-model="form.host_name"
                required
                placeholder="Enter Host Name"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group id="input-group-6" label="Price" label-for="input-6">
            <b-form-input
                id="input-6"
                v-model="form.price"
                type="number"
                required
                placeholder="Enter Price"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">
          <b-form-group id="input-group-7" label="Province" label-for="input-7">
            <b-form-input
                id="input-7"
                v-model="form.neighbourhood_group"
                required
                placeholder="Enter Province"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group id="input-group-8" label="Neighborhood" label-for="input-8">
            <b-form-input
                id="input-8"
                v-model="form.neighbourhood"
                required
                placeholder="Enter Neighborhood"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group id="input-group-9" label="Room Type" label-for="input-9">
            <b-form-select
                id="input-9"
                v-model="form.room_type"
                :options="RoomTypes"
                required
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <b-form-group id="input-group-20" label="Number of reviews" label-for="input-20">
            <b-form-input
                id="input-20"
                v-model="form.number_of_reviews"
                required
                placeholder="Number of reviews"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group id="input-group-10" label="Latitude" label-for="input-10">
            <b-form-input
                id="input-10"
                v-model="form.latitude"
                required
                placeholder="Enter Latitude"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group id="input-group-11" label="Longitude" label-for="input-11">
            <b-form-input
                id="input-11"
                v-model="form.longitude"
                required
                placeholder="Enter Longitude"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col offset-md="8" cols="4">
          <b-row>
            <b-col class="text-center ml-1 mr-1">
              <b-button type="reset" variant="danger" style="width: 100%">Reset</b-button>
            </b-col>
            <b-col class="text-center ml-1 mr-1">
              <b-button type="submit" variant="primary" style="width: 100%">Submit</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="mt-3" v-if="res">
        <b-col>
          <b-alert show="show" variant="success">Successfully Created</b-alert>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "Create",
  props: ['CurrentDataset'],
  data() {
    return {
      form: {
        id: null,
        name: null,
        host_name: null,
        host_id: null,
        room_type: null,
        availability_365: null,
        price: null,
        neighbourhood_group: null,
        neighbourhood: null,
        latitude: null,
        longitude: null,
        number_of_reviews:null,
      },
      RoomTypes: [{text: 'Select One', value: null}, 'Entire home/apt', 'Private room','Hotel room'],
      show: true,
      res: false
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      var url = '/modify';
      const params = new URLSearchParams();
      for (var i in this.form) {
        params.append(i, this.form[i])
      }
      var _this = this;
      this.$axios.post(url, params).then(function (response) {
        console.log(response);
        if (response.status === 200) {
          _this.res = true;
        }
      })
    },
    onReset(evt) {
      this.res = false;
      evt.preventDefault()
      // Reset our form values
      // this.form.ListingId = ''
      // this.form.ListingName = ''
      // this.form.HostName = ''
      // this.form.HostId = ''
      // this.form.RoomType = null
      // this.form.Availability = null
      // this.form.Price = null
      // this.form.Province = ''
      // this.form.Neighbourhood = ''
      // this.form.Latitude = ''
      // this.form.Longitude = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>

</style>