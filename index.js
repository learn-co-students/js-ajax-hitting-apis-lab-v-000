function getRepositories() {
  const username = document.getElementById("username").value;
  const uri = "https://api.github.com/users/" + username + '/repos';
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", uri);
  req.send()
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = "<ul>" + repos.map(repo => {
  const dataRepoName = 'data-repository="' + repo.name + '"';
  const dataUsername = 'data-username="' + repo.owner.login + '"';
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

function getCommits(element) {
  const repo = element.dataset.repository;
  const uri = "https://api.github.com/repos/" + element.dataset.username + "/" + repo + "/commits";
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", uri);
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(element){
  const repo = element.dataset.repository;
  const uri = "https://api.github.com/repos/" + element.dataset.username + "/" + repo + "/branches";
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", uri);
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = branchesList
}
