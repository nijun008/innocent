console.log('??')


chrome.tabs.query({ active: true, currentWindow: true }, (res) => {
  if (res[0] && res[0].url) {
    let url = new URL(res[0].url)
    if (url.host) {
      $('#cruuent-url').html(url.host)
    }
  }
})