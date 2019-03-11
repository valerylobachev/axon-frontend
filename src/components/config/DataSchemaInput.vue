<template>
  <div>
    <q-select
      v-model="model"
      hide-dropdown-icon
      :label="label"
      :options="options"
      :readonly="readonly"
      option-value="key"
      :option-label="(item) => `${item.key} - ${item.name}`"
      :display-value="`${model.key} ${model.name ? '- ' + model.name : ''}`"
      @click.native="select()">

      <template v-slot:append>
        <q-icon name="search" @click.stop="select()" class="cursor-pointer" />
      </template>
    </q-select>
    <data-schema-select-dialog ref="dataSchemaSelectDialog"></data-schema-select-dialog>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import DataSchemaSelectDialog from './DataSchemaSelectDialog.vue';
  import {DataSchemaDetail, DataSchemaSummary} from '../../store/data-schema/model';
  import dataSchemaBackendService from '../../store/data-schema/backend.service';


  @Component({
    components: {
      DataSchemaSelectDialog,
    },
  })
  export default class DataSchemaInput extends Vue {
    @Prop(String) label: string;
    @Prop(String) value: string;
    @Prop(Object) detail: DataSchemaDetail;
    @Prop(Boolean) readonly: boolean;

    options: DataSchemaSummary[] = []
    det: DataSchemaDetail = {
      key: '',
      name: ''
    }

    get model() {
      console.log('get model')
      return this.det
    }

    set model(newVal) {
      console.log('model')
      console.log(newVal)
      this.det = newVal
      this.$emit('input', this.det.key)
    }

    @Watch('value', {immediate: true, deep: true})
    onValueChanged(newVal: string, oldVal: string) {
      console.log('onValueChanged')
      if (newVal !== this.model.key) {
        this.model = {
          key: newVal,
          name: ''
        };
      }
    }

    @Watch('detail', {immediate: true, deep: true})
    onDetailChanged(newVal) {
      console.log('onDetailChanged')
      if (newVal && (newVal.key !== this.model.key || newVal.name !== this.model.name) ) {
        this.model = newVal
      }
    }

    select() {
      (this.$refs.dataSchemaSelectDialog as DataSchemaSelectDialog).select().then(res => {
        this.model = res
        this.$emit('input', res.key);
        this.$emit('detailChanged', res);
      });
    }

  }
</script>

<style lang="scss">
</style>
