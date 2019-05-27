<template>
  <div>

    <div class="row q-gutter-md">
      <div class="col">
        <q-select options-dense options-cover
                  v-model="typeModel"
                  :readonly="readonly"
                  :options="options"
                  :label="label"></q-select>
      </div>
      <div class="col" v-if="datatype.type === 'array'">
        <q-select options-dense options-cover
                  v-model="elementTypeModel"
                  :readonly="readonly"
                  :options="elementTypeOptions"
                  :label="$t('axon.knowledge.md.datatype.element')"></q-select>
      </div>
      <div class="col" v-if="datatype.type === 'record'">
        <data-schema-input :label="$t('axon.knowledge.md.datatype.record')"
                           :readonly="readonly"
                           v-model="datatype.key"></data-schema-input>
      </div>
      <div class="col" v-if="datatype.type === 'array' && datatype.element.type === 'record'">
        <data-schema-input :label="$t('axon.knowledge.md.datatype.record')"
                           :readonly="readonly"
                           v-model="datatype.element.key"></data-schema-input>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import DataSchemaSelectDialog from './DataSchemaSelectDialog.vue';
  import {DataSchemaSummary, Datatype} from '../../store/data-schema/model';
  import DataSchemaInput from './DataSchemaInput.vue';

  const TYPE_OPTIONS = [
    {value: 'string', label: 'String'},
    {value: 'int', label: 'Integer'},
    {value: 'double', label: 'Double'},
    {value: 'decimal', label: 'Decimal'},
    {value: 'boolean', label: 'Boolean'},
    {value: 'date', label: 'Date'},
    {value: 'record', label: 'Record'},
    {value: 'array', label: 'Array'},
  ];

  const ELEMENT_TYPE_OPTIONS = [
    {value: 'string', label: 'String'},
    {value: 'int', label: 'Integer'},
    {value: 'double', label: 'Double'},
    {value: 'decimal', label: 'Decimal'},
    {value: 'boolean', label: 'Boolean'},
    {value: 'date', label: 'Date'},
    {value: 'record', label: 'Record'},
  ];

  @Component({
    components: {
      DataSchemaSelectDialog,
      DataSchemaInput,
    },
  })
  export default class DatatypeInput extends Vue {
    @Prop(Object) value: Datatype;
    @Prop(Boolean) readonly: boolean;
    @Prop(String) label: string;

    datatype: Datatype = {type: 'string'};

    options = TYPE_OPTIONS;
    elementTypeOptions = ELEMENT_TYPE_OPTIONS

    dataSchema: DataSchemaSummary = {
      key: '',
      name: '',
      description: '',
    };

    get typeModel() {
      return TYPE_OPTIONS.find(o => o.value === this.datatype.type)
    }

    set typeModel(newVal) {
      this.$set(this.datatype, 'type', newVal.value);
      switch (newVal.value) {
        case 'record':
          this.$set(this.datatype, 'element', null)
          this.$set(this.datatype, 'key', '')
          break;
        case 'array':
          this.$set(this.datatype, 'element', {type: 'string'})
          this.$set(this.datatype, 'key', null)
          break
        default:
          this.$set(this.datatype, 'element', null)
          this.$set(this.datatype, 'key', null)
      }
      this.emitUpdate()
    }

    get elementTypeModel() {
      const res = ELEMENT_TYPE_OPTIONS.find(o => o.value === this.datatype.element.type)
      console.log('res')
      console.log(res)
      return res
    }

    set elementTypeModel(newVal) {
      console.log('newVal')
      console.log(newVal)
      this.$set(this.datatype.element, 'type', newVal.value)
      switch (newVal.value) {
        case 'record':
          this.$set(this.datatype.element, 'element', null);
          this.$set(this.datatype.element, 'key', '');
          break;
        default:
          this.$set(this.datatype.element, 'element', null);
          this.$set(this.datatype.element, 'key', null);
      }
      this.emitUpdate()
    }

    @Watch('value', {immediate: true, deep: true})
    onValueChanged(newVal: Datatype) {
      this.datatype = newVal;
      if (!this.datatype) {
        this.datatype = {type: 'string'};
      }
    }

    emitUpdate() {
      this.$emit('input', this.datatype);
      console.log('emitUpdate')
      console.log(this.datatype)
    }


  }
</script>

<style lang="scss">
</style>
