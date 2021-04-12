import localforage from "localforage";
import { APPLICATION_NAME } from "@/config";
import { formatDateTime } from "@/utils/util";

// 创建本地储存仓库
const cacheStore = localforage.createInstance({
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
  name: APPLICATION_NAME
});

// 创建本地缓存仓库
const localStore = localforage.createInstance({
  driver: [localforage.LOCALSTORAGE, localforage.INDEXEDDB, localforage.WEBSQL],
  name: APPLICATION_NAME
});

// indexDB
// 获取本地永久储存
export const getStore = async (k: string) => {
  try {
    const { data = null } = (await cacheStore.getItem(k)) || {};
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// 写入本地永久储存
export const setStore = (k: string, v: any) => {
  try {
    cacheStore.setItem(k, {
      date: formatDateTime({ formatType: "yyyy/mm/dd hh:mm:ss" }),
      data: v
    });
  } catch (e) {
    console.error(e);
  }
};

// 移除本地永久储存
export const removeStore = (k: string) => {
  try {
    cacheStore.removeItem(k);
  } catch (e) {
    console.error(e);
  }
};

// 移除本地所有永久储存
export const clearStore = () => {
  try {
    cacheStore.clear();
  } catch (e) {
    console.error(e);
  }
};

// 获取本地永久储存所有 value/key 键值对。
export const getStoreIterate = async (fn: any = function() {}) => {
  try {
    return (await cacheStore.iterate(fn)) || [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

// localStore
// 获取本地永久缓存
export const getLocalStore = async (k: string) => {
  try {
    const { data = null } = (await localStore.getItem(k)) || {};
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// 写入本地永久缓存
export const setLocalStore = (k: string, v: any) => {
  try {
    localStore.setItem(k, {
      date: formatDateTime({ formatType: "yyyy/mm/dd hh:mm:ss" }),
      data: v
    });
  } catch (e) {
    console.error(e);
  }
};

// 移除本地永久缓存
export const removeLocalStore = (k: string) => {
  try {
    localStore.removeItem(k);
  } catch (e) {
    console.error(e);
  }
};

// 清除本地所有永久缓存
export const clearLocalStore = () => {
  try {
    localStore.clear();
  } catch (e) {
    console.error(e);
  }
};

// 获取本地永久储存所有 value/key 键值对。
export const getLocalStoreIterate = async (fn: any = function() {}) => {
  try {
    return (await localStore.iterate(fn)) || [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

// localStorage
// 获取本地永久缓存
export const getLocalStorage = (k: string) => {
  const strings: string | null = window.localStorage.getItem(
    `${APPLICATION_NAME}___${k}`
  );
  return strings ? JSON.parse(strings) : strings;
};

// 写入本地永久缓存
export const setLocalStorage = (k: string, v: any) => {
  window.localStorage.setItem(`${APPLICATION_NAME}___${k}`, JSON.stringify(v));
};

// 移除本地永久缓存
export const removeLocalStorage = (k: string) => {
  window.localStorage.removeItem(`${APPLICATION_NAME}___${k}`);
};

// 清除本地所有永久缓存
export const clearLocalStorage = () => {
  window.localStorage.clear();
};

// sessionStorage
// 获取网页即使缓存
export const getSessionStorage = (k: string) => {
  const strings: string | null = window.sessionStorage.getItem(
    `${APPLICATION_NAME}___${k}`
  );
  return strings ? JSON.parse(strings) : strings;
};

// 写入网页即使缓存
export const setSessionStorage = (k: string, v: any) => {
  window.sessionStorage.setItem(
    `${APPLICATION_NAME}___${k}`,
    JSON.stringify(v)
  );
};

// 移除网页即使缓存
export const removeSessionStorage = (k: string) => {
  window.sessionStorage.removeItem(`${APPLICATION_NAME}___${k}`);
};

// 清除网页所有即使缓存
export const clearSessionStorage = () => {
  window.sessionStorage.clear();
};
