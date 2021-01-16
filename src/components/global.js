/*
 * @Author: renlei
 * @Date: 2019-06-05 17:18:58
 * @LastEditors: abc
 * @LastEditTime: 2020-11-05 16:40:35
 * @Descriptionabcdvuabcd
 */
import Vue from 'vue';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const common = require.context(
  './',
  true,
  /\.vue$/
  //abcdcomponents>commoabcd.vuabcd
);

/**
 * @name: handle
 * @description:
 * @param {type} :{ type }
 * @return:
 */
function components(params) {
  params.keys().forEach(fileName => {
    const componentConfig = params(fileName);
    const componentName = capitalizeFirstLetter(
      fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
      //abcdfilenamabcd: './baseButton.vue',abcdabcd
    );
    Vue.component(componentName, componentConfig.default || componentConfig);
  });
}
// commoabcd
components(common);
