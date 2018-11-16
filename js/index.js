const gitURL = "https://api.github.com"

function getRepositories(){
  //grab the username element, but grab the value of it
  const name = document.getElementById("username").value;
  //define the uri which we will be grabbing the data from with the list of repos
  const uri = gitURL + "/users/" + name + "/repos";
  //We listen for the button click and then we load the displayRepositories method which is defined below, this calls the uri var made above.
  const req = new XMLHttpRequest()
    req.addEventListener('load', displayRepositories);
    req.open('GET', uri);
    req.send();
  return false;
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = "<ul>" + repos.map(repo => {
  const dataUsername = 'data-username="' + repo.owner.login + '"'
  const dataRepoName = 'data-repository="' + repo.name + '"'
    return(`<li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br />
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br />
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
            </li>`
            )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  const uri = gitURL + "/repos/" + el.dataset.username + "/" + name + "/commits";
  req.addEventListener('load', displayCommits);
  req.open('GET', uri);
  req.send();
}

function getBranches(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  const uri = gitURL + "/repos/" + el.dataset.username + "/" + name + "/branches";
  req.addEventListener('load', displayBranches);
  req.open('GET', uri);
  req.send();
}

function displayCommits(){
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')} </ul>`
  document.getElementById("details").innerHTML = commitsList
}

function displayBranches(){
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li><h3>' + branch.name + '</h3></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
