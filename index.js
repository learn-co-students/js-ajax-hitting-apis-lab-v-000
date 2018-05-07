function getRepositories() {
  let req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open("GET", `https://api.github.com/users/${document.getElementById("username").value}/repos`);
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  let repoList = "<ul>" + repos.map(r => `<li><strong>${r.name}</strong> - <a href=${r.html_url}>View On GitHub</a> - <a href="#" data-repository=${r.name} data-username=${r.owner.login} onclick="getCommits(this)">View Commits</a></li> - <a href="#" data-repository=${r.name} data-username=${r.owner.login} onclick="getBranches(this)">View Branches</a></li>`).join("") + "</ul>";
  document.getElementById("repositories").innerHTML += repoList;
}

function getCommits(link) {
  let user = link.dataset.username;
  let repo = link.dataset.repository;
  let req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open("GET", `https://api.github.com/repos/${user}/${repo}/commits`);
  req.send();
}

function displayCommits() {
  let commits = JSON.parse(this.responseText);
  let commitsList = "<ul>" + commits.map(c => `<li><ul><strong>Author: ${c.commit.committer.name}</strong><li>GitHub Handle: ${c.author.login}</li><li>Commit Message: ${c.commit.message}</li></ul></li>`).join("") + "</ul>";
  document.getElementById("details").innerHTML = commitsList;
}

function getBranches(link) {
  let user = link.dataset.username;
  let repo = link.dataset.repository;
  let req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${user}/${repo}/branches`);
  req.send();
}

function displayBranches() {
  let branches = JSON.parse(this.responseText);
  let branchList = "<ul>" + branches.map(b => `<li>${b.name}</li>`).join("") + "</ul>";
  document.getElementById("details").innerHTML = branchList;
}