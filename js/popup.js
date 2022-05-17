let urlOptions = [] // 清理配置项
let currentUrl = '' // 当前url host

chrome.storage.local.get(['urlOptions'], function (result) {
  urlOptions = result.urlOptions
  showCurrentOptions()
})

// 回显配置
function showCurrentOptions() {
  chrome.tabs.query({ active: true, currentWindow: true }, (res) => {
    if (res[0] && res[0].url) {
      let urlObj = new URL(res[0].url)
      if (urlObj.host) {
        currentUrl = urlObj.host
        $('#cruuent-url').html(currentUrl)
        let currentOptions = urlOptions.find(item => item.url === currentUrl)
        if (currentOptions) {
          currentOptions.clear.forEach(item => {
            $(`input[name='${item}']`).attr("checked", true)
          })
        }
      }
    }
  })
}

// 更新配置
$('#submit-btn').click(() => {
  let findIndex = urlOptions.findIndex(item => item.url === currentUrl)

  let clear = []
  $("input[type='checkbox']:checked").each((index, item) => {
    clear.push($(item).attr('name'))
  })

  if (findIndex === -1) {
    if (clear.length) {
      urlOptions.push({clear: [...clear], url: currentUrl })
      chrome.storage.local.set({'urlOptions': urlOptions})
      showMessage('success', '已添加到清理名单')
    } else {
      showMessage('warning', '请选择清理项')
    }
  } else {
    if (clear.length) {
      urlOptions.splice(findIndex, 1, { clear: [...clear], url: currentUrl })
      showMessage('success', '已修改清理配置')
    } else {
      urlOptions.splice(findIndex, 1)
      showMessage('success', '已移除清理名单')
    }
    chrome.storage.local.set({'urlOptions': urlOptions})
  }
})

let showMessageTimer = null
function showMessage (type = 'info', content = '提示', duration = 3000) {
  $('#message').removeClass('info success warning error').addClass(type).html(content).show()

  if (showMessageTimer) {
    clearTimeout(showMessageTimer)
    showMessageTimer = null
  }

  showMessageTimer = setTimeout(() => {
    showMessageTimer = null
    $('#message').hide()
  }, 3000)
}