import { createRouter, createWebHistory } from 'vue-router'
import SearchPage from '@/pages/SearchPage.vue'
import JobDetail from '@/pages/JobDetail.vue'
import CandidaturesPage from '@/pages/CandidaturesPage.vue'


const routes = [
    { path: '/', redirect: '/search' },
    { path: '/search', name: 'search', component: SearchPage },
    { path: '/jobs/:id', name: 'job-detail', component: JobDetail, props: true },
    { path: '/candidatures', name: 'candidatures', component: CandidaturesPage },
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router