function getRepositories() {
  const name = document.getElementById("username").value
  const uri = "https://api.github.com/users/" + name + "/repos"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", uri)
  req.send()
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
    return(`
      <li> 
        <h2>${repo.name}</h2>
        <a href="${repo.html_url}">${repo.html_url}</a><br>
        <a href="#" data-username="${repo.owner.login}" onclick="getCommits(this)" data-repository="${repo.name}">Get Commits</a><br>
        <a href="#" data-username="${repo.owner.login}" onclick="getBranches(this)" data-repository="${repo.name}">Get Branches</a><br>
      </li>`)
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const repoName = el.dataset.repository
  const username = el.dataset.username
  const uri = "https://api.github.com/repos/" + username + "/" + repoName + "/commits"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", uri)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = "<ul>" + commits.map(c => {
    return(`
      <li>
        <h3>${c.commit.author.name} (${c.author.login})</h3>
        <p>${c.commit.message}</p>
      </li>
      `)
  }).join('') + "</ul>";
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const repoName = el.dataset.repository
  const username = el.dataset.username
  const uri = "https://api.github.com/repos/" + username + "/" + repoName + "/branches"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", uri)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = "<ul>" + branches.map(b => '<li>' + b.name + '</li>').join('') + "</ul>"
  document.getElementById("details").innerHTML = branchesList
}