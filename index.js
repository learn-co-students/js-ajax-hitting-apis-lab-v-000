const rootURL = "https://api.github.com"

function getRepositories(){
  const req = new XMLHttpRequest()
  const username = document.getElementById('username').value
  console.log(username)
  req.addEventListener("load", displayRepositories)
  req.open("GET", rootURL + "/users/" + username + "/repos")
  req.send()
}

function displayRepositories(){
  let repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>` + repos.map(r => {
    const dataUsername = 'data-username="' + r.owner.login + '"'
    const dataRepoName = 'data-repository="' + r.name + '"'
    return(`
      <li>
        <h2>${r.name}</h2>
        <a href="${r.html_url}">${r.html_url}</a>
        <a href="#" ${dataUsername} ${dataRepoName} onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" ${dataUsername} ${dataRepoName} onclick="getBranches(this)">Get Branches</a><br>
        </li>
    `)}).join('') + '</ul>';
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el){
  let name = el.dataset.repository
  let req = new XMLHttpRequest();
  let uri = rootURL + "/repos/" + el.dataset.username + "/" + name + "/commits"
  req.addEventListener("load", displayCommits)
  req.open("GET", uri)
  req.send();
}

function displayCommits(){
  let commits = JSON.parse(this.responseText)
  console.log(commits)
  let commitsList = `<ul>${commits.map(c => '<li><h3>' + c.commit.author.name + ' (' + c.author.login + ')' + '-' + c.commit.message + '</h3></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el){
  let name = el.dataset.repository
  let req = new XMLHttpRequest();
  let uri = rootURL + "/repos/" + el.dataset.username + "/" + name + "/branches"
  req.addEventListener("load", displayBranches)
  req.open("GET", uri)
  req.send();
}

function displayBranches(){
  let branches = JSON.parse(this.responseText)
  let branchesList = `<ul>${branches.map(b => '<li>' + b.name + '<li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
