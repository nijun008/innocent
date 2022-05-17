console.log('//')

var urlOptions = [
  { url: 'https://javlibrary.com', clear: ['history', 'local', 'cookies'] }
]

chrome.storage.local.get(['urlOptions'], function (result) {
  if (!result.urlOptions) {
    chrome.storage.local.set({'urlOptions': urlOptions}, function() {
      console.log('Value is set');
    })
  } else {
    console.log(result.urlOptions)
  }
})

// chrome.history.deleteUrl({ url: 'https://www.javlibrary.com/' }, function(result) {
//   console.log(result)
// })

// chrome.history.getVisits({ url: 'https://www.javlibrary.com/cn/vl_update.php' }, res => {
//   console.log(res)
// })

chrome.history.search({
  text: 'javlibrary.com',
  startTime: Date.now() - (1000 * 60 * 60 * 24 * 30 * 12 * 3),
  endTime: Date.now()
}, res => {
  console.log(res)
  if (res && res.length) {
    res.forEach(item => {
      console.log(item)
      chrome.history.deleteUrl({ url: item.url }, () => {
        console.log('??')
      })
    })
  }
})