function fetchData(url) {
  return fetch(url)
  .then(response => response.json())
}

function fetchAll(urls) {
  return Promise.all([fetchData(urls[0]), fetchData(urls[1]), fetchData(urls[2])])
}

module.exports = {
  fetchData,
  fetchAll
}