
function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
      '<li><p><h3><strong>' +
      `<a href="${r.html_url}">${r.name}</a></strong></h3></p>` +
      `<span><a href="#" data-repository="${r.name}" data-username="${r.owner['login']}"
      onclick="getCommits(this)">Get Commits</a></span>` +
      ` <span><a href="#" data-repository="${r.name}" data-username="${r.owner['login']}"
      onclick="getBranches(this)">Get Branches</a></span>` +
      '</li>'
    )
    .join('')}</ul>`;

  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const gitUserName = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${gitUserName}/repos`);
  req.send();
}

function getCommits(el) {
  const repo = el.dataset.repository;
  const user = el.dataset.username;
  const req = new XMLHttpRequest();

  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${user}/${repo}/commits`);
  req.send();
}

function getBranches(el) {
  const repo = el.dataset.repository;
  const user = el.dataset.username;

  const req = new XMLHttpRequest();

  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${user}/${repo}/branches`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits
    .map(
      commit =>
      '<li><p><strong>' +
      commit.commit.author.name +
      '</strong></p>' +
      '<strong>' + commit.author.login + '</strong> - ' +
      commit.commit.message +
      '</li>'
    )
  .join('')}</ul>`;

  document.getElementById('details').innerHTML = commitsList;
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(branches);
  const branchesList = `<ul>${branches
    .map(
      branch =>
      '<li>' + branch.name + '</li>'
    )
  .join('')}</ul>`;

  document.getElementById('details').innerHTML = branchesList;
}
