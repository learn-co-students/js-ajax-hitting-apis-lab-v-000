// your code here
function getRepositories() {
  const username = document.getElementById("username").value
  const url = "https://api.github.com/users/" + username + "/repos"
  const req = new XMLHttpRequest();
    req.addEventListener("load", displayRepositories);
    req.open("GET", url);
    req.send();
}

// the name and a link to the URL (HTML URL
function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  console.log(repos);

  const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return(`
      <li>
        <h2> <a href="${repo.html_url}">${repo.name}</a></h2>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a><br>
      </li>
    `)
  }).join('') + "</ul>";

  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const repoName = el.dataset.repository;
  const url = 'https://api.github.com/repos/' + el.dataset.username + '/' + repoName  + '/commits'
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", url);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits.map(commit =>
    '<li>'
    + commit.commit.author.name
    + ' ('
    + commit.author.login
    + ')'
    + commit.commit.message
    + '</li>'
  ).join('')}</ul>`;

  document.getElementById("details").innerHTML = commitsList;
}

function getBranches(el) {
  const repoName = el.dataset.repository;
  const url = 'https://api.github.com/repos/' + el.dataset.username + '/' + repoName  + '/branches'
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", url);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(branches);
  const branchesList = `<ul>${branches.map(branch =>
    '<li>'
    + branch.name
    + '</li>'
  ).join('')}</ul>`;

  document.getElementById("details").innerHTML = branchesList;
}
