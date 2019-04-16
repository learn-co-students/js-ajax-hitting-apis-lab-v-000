// your code here
const rootURL = 'https://api.github.com'

function getRepositories() {
  const userName = document.getElementById('username').value
  const uri = rootURL + '/users/' + userName + '/repos'
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayRepositories)
  req.open('GET', uri)
  req.send()
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const list =
    '<ul>' +
    repos.map(r => {
      const userName = 'data-username="' + r.owner.login + '"'
      const repoName = 'data-repository="' + r.name + '"'
      return `
        <li>
          <h2>${r.name}</h2>
          <a href="${r.html_url}">${r.html_url}</a><br>
          <a href="#" ${repoName} ${userName} onclick="getCommits(this)"</a><br>
          <a href="#" ${repoName} ${userName} onclick="getBranches(this)">Get Branches</a>
        </li>`
    }).join('') +
    '</ul>'
  document.getElementById('repositories').innerHTML = list
}

function getCommits(el) {
  const repo = el.dataset.repository
  const uri = rootURL + '/repos/' + el.dataset.username + '/' + repo + '/commits'
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  req.open('GET', uri)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const list = `<ul>${commits.map(c =>
    '<li><h3>' +
    c.commit.author.name +
    ' (' +
    c.author.login +
    ')</h3>' +
    c.commit.message +
    '</li>'
  ).join('')}</ul>`
  document.getElementById('details').innerHTML = list
}

function getBranches(el) {
  const repo = el.dataset.repository
  const uri = rootURL + '/repos/' + el.dataset.username + '/' + repo + '/branches'
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayBranches)
  req.open('GET', uri)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const list = `<ul>${branches.map(b =>
    '<li>' + b.name + '</li>'
  ).join('')}</ul>`
  document.getElementById('details').innerHTML = list
}
