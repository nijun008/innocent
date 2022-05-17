// chrome.tabs.onRemoved.addListener((tabId, b) => {
//   console.log(tabId)
//   // chrome.tabs.get(tabId, tab => {
//   //   console.log(tab)
//   // })
// })

chrome.windows.onCreated.addListener(() => {
  clearHistory()
})

function clearHistory (url = '') {
  chrome.storage.local.get(['urlOptions'], function (result) {
    let urlOptions = result.urlOptions || []

    if (url && urlOptions.find(urlOption => urlOption.url === url)) {
      urlOptions = [urlOptions.find(urlOption => urlOption.url === url)]
    }

    urlOptions.forEach(urlOption => {
      chrome.history.search({
        text: urlOption.url,
        startTime: Date.now() - (1000 * 60 * 60 * 24 * 30 * 12 * 3),
        endTime: Date.now()
      }, res => {
        if (res && res.length) {
          res.forEach(item => {
            chrome.history.deleteUrl({ url: item.url })
          })
        }
      })
    })
  })
}