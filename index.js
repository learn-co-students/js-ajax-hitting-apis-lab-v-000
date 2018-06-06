function getRepositories() {
  const req = new XMLHttpRequest()
  const username = document.getElementById("username").value || "octokit"
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
    const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return(`
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`
          )
  }).join('') + "</ul>";
  //    '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`)
  // const branchList = `<ul>${repos.map(r => '<li>' + r.branches_url + '</li>').join('')}</ul>`
  // debugger
  document.getElementById("repositories").innerHTML = repoList
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> - ' + commit.commit.message + ' - ' + commit.commit.url).join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getCommits(el) {
  const commitName = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + el.dataset.username + '/' + commitName + '/commits')
  req.send()
}
//GET https://api.github.com/repos/undefined/commits
function getBranches(el) {
  const branchName = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + el.dataset.username + '/' + branchName + '/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  //getting brandName undefined so getBranches not working
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong> - ' + branch.commit.url + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
