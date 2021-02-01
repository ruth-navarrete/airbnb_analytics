import Vue from 'vue'
import VueRouter from 'vue-router'
import SearchPage from "@/views/SearchPage";
import Modify from "@/views/Modify";
import Chart from "@/views/Chart";

Vue.use(VueRouter)

const routes = [
    {
        path: '/search',
        name: 'search',
        component: SearchPage
    },
    {
        path: '/modify',
        name: 'modify',
        component: Modify
    },
    {
        path: '/chart',
        name: 'chart',
        component: Chart
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    console.log(to.path)
    if (to.path === '/') {
        return next('/search')
    }
    next()
})

export default router
