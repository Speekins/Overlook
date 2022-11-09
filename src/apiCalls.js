function fetchData(url) {
  return fetch(url)
  .then(response => response.json())
}

module.exports = {
  fetchData
}