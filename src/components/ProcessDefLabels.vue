<template>
  <div class="row">
    <router-link class="process-definition"
                 v-for="pd in processDefinitionsLabels()"
                 :to="{name: 'ProcessDefinitions', query: {key: pd}}"
                 :key="pd">
      <q-chip  dense square color="primary" text-color="white">
        {{ pd }}
      </q-chip>
    </router-link>
  </div>

</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({})
  export default class ProcessDefLabels extends Vue {
    @Prop(String) value: string

    processDefinitionsLabels() {
      if (this.value && this.value.length > 0) {
        return this.value.split(' ');
      } else {
        return [];
      }
    }
  }
</script>

<style>
  a.process-definition {
    color: #FFFFFF;
    text-decoration: none;
  }
</style>
