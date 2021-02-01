<template>
  <div>
    <b-card class="mt-4 shadow">
      <template #header>
        <h6 class="mb-0">Search Options</h6>
      </template>
      <b-card-body>
        <b-form @submit="onSubmit">
          <b-row>
            <b-col v-for="(value, name) in status">
              <b-form-checkbox
                  v-model=status[name]
                  name=name
              >
                {{ name }}
              </b-form-checkbox>
            </b-col>

          </b-row>
          <b-row>
            <b-col cols="6" class="mt-2" v-show="status.Price">
              <b-input-group prepend="Price">
                <b-form-input v-model="form.price_min" placeholder="min price" type="number"></b-form-input>
                <b-form-input v-model="form.price_max" placeholder="max price" type="number"></b-form-input>
              </b-input-group>
            </b-col>

            <b-col cols="6" class="mt-2" v-show="status.RoomType">
              <b-input-group prepend="Room Type">
                <b-form-input v-model="form.room_type"></b-form-input>
              </b-input-group>
            </b-col>

            <b-col cols="6" class="mt-2" v-show="status.Province">
              <b-input-group prepend="Province">
                <b-form-input v-model="form.neighbourhood_group"></b-form-input>
              </b-input-group>
            </b-col>

            <b-col cols="6" class="mt-2" v-show="status.Neighbourhood">
              <b-input-group prepend="Neighborhood">
                <b-form-input v-model="form.neighbourhood"></b-form-input>
              </b-input-group>
            </b-col>

            <b-col cols="6" class="mt-2" v-show="status.ListingName">
              <b-input-group prepend="Listing Name">
                <b-form-input v-model="form.name"></b-form-input>
              </b-input-group>
            </b-col>

            <b-col cols="6" class="mt-2" v-show="status.Availability">
              <b-input-group append="Availability">
                <b-input-group-prepend is-text>
                  <input type="checkbox" aria-label="Checkbox for following text input" v-model="form.Availability">
                </b-input-group-prepend>
              </b-input-group>
            </b-col>
          </b-row>

          <b-row class="mt-2">
            <b-col cols="3" offset-md="9" style="text-align: right">
              <b-button type="submit" style="background-color: #e85959; border: #f4cccc">Search</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>

import Msg from "@/assets/js/msg.js"

export default {
  name: "SearchForm",
  data() {
    return {
      form: {
        price_min: null,
        price_max: null,
        neighbourhood_group: null,
        neighbourhood: null,
        room_type: null,
        name: null,
        Availability: false,
      },
      status: {
        Price: true,
        RoomType: false,
        Province: false,
        Neighbourhood: false,
        ListingName: false,
        Availability: false
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (!this.status["Price"]) {
        this.$set(this.form, 'price_min', null)
        this.$set(this.form, 'price_max', null)
      }
      if (!this.status["RoomType"]) {
        this.$set(this.form, 'room_type', null)
      }
      if (!this.status["Province"]) {
        this.$set(this.form, 'neighbourhood_group', null)
      }
      if (!this.status["Neighbourhood"]) {
        this.$set(this.form, 'neighbourhood', null)
      }
      if (!this.status["ListingName"]) {
        this.$set(this.form, 'name', null)
      }
      Msg.$emit("search", this.form)
    },

  }
}
</script>

<style scoped lang="scss">

</style>