<template>
  <div>
    <b-row>
      <b-col class="text-center">
        <b-button variant="success" v-on:click="backup">Back Up</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "BackUp",
  props: ['CurrentDataset'],
  methods: {
    backup() {
      var url = '/backup'
      this.$axios.get(url).then(function (response) {
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>

</style>