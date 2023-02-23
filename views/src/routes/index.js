import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import axios from "axios"

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/home',
        component: Home,
        beforeEnter: async (to, from, next) => {
            if (!localStorage.getItem("authorization")) return next("/");
            try {
                await axios.get("/api/admin/users", { headers: { Authorization: localStorage.getItem("authorization") } })
                next();
            } catch (error) {
                return next("/");
            }
        },

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