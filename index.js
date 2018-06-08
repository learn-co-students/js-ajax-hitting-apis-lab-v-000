function getCommits(element) {
    const username = element.dataset.username
    const repo = element.dataset.repository
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayCommits)
    req.open("GET", `https://api.github.com/repos/${username}/${repo}/commits`)
    req.send()
  }

function displayCommits() {
    const commits = JSON.parse(this.responseText)
    const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + ' - ' + commit.commit.message +  '</li>').join('')}</ul>`
    document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
    const username = el.dataset.username
    const repo = el.dataset.repository
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayBranches)
    req.open("GET", `https://api.github.com/repos/${username}/${repo}/branches`)
    req.send()
  }

function displayBranches() {
    const branches = JSON.parse(this.responseText)
    const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
    document.getElementById("details").innerHTML = branchesList
}

function getRepositories() {
    const name = document.getElementById("username").value
    const uri = rootURL + "/users/" + name + "/repos"
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", displayRepositories)
    xhr.open("GET", uri)
    xhr.send()
    return false;
  }

function displayRepositories(){
    const repos = JSON.parse(this.responseText)
    const repoList = `<ul>${
        repos.map(r => `<li><a href="https://github.com/${r.full_name}">${r.name}</a>` +
          ' - <a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a> - ' +
          '<a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>'
        ).join('')
      }</ul>`;
      document.getElementById("repositories").innerHTML = repoList
    
}