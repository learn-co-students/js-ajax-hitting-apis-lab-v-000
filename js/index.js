// your code here
function getRepositories() {
  const name = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + name + '/repos')
  req.send();
}

function getCommits(el) {
  const repo = el.dataset.repository;
  const name = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + name + '/' + repo + '/commits')
  req.send();
}

function getBranches(el) {
  const repo = el.dataset.repository;
  const name = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + name + '/' + repo + '/branches')
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos.
    map(r => '<a href="' + r.html_url +'"><li>' + r.name + '</li></a></li>' +
    ' - ' + '<a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name +
        '" onclick="getCommits(this)">Get Commits </a>' +
        '<a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name +
            '" onclick="getBranches(this)">Get Branches</a>')
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> ' + commit.commit.author.name + ' - ' +
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
    .map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
