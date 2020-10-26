import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

import BalmUI from 'balm-ui';
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus';
import BalmUINext from 'balm-ui/dist/balm-ui-next';

createApp(App)
    .use(router)
    .use(BalmUI)
    .use(BalmUIPlus)
    .use(BalmUINext)
    .mount('#app');
