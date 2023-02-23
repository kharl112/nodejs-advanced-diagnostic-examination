import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home/Home.vue'

// children - home
import Manage from '@/components/Home/Children/Manage.vue'
import Create from '@/components/Home/Children/Create.vue'
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
        children: [
            { path: "manage", component: Manage },
            { path: "create", component: Create },
            {
                path: '',
                redirect: 'manage',
            },
        ]
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