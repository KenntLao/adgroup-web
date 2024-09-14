import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../components/LayoutComponent.vue';
import Dashboard from '../components/DashboardComponent.vue';
import IPAddresses from '../components/IpAddressComponent.vue';
import AuditLog from '../components/AuditLogComponent.vue';
import Login from '../components/LoginComponent.vue';

const routes = [
  {
    path: '/',
    component: Layout,
	meta: { requiresAuth: true },
    children: [
		{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
		{ path: '/ip-addresses', name: 'IpAddress', component: IPAddresses },
		{ path: '/audit-log', name: 'AuditLog', component: AuditLog },
		{ path: '', redirect: '/dashboard' }
    ]
  },
  { path: '/login', name: 'Login', component: Login },
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('authToken');
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	if (requiresAuth && !token) {
		// Redirect to login if the route requires authentication and no token is found
		next('/login');
	} else {
		next(); // Proceed to the route
	}
});

export default router;