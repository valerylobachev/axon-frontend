<template>
    <div class="bpmn-content" id="bpmn-viewer">
    </div>
</template>

<script lang="ts">
    import '../../../../node_modules/bpmn-js/dist/assets/diagram-js.css';
    import '../../../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
    import '../../../../node_modules/bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';

    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import BpmnJS from 'bpmn-js/lib/Viewer';

    @Component({})
    export default class BpmnView extends Vue {
        viewer: any = null;

        @Prop(String) value: string;

        @Watch('value')
        onValueChange(newXml) {
            this.importXml(newXml);
        }

        mounted() {
            const selector = document.querySelector('#bpmn-viewer');

            this.viewer = new BpmnJS({
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
                        console.error('BPMN import error');
                    } else {
                        console.log('bpmn import ok');
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

    #canvas {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
    }

    #properties {
        font-size: 12px;

        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 300px;
        height: 100%;
        z-index: 110;
        /* border-left: 1px solid #ccc;*/
        overflow: auto;
        background-color: rgb(248, 248, 248);
    }


</style>
