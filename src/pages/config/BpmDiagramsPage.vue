<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <div class="text-h6">{{ $t('axon.bpm.form.bpmDiagrams.title') }}</div>
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <div class="row q-gutter-md items-center">
        <div class="col">
          <simple-lazy-filter :filter="filter.filter" @filter="find({ filter: $event })"></simple-lazy-filter>
        </div>

        <div class="col-md-auto">

          <q-btn-dropdown split no-caps color="primary"
                          :label="$t('axon.bpm.form.bpmDiagrams.createBPMN')"
                          to="bpm-diagram/create/BPMN">
            <q-list>
              <q-item clickable v-close-menu to="bpm-diagram/create/DMN">
                <q-item-section>
                  <q-item-label>{{ $t('axon.bpm.form.bpmDiagrams.createDMN')}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-menu to="bpm-diagram/create/CMMN">
                <q-item-section>
                  <q-item-label>{{ $t('axon.bpm.form.bpmDiagrams.createCMMN')}}</q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-btn-dropdown>
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
               row-key="id">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">{{ props.row.name }}</q-td>
            <q-td key="description" :props="props" style="max-width: 30em;">
              <div class="ellipsis">
                {{ props.row.description }}
              </div>
            </q-td>
            <q-td key="notation" :props="props">{{ props.row.notation }}</q-td>
            <q-td key="processDefinitions" :props="props">
              <process-def-labels :value="props.row.processDefinitions"></process-def-labels>
            </q-td>
            <q-td key="actions" :props="props" style="width: 12em">
              <q-btn flat round color="green" size="sm" icon="far fa-copy" :to="`bpm-diagram/create/${props.row.id}`"/>
              <q-btn flat round color="blue" size="sm" icon="far fa-edit" :to="`bpm-diagram/create/${props.row.id}`"/>
              <q-btn flat round color="deep-purple" size="sm" icon="fas fa-upload" @click="deploy(props.row.id)"/>
              <q-btn flat round color="red" size="sm" icon="far fa-trash-alt" @click="requestDelete(props.row)"/>
            </q-td>

          </q-tr>
        </template>
      </q-table>

    </q-card-section>
    <delete-dialog ref="deleteDialog"></delete-dialog>
    <message-dialog ref="deployDialog"></message-dialog>

  </q-card>
</template>


<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Action, Getter, Mutation} from 'vuex-class';
  import {BpmDiagramSummary} from '../../store/bpm-diagram/model';
  import bpmDeploymentBackendService from '../../store/deployment/backend.service';
  import {BPM_DIAGRAM_NAMESPACE} from '../../store/bpm-diagram/store';
  import SimpleLazyFilter from '../../components/SimpleLazyFilter.vue';
  import ProcessDefLabels from '../../components/ProcessDefLabels.vue';
  import DeleteDialog from '../../components/DeleteDialog.vue';
  import MessageDialog from '../../components/MessageDialog.vue';

  const namespace: string = BPM_DIAGRAM_NAMESPACE;

  @Component({
    components: {
      SimpleLazyFilter,
      ProcessDefLabels,
      DeleteDialog,
      MessageDialog,
    }
  })
  export default class BpmDiagramsPage extends Vue {
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
          name: 'name',
          required: true,
          label: this.$t('axon.bpm.md.bpmDiagram.name'),
          align: 'left',
          field: 'name',
          sortable: true,
          style: 'min-width: 7em',
        },
        {
          name: 'description',
          label: this.$t('axon.bpm.md.bpmDiagram.description'),
          align: 'left',
          field: 'description',
          sortable: true,
          classes: 'text-truncate',
          style: 'max-width: 30em',
        },
        {
          name: 'notation',
          label: this.$t('axon.bpm.md.bpmDiagram.notation'),
          align: 'left',
          field: 'notation',
          sortable: true,
        },
        {
          name: 'processDefinitions',
          label: this.$t('axon.bpm.md.bpmDiagram.processDefinitions'),
          align: 'left',
          field: 'processDefinitions',
          sortable: true,
        },
        {
          name: 'actions',
          label: this.$t('axon.shared.actions'),
          align: 'center',
          style: 'width: 9em',
        },
      ]
    }

    requestDelete(entity: BpmDiagramSummary) {
      const message = {
        code: 'axon.bpm.md.bpmDiagram.delete',
        name: entity.name,
      };

      (this.$refs.deleteDialog as DeleteDialog).show(null, message).then(del => {
        this.deleteEntity(entity.id);
      });
    }

    deploy(id: string) {
      bpmDeploymentBackendService.deploy(id).then(result => {
        const message = {
          code: 'axon.bpm.form.bpmDiagrams.deployed',
          name: result.name,
        };
        (this.$refs.deployDialog as MessageDialog)
          .show('axon.bpm.form.bpmDiagrams.deployedTitle', message);
      });
    }
  }
</script>

<style></style>
