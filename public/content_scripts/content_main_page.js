/**
 * Зона риска =)
 * @todo Продумать как упростить дебаг
 */
const selectorWlPost = 'wl_post'
const selectorPost = '[id^="post-"]._post.post.page_block'
const selectorPostAll = '[id^="post-"]._post.post.page_block.all'
const selectorPageWallPosts = 'page_wall_posts'

const selectorWlReplies = '.wl_replies'
const selectorReplies = '.replies'
const selectorReply = '.reply.reply_dived'
const selectorReplyAuthor = 'a.author'

const selectorPostTime = 'div.PostHeaderSubtitle a.PostHeaderSubtitle__link'
const selectorPostTimeA = 'div.PostHeaderSubtitle a.PostHeaderSubtitle__link'
const selectorPostAuthorAva = 'div.PostHeader__avatar img'
const selectorPostAuthor = 'a.PostHeaderTitle__authorLink'

const selectorGroupsTabs = 'groups_tabs_block'
const selectorGroupsTabsContent = 'group_tabs_content'
const selectorGroupMenu = 'group_section_menu'
const selectorGroupWidget = '[id$="_app_widget"]'
const selectorGroupFixed = 'wall_fixed'

const selectorPopup = '.wl_post_body_wrap'
const selectorWallText = '.wall_text'
const selectorWallPostText = '.wall_post_text'
const selectorWallReplyText = '.wall_reply_text'

const styleBlurOn = 'blur(2px)'
const styleBlurOff = 'blur(0)'
const styleShadowOn = 'drop-shadow(1px 1px 5px green)'
const styleShadowOff = 'drop-shadow(0 0 0)'

/**
 * Борьба с любителями писать тексты в один столбик
 * Название функции в честь одноименного пользователя
 * @param {string} text
 * @returns {string}
 */
function gomez (text) {
  let out = ''
  text.split('<br>').forEach((t) => {
    t = t.replace('  ', '')

    if (t[0] === ' ') {
      t = t.substring(1)
    }

    if (t[t.length - 1] === ' ') {
      t = t.substring(0, t.length - 1)
    }

    const counter = t.split(' ').length

    if (counter > 2) {
      t += '<br>'
    }
    out += t + ' '
  })
  return out
}

/**
 * Это страница просмотра одного поста?
 * @returns {boolean}
 */
function isOnePost () {
  return /wall-?\d+_\d+/i.test(window.location.toString())
}

/**
 * Это всплывающий пост на странице одного поста?
 * @returns {boolean}
 */
function isPopupOnePost () {
  return isOnePost() && document.getElementById(selectorWlPost) !== null
}

/**
 * Получает одиночный пост
 * @returns {(Element|HTMLElement|null)}
 */
function getOnePost () {
  let onePost

  if (isPopupOnePost()) {
    onePost = document.getElementById(selectorWlPost)
  } else {
    onePost = document.querySelector(selectorPost)
  }
  return onePost
}

/**
 * Перебирает посты и применяет к ним функцию обработчик
 * @param {any} handler
 */
function postIterator (handler) {
  const posts = document.getElementById(selectorPageWallPosts)

  for (const post of posts.querySelectorAll(selectorPostAll)) {
    handler(post)
  }
}

/**
 * Перебирает комментарии к посту и применяет к ним функцию обработчик
 * @param {Element} post
 * @param {any} handler
 */
function replyIterator (post, handler) {
  if (post === null) return

  let replies

  if (isPopupOnePost()) {
    replies = post.querySelector(selectorWlReplies)
  } else {
    replies = post.querySelector(selectorReplies)
  }

  if (replies === null) return

  for (const reply of replies.querySelectorAll(selectorReply)) {
    handler(reply)
  }
}

/**
 * Получает объект поста
 * @param {Element} post
 * @returns
 */
function postParser (post) {
  const out = {}
  out.post = {}
  out.author = {}
  out.post.link = 'wall' + post.dataset.postId
  out.post.time = post.querySelector(selectorPostTime).innerText
  out.author.ava = post.querySelector(selectorPostAuthorAva).src
  out.author.name = post.querySelector(selectorPostAuthor).innerText
  out.author.link = post.querySelector(selectorPostAuthor).href
  return out
}

/**
 * Получает объект поста только на странице одного поста
 * @todo Подумать про фабрику
 * @param {Element} post
 * @returns
 */
function onePostParser (post) {
  const out = {}
  out.post = {}
  out.author = {}
  out.post.link = 'wall' + post.dataset.postId
  out.post.time = post.querySelector(selectorPostTimeA).innerText
  out.author.ava = post.querySelector(selectorPostAuthorAva).src
  out.author.name = post.querySelector(selectorPostAuthor).innerText
  out.author.link = post.querySelector(selectorPostAuthor).href
  return out
}

