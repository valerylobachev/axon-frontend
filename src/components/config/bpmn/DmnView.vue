<template>
    <div class="bpmn-content" id="bpmn-viewer">
    </div>
</template>

<script lang="ts">
    import '../../../../node_modules/dmn-js/dist/assets/dmn-js-drd.css';
    import '../../../../node_modules/dmn-js/dist/assets/dmn-js-decision-table.css';
    import '../../../../node_modules/dmn-js/dist/assets/dmn-js-literal-expression.css';
    import '../../../../node_modules/dmn-js/dist/assets/dmn-font/css/dmn.css'
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import DmnJS from 'dmn-js/lib/Viewer';

    @Component({})
    export default class DmnView extends Vue {
        viewer: any = null;

        @Prop(String) value: string;

        @Watch('value')
        onValueChange(newXml) {
            this.importXml(newXml);
        }

        mounted() {
            const selector = document.querySelector('#bpmn-viewer');

            this.viewer = new DmnJS({
                container: selector,
            });
            if (this.value && this.value !== '') {
                this.importXml(this.value);
            }
        }

        importXml(xml: string) {
            if (this.viewer) {
                this.viewer.importXML(xml, err => {
                    if (err) {
                        console.error('DMN import error');
                    } else {
                        console.log('dmn import ok');
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
