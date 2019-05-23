import Vue from 'vue';
import {
  number,
  money,
  price,
} from './number';
import {
  fullDate,
} from './date';

export default {
  install() {
    Vue.filter('number', number);
    Vue.filter('money', money);
    Vue.filter('price', price);
    Vue.filter('fullDate', fullDate);
  },
};
