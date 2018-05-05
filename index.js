function getRepositories () {
  var username = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories () {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => `<li><a href="${r.html_url}">${r.name}</a>` + ` - <a href="#" data-username="${r.owner.login}" data-repository="${r.name}" onclick="getCommits(this)">Get Commits</a>` + `- <a href="#" data-username="${r.owner.login}" data-repository="${r.name}" onclick="getBranches(this)">Get Branches</a></li>`).join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits (el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`);
  req.send();
}

function displayCommits () {
  var commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(c => `<li><strong>${c.author.login} - ${c.commit.author.name}</strong> - ${c.commit.message}</li>`).join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList;
}

function getBranches(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/branches`);
  req.send();
}

function displayBranches () {
  var branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(b => `<li><strong>${b.name}</strong></li>`).join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList;
}
