function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send();
}

function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText);
  let repoHTML = '<ul>';
  repoHTML += repos.map(r => `<li>${r.name}</br><a href="${r.html_url}">Go to Repo</a></br><a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getCommits(this)">Get Commits</a></br><a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getBranches(this)">Get Branches</a></li>`).join('');
  repoHTML += '</ul>';
  document.getElementById('repositories').innerHTML = repoHTML;
}

function getCommits(el) {
  const username = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("get", `https://api.github.com/repos/${username}/${repo}/commits`)
  req.send();
}

function displayCommits(event, data) {
  const commits = JSON.parse(this.responseText);
  let commitHTML = "<ul>";
  commitHTML += commits.map(c => `<li>${c.author.login} - ${c.commit.author.name} - ${c.commit.message}</li>`).join("");
  commitHTML += "</ul>";
  document.getElementById('details').innerHTML = commitHTML;
}

function getBranches(el) {
  const username = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("get", `https://api.github.com/repos/${username}/${repo}/branches`)
  req.send();
}

function displayBranches(event, data) {
  const branches = JSON.parse(this.responseText);
  let branchHTML = "<ul>";
  branchHTML += branches.map(b => `<li>${b.name}</li>`).join("");
  branchHTML += "</ul>";
  document.getElementById('details').innerHTML = branchHTML;
}
