const usernameField = document.getElementById('username')
let curusername = ''
const details = document.getElementById("details")

function getRepositories() {
  let username = usernameField.value
  curusername = username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${ username }/repos`)
  req.send()
}

function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText)

  let repostring = repos.map(r => {
    let attributes = [
      'href="#"',
      `data-repository="${r.name}"`,
      `data-username="${r.owner.login}"`,
      'onclick="getCommits(this)"'
    ]
    return [
      '<li>',
      '<a href="',
      r.html_url,
      '" >',
      r.name,
      '</a>',
      '<br>',
      '<a ',
      attributes.join(' '),
      '>',
      'Get Commits',
      '</a>',
      '</li>'
    ].join('')
  }).join('')

  const repoList = `<ul>${ repostring }</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${ username }/${ name }/commits`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitString = commits.map(commit => {
    return [
      '<li>',
      '<strong>',
      commit.author.login,
      '</strong><br>',
      commit.commit.author.name,
      '<br>',
      commit.commit.message,
      '</li>'
    ].join('')
  }).join('')
  const commitsList = `<ul>${ commitString }</ul>`
  details.innerHTML = commitsList
}

function getBranches(el) {
  const req = new XMLHttpRequest()
  const name = el.dataset.repository
  const username = el.dataset.username
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${ username }/${ name }/branches`)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  details.innerHTML = ''
  branches.forEach(branch => {
    details.innerHTML += '<div>' + branch.name + '</div>'
  })
}
