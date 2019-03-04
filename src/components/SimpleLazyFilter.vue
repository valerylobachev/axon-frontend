<template>
  <q-input :label="placeholder ? placeholder : $t('axon.shared.filter')"
           :debounce="debounce"
           :value="filter"
           @input="setFilter($event)">
    <template v-slot:append>
      <q-icon name="close" @click="clearFilter()" class="cursor-pointer"/>
      <q-icon name="search" @click="refresh()" class="cursor-pointer"/>
    </template>
  </q-input>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({})
  export default class SimpleLazyFilter extends Vue {
    @Prop(String) placeholder: string;
    @Prop(String) filter: string;
    @Prop({default: 500}) debounce: number;



    setFilter(filter: string) {
        this.find(filter);
    }

    clearFilter() {
      this.find('');
    }

    refresh() {
      this.find(this.filter);
    }

    find(filter: string) {
      this.$emit('filter', filter);

    }
  }
</script>

<style lang="scss">
</style>
