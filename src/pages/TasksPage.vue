<template>
  <q-card  class="q-ma-md">
    <q-card-section>
      <div class="text-h6">Tasks</div>
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
  class TasksPage extends Vue {
  }

  export default  TasksPage
</script>

<style></style>
