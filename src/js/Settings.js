import store from '@/store'
import * as LS from '@/js/LocalStorage.js'

/**
 * Настройки из vuex
 * @returns
 */
const get = function () {
  return store.getters.getSettings
}

/**
 * Синхронизирует настройки в vuex и локальном хранилище
 * @param {*} settings
 */
const sync = async function (settings) {
  await save(await LS.getAll())
  const oldSettings = get()
  if (Object.getOwnPropertyNames(oldSettings).length === 0) {
    await LS.saveObj(settings)
    store.commit('saveSettings', settings)
  }
}

/**
 * Сохраняет
 * @param {*} settings
 */
const save = async function (settings) {
  await LS.clear()
  await LS.saveObj(settings)
  store.commit('saveSettings', settings)
}

/**
 * Количество в белом списке
 * @returns {int}
 */
const countWhite = function () {
  return JSON.parse(get().white).length
}

/**
 * Количество в черном списке
 * @returns {int}
 */
const countBlack = function () {
  return JSON.parse(get().black).length
}

/**
 * Проверяет в белом списке
 * @param {string} link
 * @returns {boolean}
 */
const hasInWhite = function (link) {
  return JSON.parse(get().white).indexOf(link) > -1
}

/**
 * Проверяет в черном списке
 * @param {string} link
 * @returns {boolean}
 */
const hasInBlack = function (link) {
  return JSON.parse(get().black).indexOf(link) > -1
}

/**
 * Добавляет в белый список
 * @param {string} link
 * @returns
 */
const addWhite = async function (link) {
  if (countWhite() >= get().limitBlackWhite) return
  if (hasInWhite(link)) return
  await removeBlack(link)
  const settings = Object.assign({}, get())
  settings.white = JSON.parse(settings.white)
  settings.white.push(link)
  settings.white = JSON.stringify(settings.white)
  await save(settings)
}

/**
 * Добавляет в черный список
 * @param {string} link
 * @returns
 */
const addBlack = async function (link) {
  if (countBlack() >= get().limitBlackWhite) return
  if (hasInBlack(link)) return
  await removeWhite(link)
  const settings = Object.assign({}, get())
  settings.black = JSON.parse(settings.black)
  settings.black.push(link)
  settings.black = JSON.stringify(settings.black)
  await save(settings)
}

/**
 * Удаляет в белом списоке
 * @param {string} link
 * @returns
 */
const removeWhite = async function (link) {
  if (!hasInWhite(link)) return
  const settings = Object.assign({}, get())
  settings.white = JSON.parse(settings.white)
  settings.white.splice(settings.white.indexOf(link), 1)
  settings.white = JSON.stringify(settings.white)
  await save(settings)
}

/**
 * Удаляет в черном списоке
 * @param {string} link
 * @returns
 */
const removeBlack = async function (link) {
  if (!hasInBlack(link)) return
  const settings = Object.assign({}, get())
  settings.black = JSON.parse(settings.black)
  settings.black.splice(settings.black.indexOf(link), 1)
  settings.black = JSON.stringify(settings.black)
  await save(settings)
}

/**
 * Очистка белого списка
 */
const resetWhite = async function () {
  const settings = Object.assign({}, get())
  settings.white = JSON.stringify([])
  await save(settings)
}

/**
 * Очистка черного списка
 */
const resetBlack = async function () {
  const settings = Object.assign({}, get())
  settings.black = JSON.stringify([])
  await save(settings)
}

export {
  get,
  sync,
  save,
  countWhite,
  countBlack,
  hasInWhite,
  hasInBlack,
  addWhite,
  addBlack,
  removeWhite,
  removeBlack,
  resetWhite,
  resetBlack
}
