let timerId = null
const timerTime = 1000

/**
 * Получает настройки из хранилища
 * @returns
 */
const getSettings = async function () {
  return await chrome.storage.local.get(null)
}

/**
 * Интервальная отправка сообщений
 */
const startInterval = async () => {
  const settings = await getSettings()
  const isWork = settings?.backgroundWork

  if (isWork) {
    clearInterval(timerId)

    timerId = setInterval(async function () {
      await sendQuery()
    }, timerTime)
  }
}

/**
 * Отправка сообщения в активную вкладку
 */
const sendQuery = async function () {
  chrome.tabs.query({ active: true, currentWindow: true },
    async function (tabs) {
      if (tabs.length < 1) return
      const settings = await getSettings()
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          hideMenu: settings?.hideMenu || false,
          hideInfoBlock: settings?.hideInfoBlock || false,
          hideWidgets: settings?.hideWidgets || false,
          hideFixed: settings?.hideFixed || false,
          gomez: settings?.gomez || false,
          black: settings?.black || JSON.stringify([]),
          white: settings?.white || JSON.stringify([])
        },
        function () {
          if (!chrome.runtime.lastError) {
            // if you have any response
          } else {
            // if your document doesn’t have any response, it’s fine but you should actually handle
            // it and we are doing this by carefully examining chrome.runtime.lastError
          }
        })
    })
}

/**
 * Обработчик chrome.runtime.onMessage
 * @param {any} request Пришедшие данные
 * @param {MessageSender} sender Контекст
 * @param {function} sendResponse Функция callback
 */
const backHandler = async function (request, sender, sendResponse) {
  const response = {}
  response.data = null
  response.err = null

  if (request.msg === 'start') {
    await startInterval()
    response.data = 'start ok'
    response.err = null
    sendResponse(response)
  }

  if (request.msg === 'stop') {
    clearInterval(timerId)
    response.data = 'stop ok'
    response.err = null
    sendResponse(response)
  }

  if (request.msg === 'ping') {
    response.data = 'ping ok'
    response.err = null
    sendResponse(response)
  }
}

startInterval()

chrome.runtime.onMessage.addListener(backHandler)

// При открытии расширения, присылается стоп беку и
// а при закрытии расширения бек стартуется заново
// это сделано чтобы не ��акладывались
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === 'popup') {
    port.onDisconnect.addListener(async function () {
      await startInterval()
    })
  }
})
