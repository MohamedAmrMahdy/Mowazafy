import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/HomeScreen.vue';
import Login from './views/LoginForm.vue';
import Checkins from './views/CheckinsForm.vue';
import DashBoardLayout from './views/DashBoardLayout.vue';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/checkin',
            component: Checkins
        },
        {
            path: "/dashboard",
            component: DashBoardLayout,
            meta: {
                requiresAuth: true
            },
            children: [
                { 
                    path: "/", 
                    redirect: '/dashboard/main',
                },
                {
                    path: "main",
                    name: "Dashboard",
                    component: () => import("./views/DashBoard.vue")
                },
                {
                    path: "employees",
                    name: "Employees",
                    component: () => import("./views/EmployeesList.vue")
                },
                {
                    path: "vacations",
                    name: "Vacations",
                    component: () => import("./views/Vacations.vue")
                },
                {
                    path: "attendance",
                    name: "Attendance",
                    component: () => import("./views/AttendanceList.vue")
                },
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.accessToken) {
          next();
          return;
        }
        next("/login");
      } else {
        next();
      }
  });

export default router;