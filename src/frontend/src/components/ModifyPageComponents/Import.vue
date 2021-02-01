<template>
  <div>
    <b-row>
      <b-col cols="6">
        <b-form-select v-model="file" :options="options"></b-form-select>
      </b-col>
      <b-col cols="6" class="text-center">
        <b-button v-on:click="upload" variant="success">Upload</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p class="mt-2">Selected file value: <b>{{ file }}</b></p>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import Msg from "@/assets/js/msg.js"

export default {
  name: "Import",
  props: ['CurrentDataset'],
  data() {
    return {
      file: null,
      options: []
    }
  },
  methods: {
    upload() {
      var _this = this
      var url = "/loaddataset"
      this.$axios.get(url, {
        params: {
          'dataset': _this.file
        }
      }).then(function (response) {
        Msg.$emit("upload",_this.file)
        console.log(response.data)
      })
    }
  },
  created() {
    var _this = this;
    var url = "datasets";
    this.$axios.get(url).then(function (response) {
      console.log(response.data)
      _this.options = response.data.files
      _this.file = _this.options[response.data.curr_index]
    })
  }
}
</script>

<style scoped>

</style>
