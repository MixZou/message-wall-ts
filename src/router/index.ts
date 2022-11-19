import {createRouter, createMemoryHistory, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [{
    path:'/',
    name:'Home',
    component:()=>import('../views/HomePage.vue')
},{
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: ()=>import('../views/NotFound.vue')
}]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export  default router