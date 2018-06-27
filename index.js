
const rootURL = "https://api.github.com"

function username() {
  let username = document.getElementById('username').value;
  return username
}


function getRepositories() { 
  const uri = rootURL + "/users/" + username() + "/repos"
  const req = new XMLHttpRequest();
 
  req.addEventListener("load", displayRepositories);
  req.open("GET", uri);
  req.send();
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


function getCommits(el) {  
  
  let repoName = el.dataset.repository
  const uri = rootURL + "/repos/" + el.dataset.username + "/" + repoName + "/branches"

  const req = new XMLHttpRequest()
  
  req.addEventListener("load", displayCommits)
  req.open("GET", uri)
  req.send()
  
}


function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ol>${commits.map(commit => '<li>Name: ' + commit.commit.author.name + ' Username: ' + commit.author.login + ' Message: ' + commit.commit.message + '</li> </br>').join('')}</ol>`
  document.getElementById('details').innerHTML = commitsList
}