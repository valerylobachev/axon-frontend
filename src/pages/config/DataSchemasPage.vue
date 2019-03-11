<template>
  <q-card class="q-ma-md">

    <q-card-section>
      <div class="text-h6">{{ $t('axon.knowledge.form.dataSchemaList.title') }}</div>
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="row q-gutter-md items-center">
        <div class="col">
          <simple-lazy-filter :filter="filter.filter" @filter="find({ filter: $event })"></simple-lazy-filter>
        </div>
        <div class="col-md-auto">
          <q-btn color="primary"
                 :label="$t('axon.knowledge.form.dataSchemaList.create')"
                 to="data-schema/create/new"/>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <q-banner class="text-white bg-red" inline-actions rounded v-if="failure">
        <div class="text-h6">
          {{ $t('axon.shared.error') }}
        </div>
        <p> {{ $t(failure.code, failure) }}</p>
        <template v-slot:action>
          <q-btn flat round icon="fas fa-times" @click="clearFailure"/>
        </template>
      </q-banner>

      <q-table wrap-cells
               flat
               :loading="entitiesLoading"
               :data="entityArray"
               :columns="columns"
               :pagination="pagination"
               @update:pagination="setPagination($event)"
               row-key="key">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="key" :props="props">
              {{ props.row.key }}
            </q-td>
            <q-td key="name" :props="props">
              <router-link class="view-link text-primary" :to="`data-schema/view/${props.row.key}`">
                {{ props.row.name }}
              </router-link>
            </q-td>
            <q-td key="description" :props="props" style="max-width: 25em;">
              <div class="ellipsis">
                {{ props.row.description }}
              </div>
            </q-td>
            <q-td key="actions" :props="props" style="width: 12em">
              <q-btn flat round color="green" size="sm" icon="far fa-copy" :to="`data-schema/create/${props.row.key}`"/>
              <q-btn flat round color="blue" size="sm" icon="far fa-edit" :to="`data-schema/edit/${props.row.key}`"/>
              <q-btn flat round color="red" size="sm" icon="far fa-trash-alt" @click="requestDelete(props.row)"/>
            </q-td>

          </q-tr>
        </template>
      </q-table>

    </q-card-section>
    <delete-dialog ref="deleteDialog"></delete-dialog>

  </q-card>
</template>


<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Action, Getter, Mutation} from 'vuex-class';
  import SimpleLazyFilter from '../../components/SimpleLazyFilter.vue';
  import ProcessDefLabels from '../../components/config/ProcessDefLabels.vue';
  import DeleteDialog from '../../components/DeleteDialog.vue';
  import MessageDialog from '../../components/MessageDialog.vue';
  import {KNOWLEDGE_DATA_SCHEMA_NAMESPACE} from '../../store/data-schema/store';
  import {DataSchemaSummary} from '../../store/data-schema/model';
  import DataSchemaInput from '../../components/config/DataSchemaInput.vue';

  const namespace: string = KNOWLEDGE_DATA_SCHEMA_NAMESPACE;

  @Component({
    components: {
      DataSchemaInput,
      SimpleLazyFilter,
      ProcessDefLabels,
      DeleteDialog,
      MessageDialog,
    }
  })
  export default class DataSchemasPage extends Vue {

    @Action('InitFilter', {namespace}) initFilter: any;
    @Action('Find', {namespace}) find: any;
    @Getter('filter', {namespace}) filter;
    @Getter('entitiesLoading', {namespace}) entitiesLoading;
    @Getter('entityArray', {namespace}) entityArray;
    @Getter('pagination', {namespace}) pagination;

    @Mutation('SetPagination', {namespace}) setPagination: any;
    @Mutation('ClearFailure', {namespace}) clearFailure: any;
    @Getter('failure', {namespace}) failure;

    @Action('Delete', {namespace}) deleteEntity: any;

    constructor() {
      super();
      this.initFilter();
    }

    get columns() {
      return [
        {
          name: 'key',
          required: true,
          label: this.$t('axon.knowledge.md.dataSchema.key'),
          align: 'left',
          field: 'key',
          sortable: true,
          style: 'min-width: 7em',
        },
        {
          name: 'name',
          required: true,
          label: this.$t('axon.knowledge.md.dataSchema.name'),
          align: 'left',
          field: 'name',
          sortable: true,
          style: 'min-width: 7em',
        },
        {
          name: 'description',
          label: this.$t('axon.knowledge.md.dataSchema.description'),
          align: 'left',
          field: 'description',
          sortable: true,
          classes: 'text-truncate',
          style: 'max-width: 30em',
        },
        {
          name: 'actions',
          label: this.$t('axon.shared.actions'),
          align: 'center',
          style: 'width: 9em',
        },
      ]
    }

    requestDelete(entity: DataSchemaSummary) {
      const message = {
        code: 'axon.knowledge.md.dataSchema.delete',
        name: entity.name,
      };

      (this.$refs.deleteDialog as DeleteDialog).show(null, message).then(del => {
        this.deleteEntity(entity.key);
      });
    }


  }
</script>

<style>
  a.view-link {
    font-weight: bolder;
    text-decoration: none;
  }
</style>
