<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <div class="text-h6" >
        <span v-if="action == 'create'">{{ $t('axon.bpm.form.bpmDiagramForm.createTitle') }} </span>
        <span v-else-if="action == 'view'">{{ $t('axon.bpm.form.bpmDiagramForm.viewTitle') }} </span>
        <span v-else-if="action == 'edit'">{{ $t('axon.bpm.form.bpmDiagramForm.editTitle') }} </span>
        <span v-if="bpmDiagram.name">{{bpmDiagram.name}}</span>
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-section class="row items-center" >
      <div class="col 	">
        <q-chip dense outline square color="green" text-color="white"
                v-if="saved && !$v.bpmDiagram.$anyDirty"
                :label=" $t('axon.shared.saved')" />
        <q-chip dense outline square color="green" text-color="white"
                v-if="$v.bpmDiagram.$anyDirty"
                :label=" $t('axon.shared.changed')" />
      </div>
      <div class="col-auto q-gutter-sm">
        <q-btn outline color="primary"
               to="../../bpm-diagrams"
               :disable="$v.bpmDiagram.$anyDirty"
               :label="$t('axon.bpm.form.bpmDiagrams.title')"/>
        <q-btn outline color="primary"
               v-if="action == 'view'"
               :to="`../../bpm-diagram/edit/${id}`"
               :label="$t('axon.shared.edit')"/>
        <q-btn outline color="primary"
               v-if="action == 'edit'"
               :to="`../../bpm-diagram/view/${id}`"
               :disable="$v.bpmDiagram.$anyDirty"
               :label="$t('axon.shared.view')"/>
        <q-btn color="primary"
               v-if="action != 'view'"
               @click="save()"
               :disable="$v.bpmDiagram.$anyError"
               :label="$t('axon.shared.save')"/>
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
      <q-tabs v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="left"
              narrow-indicator>
        <q-tab name="info"
               :class="{ 'text-red': $v.bpmDiagram.name.$anyError } "
               :label="$t('axon.bpm.form.bpmDiagramForm.infoTab')"/>
        <q-tab name="designer" :label="$t('axon.bpm.form.bpmDiagramForm.designerTab')"/>
        <q-tab name="xml"
               :class="{ 'text-red': $v.bpmDiagram.xml.$anyError }"
               :label="$t('axon.bpm.form.bpmDiagramForm.xmlTab')"/>
      </q-tabs>
      <q-separator/>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="info">
          <div class="q-gutter-md">
            <!--[class.error]="!nameControl.valid && nameControl.touched"-->

           <!-- <q-input type="text" name="name"
                     v-model="bpmDiagram.name"
                     :label="$t('axon.bpm.md.bpmDiagram.name')"
                     :readOnly="action == 'view'"
                     :rules="[val => !!val || $t('axon.bpm.form.bpmDiagramForm.nameRequired')]"></q-input>-->
            <q-input type="text" name="name"
                     bottom-slots
                     v-model="$v.bpmDiagram.name.$model"
                     :label="$t('axon.bpm.md.bpmDiagram.name')"
                     :readonly="action == 'view'"
                     :error="!$v.bpmDiagram.name.required"
                     :error-message="$t('axon.bpm.form.bpmDiagramForm.nameRequired')"
            ></q-input>

            <q-input name="description" type="textarea"
                     :label="$t('axon.bpm.md.bpmDiagram.description')"
                     v-model="$v.bpmDiagram.description.$model"
                     :readonly="action == 'view'"></q-input>

            <q-input name="notation" readonly
                     :label="$t('axon.bpm.md.bpmDiagram.notation')"
                     v-model="bpmDiagram.notation"
                     ></q-input>

            <q-select v-if="bpmDiagram.notation === 'BPMN'"
                      readonly
                      dropdown-icon=""
                      :value="bpmDiagram.processDefinitions"
                      :label="$t('axon.bpm.md.bpmDiagram.processDefinitions')">
              <template v-slot:selected-item="scope">
                <q-chip dense square color="primary" text-color="white"
                        class="q-ma-none">
                  {{ scope.opt }}
                </q-chip>
              </template>
            </q-select>

          </div>

        </q-tab-panel>

        <q-tab-panel name="designer">
          <div class="reset-padding">
            <bpmn-edit v-if="bpmDiagram.notation === 'BPMN' && action !== 'view' "
                       v-model="bpmDiagram.xml"
                       @change="$v.bpmDiagram.xml.$touch()"
                       @processDefinitions="bpmDiagram.processDefinitions = $event"></bpmn-edit>
            <bpmn-view v-if="bpmDiagram.notation === 'BPMN' && action === 'view'"
                       v-model="bpmDiagram.xml"></bpmn-view>
            <dmn-view v-if="bpmDiagram.notation === 'DMN' "
                      v-model="bpmDiagram.xml"></dmn-view>
            <cmmn-view v-if="bpmDiagram.notation === 'CMMN' "
                       v-model="bpmDiagram.xml"></cmmn-view>
          </div>
        </q-tab-panel>

        <q-tab-panel name="xml">
          <q-input name="xml" type="textarea"
                   :label="$t('axon.bpm.md.bpmDiagram.xml')"
                   v-model="$v.bpmDiagram.xml.$model"
                   :readonly="action == 'view'"
                   bottom-slots
                   :error="!$v.bpmDiagram.xml.required"
                   :error-message="$t('axon.bpm.form.bpmDiagramForm.xmlRequired')"></q-input>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>


