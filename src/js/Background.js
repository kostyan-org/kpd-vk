/**
 * Стартует background
 */
const start = async function () {
  await chrome.runtime.sendMessage({ msg: 'start' },
    () => {
      if (!chrome.runtime.lastError) {
        // console.log('received sendBGstart', response)
      }
    })
}
/**
 * Останавливает background
 */
const stop = async function () {
  await chrome.runtime.sendMessage({ msg: 'stop' },
    () => {
      if (!chrome.runtime.lastError) {
        // console.log('received sendBGstop', response)
      }
    })
}

export {
  start,
  stop
}
