import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/home',
        component: Home,
    },
    {
        path: '*',
        redirect: '/login',
    },
]

const router = new VueRouter({
    mode: 'history',
    routes,
})

export default router