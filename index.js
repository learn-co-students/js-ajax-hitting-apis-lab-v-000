

function displayRepositories() {
   const repos = JSON.parse(this.responseText);
  const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"';
    const dataRepoName = 'data-repository="' + repo.name + '"';
    return(`
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`
          );
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList;
}

function getRepositories() {
  let username = document.getElementById("username").value;
  let url = "https://api.github.com/users/" + username + "/repos";
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", url);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}

function getCommits(el) {
  const repoName = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  const uri = 'https://api.github.com/repos/' + username + '/' + repoName  + '/commits';
  req.addEventListener("load", displayCommits);
  req.open("load", uri);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li><h3>' + branch.name + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
}

function getBranches(el) {
  const repoName = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  const uri = 'https://api.github.com/repos/' + username + '/' + repoName  + '/branches';
  req.addEventListener("load", displayBranches);
  req.open("load", uri);
  req.send();
}