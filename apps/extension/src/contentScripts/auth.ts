const interval = setInterval(async () => {
  const tokenElem = document.getElementById('polar-token')

  if (tokenElem && tokenElem.innerText) {
    clearInterval(interval)
    await browser.storage.local.set({ token: tokenElem.innerText })
    window.close()
  }
}, 1000)

export {}
