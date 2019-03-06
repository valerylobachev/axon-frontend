<template>
    <div class="bpmn-content" id="bpmn-viewer">
    </div>
</template>

<script lang="ts">
    import '../../../../node_modules/cmmn-js/dist/assets/cmmn-font/css/cmmn.css';
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import CmmnJS from 'cmmn-js/lib/Viewer';

    @Component({})
    export default class CmmnView extends Vue {
        viewer: any = null;

        @Prop(String) value: string;

        @Watch('value')
        onValueChange(newXml) {
            this.importXml(newXml);
        }

        mounted() {
            const selector = document.querySelector('#bpmn-viewer');

            this.viewer = new CmmnJS({
                container: selector,
                keyboard: {
                    bindTo: selector,
                },
            });
            if (this.value && this.value !== '') {
                this.importXml(this.value);
            }
        }

        importXml(xml: string) {
            if (this.viewer) {
                this.viewer.importXML(xml, err => {
                    if (err) {
                        console.error('CMMN import error');
                    } else {
                        console.log('cmmn import ok');
                    }
                });
            }
        }
    }
</script>

<style >

    .bpmn-content {
        position: relative;
        width: 100%;
        height: calc( 100vh - 50px - 32px - 64px - 70px - 36px );
    }

</style>
