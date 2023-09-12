import auth from './auth';

export const api = {
	apiUrl: 'http://localhost:8000/api',
	...auth
};

export default ({ Vue }) => {
	Vue.prototype.$api = api;
};
