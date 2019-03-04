import {MenuModel} from './menu.model'

export const MENU: MenuModel[] = [

  {state: '/', name: 'axon.menu.tasks', type: 'link', icon: 'fas fa-tasks'},
  {state: '/processes', name: 'axon.menu.processes', type: 'link', icon: 'fas fa-play'},
  {state: '/org-structure', name: 'axon.menu.orgStructure', type: 'link', icon: 'fas fa-sitemap'},
  {state: '/projects', name: 'axon.menu.projects', type: 'link', icon: 'fas fa-cubes'},
  {name: 'axon.menu.config.title', type: 'header'},
  {
    state: '/config/', name: 'axon.menu.config.bpm.title', type: 'sub', icon: 'fas fa-tasks',
    children: [
      {
        state: '/config/bpm-diagrams', name: 'axon.menu.config.bpm.bpmDiagrams',
        type: 'link', icon: 'far fa-object-group',
      },
      {state: '/config/process-definitions', name: 'axon.menu.config.bpm.processDefs', type: 'link', icon: 'fas fa-upload'},
      {
        state: '/config/business-processes',
        name: 'axon.menu.config.bpm.processes',
        type: 'link',
        icon: 'fas fa-list',
      },
    ],
  },
  {
    state: '/knowledge-config/', name: 'axon.menu.config.knowledge.title', type: 'sub', icon: 'fas fa-database',
    children: [
      {
        state: '/knowledge-config/schemas', name: 'axon.menu.config.knowledge.dataSchemas',
        type: 'link', icon: 'fas fa-table',
      },
    ],
  },
  {state: '/config/1', name: 'axon.menu.config.orgStructure', type: 'link', icon: 'fas fa-sitemap'},
  {state: '/config/2', name: 'axon.menu.config.forms', type: 'link', icon: 'fas fa-id-card'},
  {state: '/config/3', name: 'axon.menu.config.projects', type: 'link', icon: 'fas fa-cubes'},


  {state: '/admin', name: 'axon.menu.admin', type: 'link', icon: 'fas fa-university'},

];

