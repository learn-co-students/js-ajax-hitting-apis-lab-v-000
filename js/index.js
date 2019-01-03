function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.addEventListener("load", displayRepositories);
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(repo => {
      const dataUsername = 'data-username="' + repo.owner.login + '"';
      const dataRepoName = 'data-repository="' + repo.name + '"';
      return `<li>${repo.name} by ${repo.owner.login} <a href="${repo.html_url}">View Repo</a> <a href="#" ${dataUsername} ${dataRepoName}" onclick="getCommits(this)">Get Commits</a> <a href="#" ${dataUsername} ${dataRepoName} onclick="getBranches(this)">Get Branches</a></li>`
    })
    .join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const username = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.open("GET", `https://api.github.com/repos/${username}/${repo}/commits`);
  req.addEventListener("load", displayCommits);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitList = `<ul>${commits
    .map(commit => `<li><strong>${commit.commit.author.name} (${commit.author.login})</strong> ${commit.commit.message}</li>`)
    .join("")}</ul>`
  document.getElementById("details").innerHTML = commitList;
}

function getBranches(el) {
  const username = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.open("GET", `https://api.github.com/repos/${username}/${repo}/branches`);
  req.addEventListener("load", displayBranches);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches
    .map(branch => `<li>${branch.name}</li>`)
    .join("")
  }</ul>`;
  document.getElementById("details").innerHTML = branchList;
}
