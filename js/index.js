function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById('username').value;
  const uri = 'https://api.github.com/users/' + username + '/repos';
  req.addEventListener('load', displayRepositories)
  req.open('GET', uri);
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList = '<ul>' + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"';
    const dataRepo = 'data-repo="' + repo.name + '"';
    return `
    <li>
      <h2>${repo.name}</h2>
      <a href="${repo.html_url}">${repo.name}</a><br>
      <a href="#" ${dataRepo} ${dataUsername} + onclick="getCommits(this)">Get Commits</a>
      <a href="#" ${dataRepo} ${dataUsername} + onclick="getBranches(this)">Get Branches</a>
    </li>)`;
  }).join('') + '</ul>';

  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const repo = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  const uri = 'https://api.github.com/repos/' + username + '/' + repo + '/commits'
  req.addEventListener('load', displayCommits);
  req.open('GET', uri)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '(' + commit.author.login + ')</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const repo = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  const uri = 'https://api.github.com/repos/' + username + '/' + repo + '/branches'
  req.addEventListener('load', displayBranches);
  req.open('GET', uri);
  req.send();
}

function displayBranches() {
  var branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = branchList;
}
