<template>
  <q-card  class="q-ma-md">
    <q-card-section>
      <div class="text-h6">Projects</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </q-card-section>
  </q-card>
</template>


<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";

  @Component({
    components: {}
  })
  class ProjectsPage extends Vue {
  }

  export default  ProjectsPage
</script>

<style></style>
