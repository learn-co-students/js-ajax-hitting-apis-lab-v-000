const rootURL = "https://api.github.com"

function getRepositories() {
  const name = document.getElementById("username").value
  const url = rootURL + "/users/" + name + "/repos"
    const request = new XMLHttpRequest()
        request.addEventListener("load", displayRepositories);
    request.open("GET", url);
    request.send();
    return false;
}


function displayRepositories() {
   const repos = JSON.parse(this.responseText)
   
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

    document.getElementById("repositories").innerHTML = repoList
  }

function getCommits(el) { //where is el defind? 
  const repoName = el.dataset.repository
  const request = new XMLHttpRequest()

  const url = rootURL + "/repos/" + el.dataset.username + "/" + repoName + "/commits"


    request.addEventListener("load", displayCommits);
  request.open("GET", url);
  request.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
    const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
    document.getElementById("details").innerHTML = commitsList
    }

function getBranches(el) {
  const repoName = el.dataset.repository
  const request = new XMLHttpRequest()

  const uri = rootURL + "/repos/" + el.dataset.username + "/" + repoName + "/branches"
  request.addEventListener("load", displayBranches);
  request.open("GET", uri);
  request.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

