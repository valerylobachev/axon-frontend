export default {
  axon: {
    title: 'Annette Axon',
    menu: {
      tasks: 'Задачи',
      processes: 'Процессы',
      orgStructure: 'Огр. структура',
      projects: 'Проекты',

      config: {
        title: 'КОНФИГУРАЦИЯ',
        bpm: {
          title: 'Бизнес процессы',
          bpmDiagrams: 'Модели процессов',
          processes: 'Процессы',
        },
        orgStructure: 'Орг. структура',
        forms: 'Формы',
        knowledge: 'Данные',
        projects: 'Проекты',
      },
      admin: 'Администрирование',
    },
    bpm: {
      md: {
        bpmDiagram: {
          id: 'Ид',
          name: 'Наименование',
          description: 'Описание',
          notation: 'Нотация',
          processDefinitions: 'Определения процессов',
          xml: 'XML',
          delete: 'Удалить модель {name}?',
        },
      },
      form: {
        bpmDiagrams: {
          title: 'BPM модели',
          actions: 'Действия',
          createBPMN: 'Создать BPMN',
          createDMN: 'Создать DMN',
          createCMMN: 'Создать CMMN',
          filter: 'Фильтр',
          notFound: 'BPM модели не найдены',
        },
        bpmDiagramForm: {
          createTitle: 'Создание BPM модели',
          viewTitle: 'Просмотр BPM модели',
          editTitle: 'Изменение BPM модели',
          nameRequired: 'Наименование обязательно',
          xmlRequired: 'XML обязателен',
          infoTab: 'Инфо',
          designerTab: 'Дизайнер',
          xmlTab: 'XML',
        },
      },

    },
    knowledge: {
      md: {
        dataSchema: {
          key: 'Ключ',
          name: 'Наименование',
          description: 'Описание',
          fields: 'Поля',
          delete: 'Удалить схему данных {name}?',
        },
      },
      form: {
        dataSchemaList: {
          title: 'Схема данных',
          actions: 'Действия',
          create: 'Создать',
          filter: 'Фильтр',
          notFound: 'Схемы данных не найдены.',
        },
        dataSchemaForm: {
          createTitle: 'Создание схемы данных',
          viewTitle: 'Просмотр схемы данных',
          editTitle: 'Изменение схемы данных',
          nameRequired: 'Наименование обязательно',
          keyRequired: 'Ключ обязателен',
        },
      },

    },
    shared: {
      delete: 'Удалить',
      cancel: 'Отмена',
      error: 'Ошибка',
      save: 'Сохранить',
      edit: 'Изменить',
      view: 'Просмотр',
      saved: 'Сохранено',
      changed: 'Изменено',
    },
  },
};
