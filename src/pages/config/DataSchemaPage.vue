<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <div class="text-h6">
        <span v-if="action == 'create'">{{ $t('axon.knowledge.form.dataSchemaForm.createTitle') }} </span>
        <span v-else-if="action == 'view'">{{ $t('axon.knowledge.form.dataSchemaForm.viewTitle') }} </span>
        <span v-else-if="action == 'edit'">{{ $t('axon.knowledge.form.dataSchemaForm.editTitle') }} </span>
        <span v-if="dataSchema.key">{{dataSchema.key}}</span>
        <span v-if="dataSchema.name"> - {{dataSchema.name}}</span>
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-section class="row items-center">
      <div class="col">
        <q-chip dense outline square color="green" text-color="white"
                v-if="saved && !$v.dataSchema.$anyDirty"
                :label=" $t('axon.shared.saved')"/>
        <q-chip dense outline square color="green" text-color="white"
                v-if="$v.dataSchema.$anyDirty"
                :label=" $t('axon.shared.changed')"/>
      </div>
      <div class="col-auto q-gutter-sm">
        <q-btn outline color="primary"
               to="../../data-schemas"
               :disable="$v.dataSchema.$anyDirty"
               :label="$t('axon.knowledge.form.dataSchemaList.title')"/>
        <q-btn outline color="primary"
               v-if="action == 'view'"
               :to="`../../data-schema/edit/${key}`"
               :label="$t('axon.shared.edit')"/>
        <q-btn outline color="primary"
               v-if="action == 'edit'"
               :to="`../../data-schema/view/${key}`"
               :disable="$v.dataSchema.$anyDirty"
               :label="$t('axon.shared.view')"/>
        <q-btn color="primary"
               v-if="action != 'view'"
               @click="save()"
               :disable="$v.dataSchema.$anyError"
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
               :class="{ 'text-red': $v.dataSchema.$anyError } "
               :label="$t('axon.knowledge.form.dataSchemaForm.infoTab')"/>
        <q-tab name="fields" :label="$t('axon.knowledge.form.dataSchemaForm.fieldsTab')"/>

      </q-tabs>
      <q-separator/>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="info">
          <div class="q-gutter-md">
            <q-input type="text" name="key"
                     bottom-slots
                     v-model="$v.dataSchema.key.$model"
                     :label="$t('axon.knowledge.md.dataSchema.key')"
                     :readonly="action == 'view'"
                     :error="!$v.dataSchema.key.required"
                     :error-message="$t('axon.knowledge.form.dataSchemaForm.keyRequired')"></q-input>

            <q-input type="text" name="name"
                     bottom-slots
                     v-model="$v.dataSchema.name.$model"
                     :label="$t('axon.knowledge.md.dataSchema.name')"
                     :readonly="action == 'view'"
                     :error="!$v.dataSchema.name.required"
                     :error-message="$t('axon.knowledge.form.dataSchemaForm.nameRequired')"></q-input>

            <q-input name="description" type="textarea"
                     :label="$t('axon.knowledge.md.dataSchema.description')"
                     v-model="$v.dataSchema.description.$model"
                     :readonly="action == 'view'"></q-input>
          </div>

        </q-tab-panel>

        <q-tab-panel name="fields">
          <data-schema-field-table v-model="dataSchema.fields"
                                   @input="$v.dataSchema.fields.$touch()"
                                   :readonly="action == 'view'"></data-schema-field-table>
          <div style="height: 20em;"></div>


        </q-tab-panel>


      </q-tab-panels>

    </q-card-section>
  </q-card>
</template>


<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {Action, Getter, Mutation} from 'vuex-class';
  import {required} from 'vuelidate/lib/validators'
  import {DataSchema, newDataSchema} from '../../store/data-schema/model';
  import {KNOWLEDGE_DATA_SCHEMA_NAMESPACE} from '../../store/data-schema/store';
  import DataSchemaFieldTable from '../../components/config/DataSchemaFieldTable.vue';

  const namespace: string = KNOWLEDGE_DATA_SCHEMA_NAMESPACE;


  @Component({
    components: {
      DataSchemaFieldTable,
    },
    validations: {
      dataSchema: {
        key: {required},
        name: {required},
        description: {},
        fields: {},
      }
    }
  })
  export default class DataSchemaPage extends Vue {
    dataSchema: DataSchema = newDataSchema();

    action = 'view';
    key = '';

    tab = 'info'

    @Getter('loading', {namespace}) loading;
    @Getter('failure', {namespace}) failure;
    @Getter('entity', {namespace}) entity;
    @Getter('saved', {namespace}) saved;
    @Action('Init', {namespace}) initDataSchema: any;
    @Action('Create', {namespace}) createDataSchema: any;
    @Action('Update', {namespace}) updateDataSchema: any;
    @Mutation('ClearFailure', {namespace}) clearFailure: any;


    @Watch('entity')
    onEntityChange(val: DataSchema, oldVal: DataSchema) {
      this.dataSchema = {...val};
      this.$v.$reset()
    }

    @Watch('$route', {immediate: true, deep: true})
    onRouteChange(to, from) {
      this.action = to.params.action;
      this.key = to.params.key;
      this.initDataSchema({mode: this.action, id: this.key});
    }

    save() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.action === 'create') {
          this.createDataSchema(this.dataSchema);
        } else if (this.action === 'edit') {
          this.updateDataSchema(this.dataSchema);
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
</style>
