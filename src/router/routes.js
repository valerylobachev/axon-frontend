const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {path: '', component: () => import('pages/TasksPage.vue')},
      {path: 'processes', component: () => import('pages/ProcessesPage.vue')},
      {path: 'org-structure', component: () => import('pages/OrgStructurePage.vue')},
      {path: 'projects', component: () => import('pages/ProjectsPage.vue')},
      {path: 'config/bpm-diagrams', component: () => import('pages/config/BpmDiagramsPage.vue')},
      {path: 'config/bpm-diagram/:action/:id', component: () => import('pages/config/BpmDiagramPage.vue')},
      {path: 'config/process-definitions', name: 'ProcessDefinitions', component: () => import('pages/config/ProcessDefinitionsPage.vue')},
      {path: 'config/data-schemas', component: () => import('pages/config/DataSchemasPage.vue')},
      {path: 'config/data-schema/:action/:key', component: () => import('pages/config/DataSchemaPage.vue')},

    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
