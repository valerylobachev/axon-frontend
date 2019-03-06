<template>
  <div class="row items-center q-gutter-md ">
    <div class="col">
      <div class="row q-gutter-md">
        <div class="col">
          <q-input :label="$t('axon.bpm.md.processDef.key')"
                   v-model="localFilter.key">
            <template v-slot:append>
              <q-icon class="cursor-pointer" name="close" @click="localFilter.key = ''"/>
            </template>
          </q-input>
        </div>
        <div class="col">
          <q-input :label="$t('axon.bpm.md.processDef.name')"
                   v-model="localFilter.name">
            <template v-slot:append>
              <q-icon class="cursor-pointer" name="close" @click="localFilter.name = ''"/>
            </template>
          </q-input>
        </div>
      </div>
      <q-toggle
        v-model="localFilter.latest"
        :label="$t('axon.bpm.form.processDefList.latest')"
      />
    </div>
    <div class="col-md-auto">
      <div class="column q-gutter-md">
        <q-btn color="primary"
               @click="find()"
               :label="$t('axon.shared.find')"/>
        <q-btn outline color="primary"
               @click="clearFilter()"
               :label="$t('axon.shared.clear')"/>
      </div>
    </div>
  </div>

  <!--<div class="ui form form-row">
      <div class="form-input">
          <div class="fields">
              <div class="eight wide field">
                  <label>{{ $t('axon.bpm.md.processDef.key') }}</label>
                  <div class="ui fluid icon input">
                      <input type="text" v-model="localFilter.key">
                      <i class=" close link icon" @click="localFilter.key = ''"></i>
                  </div>
              </div>
              <div class="eight wide field">
                  <label>{{ $t('axon.bpm.md.processDef.name') }}</label>
                  <div class="ui fluid icon input">
                      <input type="text" v-model="localFilter.name">
                      <i class=" close link icon" @click="localFilter.name = ''"></i>
                  </div>
              </div>
          </div>
          <div class="ui toggle checkbox">
              <input type="checkbox" v-model="localFilter.latest">
              <label>{{ $t('axon.bpm.form.processDefList.latest') }}</label>
          </div>
      </div>
      <div class="form-buttons">
          <button class="ui fluid primary button" @click="find()">
              {{ $t('axon.shared.find') }}
          </button>
          <button class="ui fluid basic button" @click="clearFilter()">
              {{ $t('axon.shared.clear') }}
          </button>
      </div>
  </div>-->
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {emptyProcessDefFilter, FindProcessDefOptions} from '../../store/deployment/model';

  @Component({
    components: {},
  })
  export default class ProcessDefFilter extends Vue {

    @Prop(Object) filter: FindProcessDefOptions;
    localFilter: FindProcessDefOptions = emptyProcessDefFilter();

    @Watch('filter', {immediate: true, deep: true})
    onFilterChanged(newVal: FindProcessDefOptions) {
      this.localFilter = newVal;
    }

    find() {
      this.$emit('filter', this.localFilter);
    }

    clearFilter() {
      this.$emit('filter', emptyProcessDefFilter());
    }
  }
</script>

<style>

</style>
