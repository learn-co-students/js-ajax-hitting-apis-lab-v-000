function displayCommits() {
  const commits = JSON.parse(this.responseText)
 const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const username = repos[0].owner.login
  const repoList = `<ul>${repos.map(r => `<li><a href="https://github.com/${username}/${r.name}">${r.name}</a><br>
                                          <a href="#" data-repository="${r.name}" data-username="${username}" onclick="getCommits(this);return false;">Display Commits</a><br>
                                          <a href="#" data-repository="${r.name}" data-username="${username}" onclick="getBranches(this);return false;">Display Branches</a></li>
                                          `).join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const userName = username.value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + userName + '/repos')
  req.send()
}

function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + el.dataset.username + '/' + el.dataset.repository + '/commits')
  req.send()
}

function getBranches(el){
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + el.dataset.username + '/' + el.dataset.repository + '/branches')
  req.send()
}
