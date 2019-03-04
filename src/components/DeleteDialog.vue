<template>
  <q-dialog v-model="open" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6" v-if="caption && typeof caption === 'string'">{{ $t(caption)}}</div>
          <div class="text-h6" v-else-if="caption && typeof caption === 'object'">{{$t(caption.code, caption)}}</div>
            <div class="text-h6" v-else>{{ $t('axon.shared.delete')}}</div>
      </q-card-section>

      <q-separator/>

      <q-card-section >
        <p v-if="message && typeof message === 'string'">{{ $t(message)}}</p>
        <p v-else-if="message && typeof message === 'object'">{{ $t(message.code, message)}}</p>
      </q-card-section>

      <q-separator/>
      <q-card-actions align="right">
        <q-btn flat :label="$t('axon.shared.cancel')" color="primary" @click="cancel" v-close-dialog />
        <q-btn flat :label="$t('axon.shared.delete')" color="negative" @click="deleteEntity" v-close-dialog />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class DeleteDialog extends Vue {
        caption: string | object = 'axon.shared.delete';
        message: string | object = '';

        open = false;
        resolve = null;
        reject = null;

        show(caption: string | object, message: string | object) {
            this.caption = caption;
            this.message = message;
            this.open = true;
            return new Promise<any>((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;

            });
        }

        deleteEntity() {
            this.open = false;
            this.resolve(true);
        }

        cancel() {
            this.open = false;
            this.reject(false);
        }
    }
</script>

<style lang="scss">
</style>