/**
 * Обработчик chrome.runtime.onMessage
 * @param {any} request Пришедшие данные
 * @param {MessageSender} sender Контекст
 * @param {function} sendResponse Функция callback
 * @returns {void}
 */
function frontHandler (request, sender, sendResponse) {
  const response = {}
  response.data = null
  response.err = null

  if (request.hideInfoBlock === true) {
    const divTabs = document.getElementById(selectorGroupsTabs)

    if (divTabs) {
      divTabs.style.display = 'none'
    }

    const divContent = document.getElementById(selectorGroupsTabsContent)

    if (divContent) {
      divContent.style.display = 'none'
    }
  } else if (request.hideInfoBlock === false) {
    const divTabs = document.getElementById(selectorGroupsTabs)

    if (divTabs) {
      divTabs.style.display = 'block'
    }

    const divContent = document.getElementById(selectorGroupsTabsContent)

    if (divContent) {
      divContent.style.display = 'block'
    }
  }

  if (request.hideMenu === true) {
    const div = document.getElementById(selectorGroupMenu)

    if (div) {
      div.style.display = 'none'
    }
  } else if (request.hideMenu === false) {
    const div = document.getElementById(selectorGroupMenu)

    if (div) {
      div.style.display = 'block'
    }
  }

  if (request.hideWidgets === true) {
    const div = document.querySelector(selectorGroupWidget)

    if (div) {
      div.style.display = 'none'
    }
  } else if (request.hideWidgets === false) {
    const div = document.querySelector(selectorGroupWidget)

    if (div) {
      div.style.display = 'block'
    }
  }

  if (request.hideFixed === true) {
    const div = document.getElementById(selectorGroupFixed)

    if (div) {
      div.style.display = 'none'
    }
  } else if (request.hideFixed === false) {
    const div = document.getElementById(selectorGroupFixed)

    if (div) {
      div.style.display = 'block'
    }
  }

  if (request.msg === 'scrollDown') {
    window.scrollTo(0, document.body.scrollHeight)
    response.data = 'scrollDown ok'
    response.err = null
    sendResponse(response)
  }

  // eslint-disable-next-line no-prototype-builtins
  if (request.hasOwnProperty('black') && JSON.parse(request.black).length) {
    if (isOnePost()) {
      const onePost = getOnePost()
      const author = onePost.querySelector(selectorPostAuthor)

      if (author === null) return

      if (JSON.parse(request.black).includes(author.href)) {
        if (isPopupOnePost()) {
          const wallText = onePost.querySelector(selectorPopup)

          if (wallText) {
            wallText.style.filter = styleBlurOn
          }
        } else {
          const wallText = onePost.querySelector(selectorWallText)

          if (wallText) {
            wallText.style.filter = styleBlurOn
          }
        }
      } else {
        if (isPopupOnePost()) {
          const wallText = onePost.querySelector(selectorPopup)

          if (wallText) {
            if (window.getComputedStyle(wallText, null).getPropertyValue('filter').indexOf('blur') > -1) {
              wallText.style.filter = styleBlurOff
            }
          }
        } else {
          const wallText = onePost.querySelector(selectorWallText)

          if (wallText) {
            if (window.getComputedStyle(wallText, null).getPropertyValue('filter').indexOf('blur') > -1) {
              wallText.style.filter = styleBlurOff
            }
          }
        }
      }

      replyIterator(onePost, (reply) => {
        const author = reply.querySelector(selectorReplyAuthor)

        if (author === null) return

        if (JSON.parse(request.black).includes(author.href)) {
          reply.style.filter = styleBlurOn
        } else if (window.getComputedStyle(reply, null).getPropertyValue('filter').indexOf('blur') > -1) {
          reply.style.filter = styleBlurOff
        }
      })
    } else {
      postIterator((post) => {
        if (post === null) return

        const author = post.querySelector(selectorPostAuthor)

        if (author === null) return

        if (JSON.parse(request.black).includes(author.href)) {
          const wallText = post.querySelector(selectorWallText)

          if (wallText) {
            wallText.style.filter = styleBlurOn
          }
        } else {
          const wallText = post.querySelector(selectorWallText)

          if (wallText) {
            if (window.getComputedStyle(wallText, null).getPropertyValue('filter').indexOf('blur') > -1) {
              wallText.style.filter = styleBlurOff
            }
          }
        }
        replyIterator(post, (reply) => {
          const author = reply.querySelector(selectorReplyAuthor)

          if (author === null) return

          if (JSON.parse(request.black).includes(author.href)) {
            reply.style.filter = styleBlurOn
          } else if (window.getComputedStyle(reply, null).getPropertyValue('filter').indexOf('blur') > -1) {
            reply.style.filter = styleBlurOff
          }
        })
      })
    }
  }

  // eslint-disable-next-line no-prototype-builtins
  if (request.hasOwnProperty('white') && JSON.parse(request.white).length) {
    if (isOnePost()) {
      const onePost = getOnePost()
      const author = onePost.querySelector(selectorPostAuthor)

      if (author === null) return

      if (JSON.parse(request.white).includes(author.href)) {
        if (isPopupOnePost()) {
          const wallText = onePost.querySelector(selectorPopup)

          if (wallText) {
            wallText.style.filter = styleShadowOn
          }
        } else {
          const wallText = onePost.querySelector(selectorWallText)

          if (wallText) {
            wallText.style.filter = styleShadowOn
          }
        }
      } else {
        if (isPopupOnePost()) {
          const wallText = onePost.querySelector(selectorPopup)

          if (wallText) {
            if (window.getComputedStyle(wallText, null).getPropertyValue('filter').indexOf('drop-shadow') > -1) {
              wallText.style.filter = styleShadowOff
            }
          }
        } else {
          const wallText = onePost.querySelector(selectorWallText)

          if (wallText) {
            if (window.getComputedStyle(wallText, null).getPropertyValue('filter').indexOf('drop-shadow') > -1) {
              wallText.style.filter = styleShadowOff
            }
          }
        }
      }

      replyIterator(onePost, (reply) => {
        const author = reply.querySelector(selectorReplyAuthor)

        if (author === null) return

        if (JSON.parse(request.white).includes(author.href)) {
          reply.style.filter = styleShadowOn
        } else if (window.getComputedStyle(reply, null).getPropertyValue('filter').indexOf('drop-shadow') > -1) {
          reply.style.filter = styleShadowOff
        }
      })
    } else {
      postIterator((post) => {
        if (post === null) return

        const author = post.querySelector(selectorPostAuthor)

        if (author === null) return

        if (JSON.parse(request.white).includes(author.href)) {
          const wallText = post.querySelector(selectorWallText)

          if (wallText) {
            wallText.style.filter = styleShadowOn
          }
        } else {
          const wallText = post.querySelector(selectorWallText)

          if (wallText) {
            if (window.getComputedStyle(wallText, null).getPropertyValue('filter').indexOf('drop-shadow') > -1) {
              wallText.style.filter = styleShadowOff
            }
          }
        }

        replyIterator(post, (reply) => {
          const author = reply.querySelector(selectorReplyAuthor)

          if (author === null) return

          if (JSON.parse(request.white).includes(author.href)) {
            reply.style.filter = styleShadowOn
          } else if (window.getComputedStyle(reply, null).getPropertyValue('filter').indexOf('drop-shadow') > -1) {
            reply.style.filter = styleShadowOff
          }
        })
      })
    }
  }

  if (request.gomez === true) {
    if (isOnePost()) {
      const onePost = getOnePost()
      const postText = onePost.querySelector(selectorWallPostText)

      if (postText) {
        postText.innerHTML = gomez(postText.innerHTML)
      }

      replyIterator(onePost, (reply) => {
        const text = reply.querySelector(selectorWallReplyText)

        if (text) {
          text.innerHTML = gomez(text.innerHTML)
        }
      })
    } else {
      postIterator((post) => {
        if (post === null) return

        const postText = post.querySelector(selectorWallPostText)

        if (postText) {
          postText.innerHTML = gomez(postText.innerHTML)
        }

        replyIterator(post, (reply) => {
          const text = reply.querySelector(selectorWallReplyText)

          if (text) {
            text.innerHTML = gomez(text.innerHTML)
          }
        })
      })
    }
  }

  if (request.msg === 'posts') {
    const output = []

    if (isOnePost()) {
      const onePost = getOnePost()

      replyIterator(onePost, (reply) => {
        const author = reply.querySelector(selectorReplyAuthor)

        if (author === null) return

        if (JSON.parse(request.black).includes(author.href)) {
          reply.style.filter = styleBlurOn
        }
      })
      output.push(onePostParser(onePost))
    } else {
      postIterator((post) => {
        if (post === null) return
        output.push(postParser(post))
      })
    }

    if (output.length > 0) {
      response.data = output
      response.err = null
    } else {
      response.data = null
      response.err = 'Posts not found'
    }

    sendResponse(response)
  }
}

chrome.runtime.onMessage.addListener(frontHandler)
