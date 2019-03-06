<template>
    <div class="bpmn-content">
        <div id="canvas"></div>
        <div id="properties"></div>
    </div>
</template>

<script lang="ts">
    import '../../../../node_modules/bpmn-js/dist/assets/diagram-js.css';
    import '../../../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
    import '../../../../node_modules/bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';

    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import _ from 'lodash';
    import Modeler from 'bpmn-js/lib/Modeler';
    import * as CamundaExtensionModule from 'camunda-bpmn-moddle/lib';
    import * as CamundaModdle from 'camunda-bpmn-moddle/resources/camunda.json';
    import * as PropertiesPanelModule from 'bpmn-js-properties-panel';
    import * as PropertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';

    @Component({})
    export default class BpmnEdit extends Vue {
        modeler: any = null;

        @Prop(String) value: string;

        lastExportedXml = null;


        exportXml = _.debounce(this.debouncedExportXml, 500);

        @Watch('value')
        onValueChange(newXml) {
            console.log('onValueChange');
            if (this.lastExportedXml !== newXml) {
                console.log('value changed, import xml');
                this.importXml(newXml);
            }
        }

        debouncedExportXml() {
            console.log('debouncedExportXml');

            this.modeler.saveXML((err, xml) => {
                if (err) {
                    console.error('BPMN export error');
                    console.error(err);
                } else {
                    const ids = this.modeler._definitions.rootElements
                        .filter(el => el.$type === 'bpmn:Process')
                        .map(el => el.id).join(' ');
                    this.lastExportedXml = xml;
                    this.$emit('input', xml);
                    this.$emit('processDefinitions', ids);
                }

            });
        }

        mounted() {
            console.log('mounted')
            const selector = document.querySelector('#canvas');
            const properties = document.querySelector('#properties');
            this.modeler = new Modeler({
                container: selector,
                width: '100%',
                height: 'calc(100vh - 50px - 32px - 64px - 70px - 36px)',
                keyboard: {
                    bindTo: selector,
                },
                propertiesPanel: {
                    parent: properties,
                },
                additionalModules: [CamundaExtensionModule, PropertiesPanelModule, PropertiesProviderModule],
                moddleExtensions: {
                    camunda: CamundaModdle,
                },
            });
            if (this.value && this.value !== '') {
                this.importXml(this.value);
            }

            this.modeler.on('commandStack.changed', this.exportXml);

        }

        importXml(xml: string) {
            if (this.modeler) {
                this.modeler.importXML(xml, err => {
                    if (err) {
                        console.error('BPMN import error');
                        console.error(err);
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
        height: calc(100vh - 50px - 32px - 64px - 70px - 36px);
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
