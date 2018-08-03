function displayRepositories(){
  let repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
    let dataUsername = 'data-username="' + repo.owner.login + '"'
    let dataRepoName = 'data-repository="' + repo.name + '"'
      return(`<li>
        <h2>${repo.name}</h2>
        <a href="${repo.html_url}">${repo.html_url}</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
      </li>`
      )
    }).join('') + "</ul>"
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(arg){
  let repoName = arg.dataset.repository
  let ownerName = arg.dataset.username
  let req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${ownerName}/${repoName}/commits`)
  req.send()
}

function getBranches(el) {
  const repoName = el.dataset.repository
  const uri = `https://api.github.com/repos/${el.dataset.username}/${repoName}/branches`
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", uri)
  req.send()
}

function displayCommits() {
  let commits = JSON.parse(this.responseText)
  let commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>')}.join('')</ul>`

  document.getElementById("details").innerHTML = commitsList
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function getRepositories(){
  const req = new XMLHttpRequest()
  let name = document.getElementById('username').value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${name}/repos`)
  req.send()
  return false;
}
