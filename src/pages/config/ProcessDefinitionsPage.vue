<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <div class="text-h6">{{ $t('axon.bpm.form.processDefList.title') }}</div>
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <process-def-filter :filter="filter" @filter="find"></process-def-filter>

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
               row-key="id">
      </q-table>

    </q-card-section>
  </q-card>
</template>


<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {Action, Getter, Mutation} from 'vuex-class';
  import SimpleLazyFilter from '../../components/SimpleLazyFilter.vue';
  import ProcessDefLabels from '../../components/config/ProcessDefLabels.vue';
  import DeleteDialog from '../../components/DeleteDialog.vue';
  import MessageDialog from '../../components/MessageDialog.vue';
  import {BPM_DEPLOYMENT_NAMESPACE} from '../../store/deployment/store';
  import {emptyProcessDefFilter} from '../../store/deployment/model';
  import ProcessDefFilter from '../../components/config/ProcessDefFilter.vue';

  const namespace: string = BPM_DEPLOYMENT_NAMESPACE;

  @Component({
    components: {
      SimpleLazyFilter,
      ProcessDefLabels,
      ProcessDefFilter,
      DeleteDialog,
      MessageDialog,
    }
  })
  export default class ProcessDefinitionsPage extends Vue {
    @Action('InitFilter', {namespace}) initFilter: any;
    @Action('Find', {namespace}) find: any;
    @Getter('filter', {namespace}) filter;
    @Getter('entitiesLoading', {namespace}) entitiesLoading;
    @Getter('entityArray', {namespace}) entityArray;
    @Getter('pagination', {namespace}) pagination;

    @Mutation('SetPagination', {namespace}) setPagination: any;
    @Mutation('ClearFailure', {namespace}) clearFailure: any;
    @Getter('failure', {namespace}) failure;

    created() {
      const key = 'key';
      if (!this.$route.query[key]) {
        this.initFilter();
      }
    }

    @Watch('$route', {immediate: true, deep: true})
    onRouteChange(to, from) {
      if (to.query.key) {
        this.find({...emptyProcessDefFilter(), key: to.query.key})
      }
    }

    get columns() {
      return [
        {
          name: 'key',
          label: this.$t('axon.bpm.md.processDef.key'),
          align: 'left',
          field: 'key',
          sortable: true,
        },
        {
          name: 'version',
          label: this.$t('axon.bpm.md.processDef.version'),
          align: 'left',
          field: 'version',
          sortable: true,
        },
        {
          name: 'name',
          required: true,
          label: this.$t('axon.bpm.md.processDef.name'),
          align: 'left',
          field: 'name',
          sortable: true,
          style: 'min-width: 7em',
        },
        {
          name: 'description',
          label: this.$t('axon.bpm.md.processDef.description'),
          align: 'left',
          field: 'description',
          sortable: true,
          classes: 'text-truncate',
        },
      ]
    }


  }
</script>

<style></style>
