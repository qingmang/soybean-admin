import type { Component } from 'vue';

type ViewComponent = Record<string, () => Promise<Component>>;

type SelectComponent<T = any> =
  | [
      {
        label: string;
        value: string;
      }
    ]
  | T;

const importViews = import.meta.glob('./**/index.vue');

const COMPONENTS_KEY = 'components';
const PREFIX = './';
const SUFFIX = '/index.vue';
const PATH_SPLIT_MARK = '/';
const ROUTE_KEY_SPLIT_MARK = '_';
/** 系统的内置路由，该文件夹名称不作为RouteKey */
const SYSTEM_VIEW = 'system-view_';

/** 排除不需要slelect的组件 */
const excludeRouterKeys: Array<string> = [
  COMPONENTS_KEY,
  'system-view',
  'exception',
  'plugin'
];

/** 过滤掉组件文件 */
const viewKeys = Object.keys(importViews).filter(key => !key.includes(COMPONENTS_KEY));

function getViewComponent() {
  const components: ViewComponent = {};
  viewKeys.forEach(key => {
    const routeKey = key
      .replace(PREFIX, '')
      .replace(SUFFIX, '')
      .replaceAll(PATH_SPLIT_MARK, ROUTE_KEY_SPLIT_MARK)
      .replace(SYSTEM_VIEW, '');
    components[routeKey] = importViews[key];
  });
  return components;
}

/** 组合组件封装为select数据 */
function getViewComponentSelect() {
  //const selectKeys: Array<object> = [];
   const selectKeys:SelectComponent = [];
  /**去除系统乱七八糟的，只保留模块的 */
  const filteredArr = Object.keys(importViews).filter(key => !excludeRouterKeys.some(item => key.includes(item)));
  filteredArr.forEach(key => {
    const routeKey = key
      .replace(PREFIX, '')
      .replace(SUFFIX, '')
      .replaceAll(PATH_SPLIT_MARK, ROUTE_KEY_SPLIT_MARK)
      .replace(SYSTEM_VIEW, '');

		const path = PATH_SPLIT_MARK + key.replace(PREFIX, '').replace(SUFFIX, '');
    selectKeys.push({ label: routeKey, value: path });
  });
  return selectKeys;
}

export const views = getViewComponent();
export const viewsSelect = getViewComponentSelect();
