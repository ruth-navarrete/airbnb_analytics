<template>
  <div>
    <b-navbar class="shadow-sm" id="header" toggleable="sm" variant="faded">
      <b-navbar-brand>Madrid of Spain Airbnb</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav>
          <b-nav-item v-if="index===0" active to="/search">Search</b-nav-item>
          <b-nav-item v-else to="/search">Search</b-nav-item>
          <b-nav-item v-if="index===1" active to="/modify">Modify</b-nav-item>
          <b-nav-item v-else to="/modify">Modify</b-nav-item>
          <b-nav-item v-if="index===2" active to="/chart">Chart</b-nav-item>
          <b-nav-item v-else to="/chart">Chart</b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ['index'],
}
</script>

<style scoped lang="scss">
#header {
  background-color: #e3f2fd;
}
</style>