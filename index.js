const giturl = "https://api.github.com/"

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = "<ul>" + repos.map(repo => {
     const dataUsername = 'data-username="' + repo.owner.login + '"'
     const dataRepoName = 'data-repository="' + repo.name + '"'
     return(`<li>
             <h2>${repo.name}</h2>
             <a href="${repo.html_url}">${repo.html_url}</a><br>
             <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
             <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a><br>
             </li>`)
   }).join('') + "</ul>";
   document.getElementById("repositories").innerHTML += repoList
}

function displayCommits() {
  var commits = JSON.parse(this.responseText)
  console.log(commits)
  const commitList = "<ul>" + commits.map(commit => {
    const dataUsername = '"' + commit.author.login + '"'
    const dataCommitMessage = '"' + commit.commit.message + '"'
    const dataFullName = '"' + commit.commit.author.name + '"'
    return (`<li>
        Github Name: ${dataUsername}<br>
        Author Name:  ${dataFullName}<br>
        Commit Message: ${dataCommitMessage}<br>
      </li>`)}).join('') + "</ul>"

    document.getElementById("details").innerHTML = commitList
}

function displayBranches() {
  var branches = JSON.parse(this.responseText)
  console.log(branches)
  const branchList = "<ul>" + branches.map(branch => {
    const dataBranchname = '"' + branch.name + '"'
    return(`<li>
      Branch Name: ${dataBranchname}<br>
      </li`)}).join('') + "</ul>"
  document.getElementById("details").innerHTML = branchList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  var user = document.getElementById("username").value
  var uri = giturl + "users/" + user + "/repos"
  req.open("GET", uri)
  req.send()
}

function getCommits(c) {
  const req = new XMLHttpRequest()
  ///repos/:owner/:repo/commits
  req.addEventListener("load", displayCommits)
  var uri = giturl + "repos/" + c.dataset.username + "/" + c.dataset.repository + "/commits"
  req.open("Get", uri)
  req.send()
}

function getBranches(b) {
  const req = new XMLHttpRequest()
  ///repos/:owner/:repo/branches
  req.addEventListener("load", displayBranches)
  var uri = giturl + "repos/" + b.dataset.username + "/" + b.dataset.repository + "/branches"
  req.open("Get", uri)
  req.send()
}