<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import ProcessDefLabels from '../../components/config/ProcessDefLabels.vue';
  import BpmnEdit from '../../components/config/bpmn/BpmnEdit.vue';
  import BpmnView from '../../components/config/bpmn/BpmnView.vue';
  import CmmnView from '../../components/config/bpmn/CmmnView.vue';
  import DmnView from '../../components/config/bpmn/DmnView.vue';
  import {Action, Getter, Mutation} from 'vuex-class';
  import {BPM_DIAGRAM_NAMESPACE} from '../../store/bpm-diagram/store';
  import {BpmDiagram, newBpmnDiagram} from '../../store/bpm-diagram/model';
  import { required } from 'vuelidate/lib/validators'

  const namespace: string = BPM_DIAGRAM_NAMESPACE;


  @Component({
    components: {
      ProcessDefLabels,
      BpmnEdit,
      BpmnView,
      CmmnView,
      DmnView,
    },
    validations: {
      bpmDiagram: {
        name: {required},
        description: {},
        xml: {required}
      }
    }
  })
  export default class BpmDiagramPage extends Vue {
    bpmDiagram: BpmDiagram = newBpmnDiagram();

    action = 'view';
    id = '';

    tab = 'info'

    @Getter('loading', {namespace}) loading;
    @Getter('failure', {namespace}) failure;
    @Getter('entity', {namespace}) entity;
    @Getter('saved', {namespace}) saved;
    @Action('Init', {namespace}) initBpmDiagram: any;
    @Action('Create', {namespace}) createBpmDiagram: any;
    @Action('Update', {namespace}) updateBpmDiagram: any;
    @Mutation('ClearFailure', {namespace}) clearFailure: any;


    @Watch('entity')
    onEntityChange(val: BpmDiagram, oldVal: BpmDiagram) {
      this.bpmDiagram = {...val};
      this.$v.$reset()
    }

    @Watch('$route', {immediate: true, deep: true})
    onRouteChange(to, from) {
      this.action = to.params.action;
      this.id = to.params.id;
      this.initBpmDiagram({mode: this.action, id: this.id});
    }

    save() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.action === 'create') {
          this.createBpmDiagram(this.bpmDiagram);
        } else if (this.action === 'edit') {
          this.updateBpmDiagram(this.bpmDiagram);
        }
      } else {
        this.$q.notify({
          color: 'negative',
          message: this.$t('axon.shared.checkRequirements')
        })
      }
    }

  }
</script>

<style>
  .reset-padding {
    margin: -16px;
  }

</style>
