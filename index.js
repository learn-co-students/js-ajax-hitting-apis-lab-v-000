const rootURL="http://api.github.com"

function getRepositories() {
  const username=document.getElementById("username").value
  const uri=rootURL+"/users/"+username+"/repos"
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", uri)
  req.send()
  return false;
}

function showRepositories(event, data) {
  //this is set to the XMLHttpRequest object that fired the event
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return(`
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getDetails(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`
          )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getDetails(el) {
  const repoName = el.dataset.repository
    const uri = rootURL + "/repos/" + el.dataset.username + "/" + repoName + "/commits"
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", showDetails)
    xhr.open("GET", uri)
    xhr.send()
}

function showDetails() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
