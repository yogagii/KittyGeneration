
const routes = [
  {
    path: '/',
    //component: () => import('pages/Index.vue')
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'crossover', component: () => import('pages/crossover.vue') },
      { path: 'style', component: () => import('pages/style.vue') },
      { path: 'Individualization', component: () => import('pages/Individualization.vue') },
      { path: 'solution', component: () => import('pages/Error404.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
