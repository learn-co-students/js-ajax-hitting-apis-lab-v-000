const rootURL = "https://api.github.com";

function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText);
  const repoList = "<ul class='repos'>" + repos.map(repo => {
    return(`
      <li>
        <a href="${repo.html_url}" target="_blank">${repo.name}</a> -
        <a href="#" onclick="getCommits(this)" data-username="${repo.owner.login}" data-repository="${repo.name}">Commits</a> /
        <a href="#" onclick="getBranches(this)" data-username="${repo.owner.login}" data-repository="${repo.name}">Branches</a>
      </li>`)
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList;
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitList = `<ul class="details">${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong><br><small><i>' + commit.author.login + '</i></small><br><small>' + commit.commit.message + '</small></li>').join('')}`;
  document.getElementById("details").innerHTML = commitList;
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul class="details">${branches.map(branch => '<li><strong>' + branch.name + '</strong>').join('')}`;
  document.getElementById("details").innerHTML = branchList;
}

function getRepositories() {
  const username = document.getElementById("username").value;
  const url = `${rootURL}/users/${username}/repos`;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", url);
  req.send();
  return false;
}

function getCommits(el) {
  const username = el.dataset.username;
  const repoName = el.dataset.repository;
  const url = `${rootURL}/repos/${username}/${repoName}/commits`;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", url);
  req.send();
}

function getBranches(el) {
  const username = el.dataset.username;
  const repoName = el.dataset.repository;
  const url = `${rootURL}/repos/${username}/${repoName}/branches`
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", url);
  req.send();
}
