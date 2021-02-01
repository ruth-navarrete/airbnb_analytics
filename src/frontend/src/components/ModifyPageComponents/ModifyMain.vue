<template>
  <div>
    <div class="mt-4">
      <b-input-group prepend="Current Dataset" class="mt-3 shadow-sm">
        <b-form-input
            readonly
            v-model="CurrentDataset"
        ></b-form-input>
      </b-input-group>
    </div>
    <b-card no-body class="mt-4 shadow">
      <b-tabs card>
        <b-tab title="Create" active>
          <Create :CurrentDataset="CurrentDataset"/>
        </b-tab>
        <b-tab title="Update">
          <Update :CurrentDataset="CurrentDataset"/>
        </b-tab>
        <b-tab title="Delete">
          <Delete :CurrentDataset="CurrentDataset"/>
        </b-tab>
        <b-tab title="Import">
          <Import :CurrentDataset="CurrentDataset"/>
        </b-tab>
        <b-tab title="Back up">
          <BackUp :current-dataset="CurrentDataset"/>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import Create from "@/components/ModifyPageComponents/Create";
import Update from "@/components/ModifyPageComponents/Update";
import Delete from "@/components/ModifyPageComponents/Delete";
import Import from "@/components/ModifyPageComponents/Import";
import BackUp from "@/components/ModifyPageComponents/BackUp";
import Msg from "@/assets/js/msg.js";

export default {
  name: "ModifyMain",
  components: {BackUp, Import, Delete, Update, Create},
  data() {
    return {
      CurrentDataset: 'DataSet1.csv',
      CurrentDatasetOption: ['DataSet1.csv', 'DataSet2.csv']
    }
  },
  methods: {
    getDataset() {
      var url = "/datasets";
      var _this = this;
      this.$axios.get(url).then(function (response) {
        console.log(response.data)
        _this.CurrentDatasetOption = response.data.files
        _this.CurrentDataset = _this.CurrentDatasetOption[response.data.curr_index]
      })
    }
  },
  created: function () {
    this.getDataset()
  },
  mounted() {
    let _this = this;
    Msg.$on("upload", m => {
      _this.CurrentDataset = m
    })
  }
}
</script>

<style scoped>

</style>
