/**
 * Получает все из локального хранилища
 * @returns
 */
const getAll = async function () {
  return await chrome.storage.local.get(null)
}
/**
 * Получает по ключу из локального хранилища
 * @param {string} key
 * @returns {string}
 */
const getByKey = async function (key) {
  const value = await chrome.storage.local.get(key)
  return value[key]
}
/**
 * Получает из локального хранилища
 * @param {*} obj
 * @returns
 */
const getObj = async function (obj) {
  return await chrome.storage.local.get(obj)
}
/**
 * Сохраняет объект в локальном хранилище
 * @param {*} obj
 */
const saveObj = async function (obj) {
  await chrome.storage.local.set(obj)
}
/**
 * Удаляет из локального хранилища по ключу
 * @param {*} key
 */
const removeKeyOrKeys = async function (key) {
  await chrome.storage.local.remove(key)
}
/**
 * Очистка локального хранилища
 */
const clear = async function () {
  await chrome.storage.local.clear()
}

export {
  getAll,
  getByKey,
  getObj,
  saveObj,
  removeKeyOrKeys,
  clear
}
