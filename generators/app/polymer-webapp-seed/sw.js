addEventListener('install', (e) => {
  console.log(e)
})

addEventListener('fetch', (e) => {
  console.log(e.request.url)
})