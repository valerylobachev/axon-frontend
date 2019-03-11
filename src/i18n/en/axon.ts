export default {
  axon: {
    title: 'Annette Axon',
    menu: {
      tasks: 'Tasks',
      processes: 'Processes',
      orgStructure: 'Org. Structure',
      projects: 'Projects',

      config: {
        title: 'CONFIG',
        bpm: {
          title: 'BPM',
          bpmDiagrams: 'Diagrams',
          processDefs: 'Process Definitions',
          processes: 'Business Processes',
        },
        orgStructure: 'Org. Structure',
        forms: 'Forms',
        knowledge: {
          title: 'Knowledge',
          dataSchemas: 'Data Schemas',
          processes: 'Processes',
        },
        projects: 'Projects',
      },
      admin: 'Admin',
    },
    bpm: {
      md: {
        bpmDiagram: {
          id: 'Id',
          name: 'Name',
          description: 'Description',
          notation: 'Notation',
          processDefinitions: 'Process Defs',
          xml: 'XML',
          delete: 'Are you sure to delete diagram {name}?',
        },
        processDef: {
          key: 'Key',
          name: 'Name',
          description: 'Description',
          version: 'Version',
          delete: 'Are you sure to delete diagram {name}?',
          invalidProcessReference: 'Invalid process reference',
        },
        businessProcess: {
          key: 'Key',
          name: 'Name',
          description: 'Description',
          processReference: 'Process reference',
          dataSchemaKey: 'Data schema',
          defaults: 'Defaults',
          delete: 'Are you sure to delete business process {name}?',
        },
      },
      form: {
        bpmDiagrams: {
          title: 'BPM Diagrams',
          actions: 'Actions',
          createBPMN: 'Create BPMN',
          createDMN: 'Create DMN',
          createCMMN: 'Create CMMN',
          filter: 'Filter',
          notFound: 'No diagram has been found.',
          deployedTitle: 'Deployment',
          deployed: 'Diagram {name} successfully deployed.',
        },
        bpmDiagramForm: {
          createTitle: 'Create BPM diagram',
          viewTitle: 'View BPM diagram',
          editTitle: 'Edit BPM diagram',
          nameRequired: 'Name required',
          xmlRequired: 'XML required',
          infoTab: 'Info',
          designerTab: 'Designer',
          xmlTab: 'XML',
        },
        processDefList: {
          title: 'Process definitions',
          notFound: 'No process definition has been found.',
          latest: 'Latest versions',
        },
        processDefModalSelector: {
          title: 'Select process definition',
        },
        businessProcessList: {
          title: 'Business Processes ',
          actions: 'Actions',
          create: 'Create',
          filter: 'Filter',
          notFound: 'No business process has been found.',
        },
        businessProcessForm: {
          createTitle: 'Create business process',
          viewTitle: 'View business process',
          editTitle: 'Edit business process',
          keyRequired: 'Key required',
          nameRequired: 'Name required',
          infoTab: 'Info',
          defaultsTab: 'Default Values',
        },
      },

    },
    knowledge: {
      md: {
        dataSchema: {
          key: 'Key',
          name: 'Name',
          description: 'Description',
          fields: 'Fields',
          delete: 'Are you sure to delete data schema {name}?',
          invalidDataSchema: 'Invalid data schema',
        },
        dataSchemaField: {
          key: 'Key',
          name: 'Name',
          caption: 'Caption',
          datatype: 'Data type',
          value: 'Default value',
          elementDatatype: 'Element data type',
          delete: 'Are you sure to delete field {key} - {name}?',
        },
        datatype: {
          element: 'Element data type',
          record: 'Data schema'
        }
      },
      form: {
        dataSchemaList: {
          title: 'Data Schemas',
          actions: 'Actions',
          create: 'Create',
          filter: 'Filter',
          notFound: 'No data schema has been found.',
        },
        dataSchemaForm: {
          createTitle: 'Create data schema',
          viewTitle: 'View data schema',
          editTitle: 'Edit data schema',
          nameRequired: 'Name required',
          keyRequired: 'Key required',
          infoTab: 'Info',
          fieldsTab: 'Fields',
        },
        schemaFieldTable: {
          title: 'Data schema fields',
          notFound: 'No data schema fields has been defined.',
        },
        schemaFieldDialog: {
          viewTitle: 'View data schema field',
          editTitle: 'Edit data schema field',
        },
        dataSchemaSelectDialog: {
          title: 'Select data schema',
        },
      },

    },
    shared: {
      create: 'Create',
      delete: 'Delete',
      cancel: 'Cancel',
      error: 'Error',
      save: 'Save',
      edit: 'Edit',
      view: 'View',
      saved: 'Saved',
      changed: 'Changed',
      ok: 'Ok',
      clear: 'Clear',
      find: 'Find',
      filter: 'Filter',
      actions: 'Actions',
      close: 'Close',
      checkRequirements: 'Action cannot be performed. Please, check requirements.'
    },
  },
};
