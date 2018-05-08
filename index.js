function displayBranches() {
  let response = JSON.parse(this.responseText)
  let responseList = `<ul>${response.map(r => '<li>' + r.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = responseList
}

function getBranches(el) {
  let request = new XMLHttpRequest()
  request.addEventListener("load", displayBranches)
  request.open("GET", `https://api.github.com/repos/${username.value}/${el.dataset.repository}/branches`)
  request.send()
}

function displayCommits() {
  let response = JSON.parse(this.responseText)
  let responseList = `<ul>${response.map(r => '<li>' + r.author.login + ' - ' + r.commit.author.name + ' - ' + r.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = responseList
}

function getCommits(el) {
  let request = new XMLHttpRequest()
  request.addEventListener("load", displayCommits)
  request.open("GET", `https://api.github.com/repos/${username.value}/${el.dataset.repository}/commits`)
  request.send()
}

function displayRepositories(event, data) {
  let response = JSON.parse(this.responseText)
  let responseList = `<ul>${response.map(r => '<li><a href="' + r.html_url + '">' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>' + ' - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = responseList
}

function getRepositories() {
  let request = new XMLHttpRequest()
  request.addEventListener("load", displayRepositories)
  request.open("GET", `https://api.github.com/users/${username.value}/repos`)
  request.send()
}
