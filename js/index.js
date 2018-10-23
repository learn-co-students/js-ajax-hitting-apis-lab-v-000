// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  const username = document.getElementById('username').value;
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  let repoList = `<ul>${repos.map(repo => {
    return `<li>${repo.owner.login} - <a href="${repo.html_url}" data-repo="${repo.name}">${repo.name}</a><br>
    <a href="#" data-repo="${repo.name}" data-username="${repo.owner.login}" onclick="getCommits(this)">Show Commits</a><br>
    <a href="#" data-repository="${repo.name}" data-username="${repo.owner.login}" onclick="getBranches(this)">Show Branches</a>`;
  }).join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const repoName = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${repoName}/commits`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit =>
    `<li><strong>${commit.commit.author.name} (${commit.author.login})</strong> - ${commit.commit.message}</li>`
  ).join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const username = el.dataset.username;
  const repoName = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches)
  req.open('GET', `https://api.github.com/repos/${username}/${repoName}/branches`);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch =>
    `<li>${branch.name}</li>`
  )}.join('')</ul>`;

  document.getElementById('details').innerHTML = branchesList;
}
