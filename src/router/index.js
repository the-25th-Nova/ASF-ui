import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import { get } from '../utils/storage';
import VueMeta from 'vue-meta';

Vue.use(VueRouter);
Vue.use(VueMeta);

import routes from './routes';

const router = new VueRouter({
	routes,
	base: window.__BASE_PATH__ ? window.__BASE_PATH__ : '/',
	mode: 'history'
});

router.beforeEach(async (routeTo, routeFrom, next) => {
	if (!get('welcome') && routeTo.name !== 'welcome') return next({ name: 'welcome' });

	const noPasswordRequired = routeTo.matched.every(route => route.meta.noPasswordRequired);
	if (noPasswordRequired || await store.dispatch('auth/validate')) return next();

	return next({ name: 'setup' });
});

export default router;
