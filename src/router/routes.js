export const myRoutes = [
	{
		path: '/', component: () => import('../components/auth/Login'), name: 'loginRoute',
		meta: { requiresLogin: false }
	},
	{
		path: '/login', component: () => import('../components/auth/Login'), name: 'loginRoute',
		meta: { requiresLogin: false }
	},
	{
		path: '/users', component: () => import('../components/Pages/Users'), name: 'usersRoute',
		meta: { requiresLogin: true }
	},
	{
		path: '/tasks', component: () => import('../components/Tasks/All'), name: 'taskAllRoute',
		meta: { requiresLogin: true }
	},
	{
		path: '/tasks/new', component: () => import('../components/Tasks/New'), name: 'taskNewRoute',
		meta: { requiresLogin: true }
	},
	{ path: '*', component: () => import('../components/Pages/PageNotFound') }
];