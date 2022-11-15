function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return response
    })
}

function fetchAll(urls) {
  return Promise.all([fetchData(urls[0]), fetchData(urls[1]), fetchData(urls[2])])
}

module.exports = {
  fetchData,
  fetchAll
}