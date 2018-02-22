function getRepositories() {
  const req = new XMLHttpRequest()
  let username = document.getElementById("username").value
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map (r => '<li>' + '<a href=' + `https://github.com/${r.full_name}` + '>' + r.name + '</a>'
  + ' - <a href="#" data-repo="' + r.name + '"onclick="getCommits(this)">Get Commits</a></li>'
  + ' - <a href="#" data-repo="' + r.name + '"onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`

  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const repository = el.dataset.repo
  const req = new XMLHttpRequest()
  let username = document.getElementById("username").value
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/commits`)
  req.send()
}


function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + " - " + commit.author.login +
  '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  console.log(el.dataset)
  const repository = el.dataset.repo
  const req = new XMLHttpRequest()
  let username = document.getElementById("username").value
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/` + repository + `/branches`)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name +
  '</strong> - ' + branch.commit.url + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
