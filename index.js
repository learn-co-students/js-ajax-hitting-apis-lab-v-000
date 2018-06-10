function getRepositories() {
  const form = document.getElementById("repo-form")
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open(
    "GET", 
    "https://api.github.com/users/" + form.elements['username'].value + "/repos"
  )
  req.send()
}

function getCommits(el) {
  const user = el.dataset.username
  const repo = el.dataset.repository

  const req = new XMLHttpRequest()

  req.addEventListener("load", displayCommits)
  req.open(
    "GET",
    "https://api.github.com/repos/" + user + "/" + repo + "/commits"
  )
  req.send()
}

function getBranches(el) {
  const user = el.dataset.username
  const repo = el.dataset.repository

  const req = new XMLHttpRequest()

  req.addEventListener("load", displayBranches)
  req.open(
    "GET",
    "https://api.github.com/repos/" + user + "/" + repo + "/branches"
  )
  req.send()
}

function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText)

  const repoMap = repos.map(r => 
    `
      <a href=${r.html_url}><li>${r.name}</li></a>
      <a href='#' data-username='${r.owner.login}' data-repository='${r.name}' onclick='getCommits(this)'>
        Get Commits
      </a>
      <br>
      <a href='#' data-username='${r.owner.login}' data-repository='${r.name}' onclick='getBranches(this)'>
        Get Branches
      </a>
    `
  )

  const repoList = "<ul>" + repoMap.join('') + "</ul>" 

  document.getElementById("repositories").innerHTML = repoList
}

function displayCommits(event, data) {
  const commits = JSON.parse(this.responseText)

  const commitMap = commits.map(r =>
    `
      <li>
        <div id='username'>${r.author.login}</div>
        <p>${r.commit.author.name} - ${r.commit.message}</p>
      </li>
    `
  )

  const commitList = "<ul>" + commitMap.join('') + "</ul>"

  document.getElementById("details").innerHTML = commitList
}

function displayBranches(event, data) {
  const branches = JSON.parse(this.responseText)

  console.log(branches)

  const branchMap = branches.map(r => `<li>${r.name}</li>`)

  const branchList = "<ul>" + branchMap.join('') + "</ul>"

  document.getElementById("details").innerHTML = branchMap
}
