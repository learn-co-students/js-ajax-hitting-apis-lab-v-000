function getRepositories() {
  const username = document.getElementById('username').value;
  // console.log(username);

  const req = new XMLHttpRequest();
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
  req.addEventListener('load', displayRepositories);
}

function displayRepositories() {
  // console.log(this.responseText);
  let repos = JSON.parse(this.responseText);
  let repoList = `<ul>${repos.map(r => '<li>' + r.html_url + '<br><a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this);return false;">Get Commits</a>'
                 + ' / <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this);return false;">Get Branches</a></li>').join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const repository = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/commits`);
  req.send();
  req.addEventListener('load', displayCommits);
}

function displayCommits() {
  console.log(this.responseText);
  const commits = JSON.parse(this.responseText);
  const commitDetail = `<ul>${commits.map(commit => '<li>' + commit.commit.author.name + ' / ' + commit.author.login + ' / ' + commit.commit.message + '</li>').join('')}</ul>`;

  document.getElementById('details').innerHTML = commitDetail;
}

function getBranches(el) {
  const repository = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/branches`);
  req.send();
  req.addEventListener('load', displayBranches);
}

function displayBranches(el) {
  console.log(this.responseText);
  const branches = JSON.parse(this.responseText);
  const branchDetail = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;

  document.getElementById('details').innerHTML = branchDetail;
}
