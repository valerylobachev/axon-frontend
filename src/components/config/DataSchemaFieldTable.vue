<template>
  <div>
    <q-table wrap-cells
             flat
             :data="schemaFields"
             :columns="columns"
             row-key="name">

      <template v-slot:top="props">
        <div class="col-2 text-subtitle1">{{ $t('axon.knowledge.form.schemaFieldTable.title') }}</div>
        <q-space/>
        <q-btn icon="fas fa-plus" flat round color="primary"
               v-if="!readonly"
               @click="createField()"></q-btn>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" class="cursor-pointer" @click.native="editField(props.row)">
          <q-td key="key" :props="props">{{ props.row.key }}</q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="caption" :props="props">{{ props.row.caption }}</q-td>
          <q-td key="datatype" :props="props">{{ displayDatatype(props.row.datatype) }}</q-td>
          <q-td key="value" :props="props">{{ props.row.value }}</q-td>
          <q-td key="actions" :props="props" style="width: 5em"
                v-if="!readonly">
            <q-btn flat round color="red" size="sm" icon="far fa-trash-alt"
                   @click.stop.prevent="deleteField(props.row.key)"/>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <data-schema-field-dialog ref="dataSchemaFieldDialog" :readonly="readonly"></data-schema-field-dialog>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {DataSchemaField, DataSchemaFields, Datatype} from '../../store/data-schema/model';
  import DataSchemaFieldDialog from './DataSchemaFieldDialog.vue';

  @Component({
    components: {
      DataSchemaFieldDialog,
    },
  })
  export default class DataSchemaFieldTable extends Vue {

    @Prop(Object) value: DataSchemaFields;
    @Prop(Boolean) readonly: boolean;

    schemaFields: DataSchemaField[] = [];
    selected: DataSchemaField = null;


    get columns() {
      if (this.readonly) {
        return [...this.tableColumns()]
      } else {
        return [...this.tableColumns(), this.actionColumn()]
      }
    }


    @Watch('value', {immediate: true})
    onValueChanged(newVal: DataSchemaFields) {
      this.schemaFields = Object.values(newVal);
    }

    editField(field: DataSchemaField) {
      console.log('editField');
      (this.$refs.dataSchemaFieldDialog as DataSchemaFieldDialog)
        .show(field)
        .then(newValue => this.updateField(newValue, field) );
    }

    createField() {
      console.log(this.$refs.dataSchemaFieldDialog);
      (this.$refs.dataSchemaFieldDialog as DataSchemaFieldDialog)
        .show({
          key: '',
          name: '',
          caption: '',
          datatype: {type: 'string'},
          value: null,
        })
        .then(newValue => this.updateField(newValue));
    }

    updateField(newField: DataSchemaField, oldField?: DataSchemaField) {
      if (oldField) {
        const index = this.schemaFields.findIndex(f => f.key === oldField.key)
        if (index >= 0) {
          this.schemaFields.splice(index, 1, newField)
        }
      } else {
        const index = this.schemaFields.findIndex(f => f.key === newField.key)
        if (index >= 0) {
          this.schemaFields.splice(index, 1, newField)
        } else {
          this.schemaFields.push(newField);
        }
      }
      this.emitUpdate();
    }


    deleteField(key: string) {
      const newValue = {...this.value};
      delete (newValue[key]);
      this.onValueChanged(newValue);
      this.emitUpdate();
    }

    emitUpdate() {
      const schemaFields: DataSchemaFields = {};
      this.schemaFields.forEach(f => schemaFields[f.key] = f);
      this.$emit('input', schemaFields);
    }

    displayDatatype(dt: Datatype): string {
      if (dt.type === 'record') {
        return `Record ${dt.key}`;
      } else if (dt.type === 'array') {
        const elementType = this.displayDatatype(dt.element);
        return `Array of ${elementType}`;
      } else {
        return this.capitalizeFirstLetter(dt.type);
      }
    }

    capitalizeFirstLetter(str: string) {
      if (str && str.length > 0)
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    tableColumns() {
      return [
        {
          name: 'key',
          required: true,
          label: this.$t('axon.knowledge.md.dataSchemaField.key'),
          align: 'left',
          field: 'key',
          sortable: true,
          style: 'min-width: 7em',
        },
        {
          name: 'name',
          required: true,
          label: this.$t('axon.knowledge.md.dataSchemaField.name'),
          align: 'left',
          field: 'name',
          sortable: true,
          style: 'min-width: 7em',
        },
        {
          name: 'caption',
          required: true,
          label: this.$t('axon.knowledge.md.dataSchemaField.caption'),
          align: 'left',
          field: 'caption',
          sortable: true,
        },
        {
          name: 'datatype',
          required: true,
          label: this.$t('axon.knowledge.md.dataSchemaField.datatype'),
          align: 'left',
          field: 'datatype',
        },
        {
          name: 'value',
          required: true,
          label: this.$t('axon.knowledge.md.dataSchemaField.value'),
          align: 'left',
          field: 'value',
        },
      ]
    }

    actionColumn() {
      return {
        name: 'actions',
        label: this.$t('axon.shared.actions'),
        align: 'center',
        style: 'width: 9em',
      }
    }

  }
</script>

<style lang="scss">

</style>
