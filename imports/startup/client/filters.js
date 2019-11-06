import moment from 'moment';
import Vue from 'vue';

Vue.filter('date', value => moment(value).format('DD/MM/YYYY HH:mm'));
Vue.filter('boolean', value => (value ? 'Yes' : 'No'));
Vue.filter('list', value => (value || []).join(', '));
Vue.filter('assignedToFilter', value => {
    let retArr = [];
    if(value && value.length > 0) {
        value.forEach((user) => {
            retArr.push(user.text)
        });
        return retArr.join(', ')
    }
    return ''
})