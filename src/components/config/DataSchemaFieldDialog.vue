<template>
  <q-dialog v-model="open" persistent>
    <q-card style="min-width: 50vw; min-height: 50vh;">
      <q-card-section>
        <div class="text-h6" v-if="readonly">{{ $t('axon.knowledge.form.schemaFieldDialog.viewTitle') }}</div>
        <div class="text-h6" v-else>{{ $t('axon.knowledge.form.schemaFieldDialog.editTitle') }}</div>
      </q-card-section>

      <q-separator/>

      <q-card-section class="scroll" v-if="schemaField">

        <div class="q-gutter-md">
          <q-input type="text" name="key"
                   bottom-slots
                   v-model="$v.schemaField.key.$model"
                   :label="$t('axon.knowledge.md.dataSchemaField.key')"
                   :readonly="readonly"
                   :error="!$v.schemaField.key.required"
                   :error-message="$t('axon.knowledge.form.dataSchemaForm.keyRequired')"></q-input>

          <div class="row">
            <div class="col">
              <q-input type="text" name="name"
                       bottom-slots
                       v-model="$v.schemaField.name.$model"
                       :label="$t('axon.knowledge.md.dataSchemaField.name')"
                       :readonly="readonly"
                       :error="!$v.schemaField.name.required"
                       :error-message="$t('axon.knowledge.form.dataSchemaForm.nameRequired')"></q-input>
            </div>
            <div class="col">
              <q-input type="text" name="caption"
                       bottom-slots
                       v-model="$v.schemaField.caption.$model"
                       :label="$t('axon.knowledge.md.dataSchemaField.caption')"
                       :readonly="readonly"></q-input>
            </div>
          </div>
          <datatype-input
            v-model="schemaField.datatype"
            :readonly="readonly"
            :label="$t('axon.knowledge.md.dataSchemaField.datatype')"/>


          <div class="text-subtitle1">{{ $t('axon.knowledge.md.dataSchemaField.value') }}</div>

          <q-btn-toggle
            v-model="defaultValueModel"
            toggle-color="primary"
            :readonly="readonly"
            :options="defaultValueOptions"/>

          <pre>
{{ schemaField }}
        </pre>
        </div>
      </q-card-section>

      <q-separator/>
      <q-card-actions align="right">
        <q-btn :label="$t('axon.shared.cancel')" outline color="primary" @click="onCancel()"/>
        <q-btn :label="$t('axon.shared.save')" color="primary" @click="onSave()"/>
      </q-card-actions>
    </q-card>
  </q-dialog>


  <!--
          <datatype-selector
            v-model="schemaField.datatype"
            :readOnly="readonly"
            :caption="$t('axon.knowledge.md.dataSchemaField.datatype')"/>

          <div class="field">
            <label>{{ $t('axon.knowledge.md.dataSchemaField.value') }}</label>
            <div class="field">
              <div class="ui buttons">
                <button class="ui button"
                        :class="{active: isNone }"
                        @click="setNone()">None
                </button>
                <button class="ui button"
                        :class="{active: isValue }"
                        @click="setValue()">Value
                </button>
              </div>
            </div>
            <template v-if="isValue">
              <record-input
                v-if="schemaField.datatype.type === 'record'"
                v-model="schemaField.value"
                :datatype="schemaField.datatype"
                @validation="valueValid = $event"
                :readOnly="readonly"></record-input>
              <array-input
                v-if="schemaField.datatype.type === 'array'"
                v-model="schemaField.value"
                :datatype="schemaField.datatype"
                @validation="valueValid = $event"
                :readOnly="readonly"></array-input>
              <textarea
                type="text"
                name="value"
                key="string"
                v-if="schemaField.datatype.type === 'string'"
                v-model.trim="schemaField.value"
                :readOnly="readonly"></textarea>
              <input type="number"
                     name="value"
                     key="number"
                     v-if="schemaField.datatype.type === 'int' || schemaField.datatype.type === 'decimal' || schemaField.datatype.type === 'double'"
                     v-model.number="schemaField.value"
                     :readOnly="readonly">
              <input type="date"
                     name="value"
                     key="date"
                     v-if="schemaField.datatype.type === 'date'"
                     v-model="schemaField.value"
                     :readOnly="readonly">
              <div class="inline fields" v-if="schemaField.datatype.type === 'boolean'">
                <div class="field">
                  <div class="ui radio checkbox">
                    <input type="radio"
                           name="ratioFalse"
                           key="ratioFalse"
                           v-model="schemaField.value"
                           :value="false"
                           :readOnly="readonly">
                    <label>False</label>
                  </div>
                </div>
                <div class="ui radio checkbox">

                  <div class="ui radio checkbox">
                    <input type="radio"
                           name="ratioTrue"
                           key="ratioTrue"
                           v-model="schemaField.value"
                           :value="true"
                           :readOnly="readonly">
                    <label>True</label>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </sui-modal-description>
    </sui-modal-content>
    <sui-modal-actions>
      <sui-button basic @click.native.prevent="onCancel()">{{ $t('axon.shared.cancel') }}</sui-button>
      <sui-button primary
                  @click.native.prevent="onSave()"
                  :disabled="!isValid">{{ $t('axon.shared.save') }}
      </sui-button>
    </sui-modal-actions>
  </sui-modal>-->
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {required} from 'vuelidate/lib/validators'
  import {DataSchemaField, Datatype} from '../../store/data-schema/model';
  import DatatypeInput from './DatatypeInput.vue';


  @Component({
    components: {
      DatatypeInput,
      // DatatypeSelector,
      // RecordInput,
      // ArrayInput,
    },
    validations: {
      schemaField: {
        key: {required},
        name: {required},
        caption: {},
      }
    }
  })
  export default class DataSchemaFieldDialog extends Vue {

    @Prop(Boolean) readonly: boolean;

    schemaField: DataSchemaField = {
      key: '',
      name: '',
      caption: '',
      datatype: {type: 'string'},
      value: null,
    };

    open = false;
    resolve = null;
    reject = null;

    valueValid = true;

    show(schemaField: DataSchemaField) {
      this.open = true;
      this.schemaField = JSON.parse(JSON.stringify(schemaField));
      return new Promise<DataSchemaField>((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    }

    onSave() {
      this.open = false;
      this.resolve(this.schemaField);
    }

    onCancel() {
      this.open = false;
      this.reject();
    }

    get nameChange() {
      if (this.schemaField) {
        return this.schemaField.name;
      } else {
        return null;
      }
    }

    @Watch('nameChange')
    onNameChange(newVal: string, oldVal: string) {
      if (this.schemaField && newVal !== oldVal && this.schemaField.caption === oldVal) {
        this.schemaField.caption = newVal;
      }
    }

    get defaultValueOptions() {
      if (this.schemaField.datatype.type === 'record') {
        return [
          {label: 'None', value: 'none'},
          {label: 'Default', value: 'default'},
          {label: 'Value', value: 'value'},
        ]
      } else {
        return [
          {label: 'None', value: 'none'},
          {label: 'Value', value: 'value'},
        ]
      }
    }

    get datatype() {
      return this.schemaField.datatype
    }

    @Watch('datatype', {deep: true})
    onDatatypeChanged(newVal: Datatype, oldVal: Datatype ) {
      console.log('onDatatypeChanged')
      this.defaultValueModel = 'value'
    }

    set defaultValueModel(val: string) {
      console.log('set defaultValueModel')
      if (val === 'value') {
        switch (this.schemaField.datatype.type) {
          case 'string':
            this.$set(this.schemaField, 'value', '');
            break;
          case 'int':
            this.$set(this.schemaField, 'value', 0);
            break;
          case 'decimal':
            this.$set(this.schemaField, 'value', 0);
            break;
          case 'double':
            this.$set(this.schemaField, 'value', 0);
            break;
          case 'boolean':
            this.$set(this.schemaField, 'value', false);
            break;
          case 'date':
            this.$set(this.schemaField, 'value', new Date().toISOString().slice(0, 10));
            break;
          case 'record':
            this.$set(this.schemaField, 'value', {_default: false});
            break;
          case 'array':
            this.$set(this.schemaField, 'value', []);
            break;
        }
      } else if (val === 'default') {
        this.$set(this.schemaField, 'value', {});
      } else {
        this.$set(this.schemaField, 'value', null);
      }

    }

    get defaultValueModel() {
      switch (this.schemaField.datatype.type) {
        case 'record':
          if (this.schemaField.value === null || this.schemaField.value === undefined) return 'none'
          else if (typeof this.schemaField.value === 'object' &&
            Object.values(this.schemaField.value).length ===0 ) return 'default'
          else return 'value'
          break
        case 'array':
          if (this.schemaField.value === null || this.schemaField.value === undefined) return 'none'
          else return 'value'
          break
        default:
          if (this.schemaField.value || this.schemaField.value === '' ||
            this.schemaField.value === false || this.schemaField.value === 0) return 'value'
          else return 'none'
      }
    }


  }
</script>

<style>

</style>
