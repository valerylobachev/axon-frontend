<template>
  <q-dialog v-model="open" persistent >
    <q-card class="q-ma-md" style="min-width: 70vw; min-height: 70vh;">

      <q-card-section>
        <div class="text-h6">{{ $t('axon.knowledge.form.dataSchemaSelectDialog.title') }}</div>
      </q-card-section>

      <q-separator/>

      <q-card-section>
        <div class="row q-gutter-md items-center">
          <div class="col">
            <simple-lazy-filter :filter="filter.filter" @filter="find({ filter: $event })"></simple-lazy-filter>
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
            <q-tr :props="props" @click.native="selectEntity(props.row)" class="cursor-pointer">
              <q-td key="key" :props="props">
                {{ props.row.key }}
              </q-td>
              <q-td key="name" :props="props">
                  {{ props.row.name }}
              </q-td>
              <q-td key="description" :props="props" style="max-width: 25em;">
                <div class="ellipsis">
                  {{ props.row.description }}
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>

      </q-card-section>
      <q-separator/>
      <q-card-actions align="right">
        <q-btn flat :label="$t('axon.shared.cancel')" color="primary" @click="close" v-close-dialog/>
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>


<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Action, Getter, Mutation} from 'vuex-class';
  import SimpleLazyFilter from '../../components/SimpleLazyFilter.vue';
  import {KNOWLEDGE_DATA_SCHEMA_NAMESPACE} from '../../store/data-schema/store';
  import {DataSchemaSummary} from '../../store/data-schema/model';

  const namespace: string = KNOWLEDGE_DATA_SCHEMA_NAMESPACE;

  @Component({
    components: {
      SimpleLazyFilter,
    }
  })
  export default class DataSchemaSelectDialog extends Vue {
    @Action('InitFilter', {namespace}) initFilter: any;
    @Action('Find', {namespace}) find: any;
    @Getter('filter', {namespace}) filter;
    @Getter('entitiesLoading', {namespace}) entitiesLoading;
    @Getter('entityArray', {namespace}) entityArray;
    @Getter('pagination', {namespace}) pagination;

    @Mutation('SetPagination', {namespace}) setPagination: any;
    @Mutation('ClearFailure', {namespace}) clearFailure: any;
    @Getter('failure', {namespace}) failure;


    open = false;
    resolve = null;
    reject = null;

    constructor() {
      super();
      this.initFilter();
    }

    select() {
      this.open = true;
      return new Promise<any>((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
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
      ]
    }

    selectEntity(entity: DataSchemaSummary) {
      this.open = false;
      this.resolve(entity);
    }

    close() {
      this.open = false;
      this.reject();
    }

  }
</script>

<style>
  a.view-link {
    font-weight: bolder;
    text-decoration: none;
  }
</style>
