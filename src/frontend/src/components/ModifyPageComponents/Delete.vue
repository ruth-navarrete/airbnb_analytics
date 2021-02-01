<template>
  <div>
    <b-row>
      <b-col>
        <label>Listing ID To Delete: {{ ListingId }}</label>
        <b-row>
          <b-col>
            <b-form-input id="input-16" v-model="ListingId" class="mb-2"></b-form-input>
          </b-col>
          <b-col>
            <b-button v-on:click="search">Search</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row v-if="show">
      <b-col>
        <b-alert show="show" :variant="state">{{ res }}</b-alert>
      </b-col>
      <b-col>
        <b-button v-if="found" variant="danger" class="mt-2" v-on:click="deleteById">Delete</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Delete",
  props: ['CurrentDataset'],
  data() {
    return {
      ListingId: null,
      show: false,
      state: "danger",
      res: "Not Found",
      found: false
    }
  },
  methods: {
    search() {
      this.state = "danger";
      this.show = false;
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
            _this.show = true
          } else {
            _this.res = 'Found';
            _this.state = 'success'
            _this.found = true
            _this.show = true
          }
        })
      }
    },
    deleteById() {
      let url = 'modify';
      this.$axios.delete(url, {
        params: {
          'id': this.ListingId
        }
      }).then(
          function (response) {
            if (response.status === 200) {
              alert("Successfully Deleted")
            }
          }
      )
    }
  }
}
</script>

<style scoped>

</style>