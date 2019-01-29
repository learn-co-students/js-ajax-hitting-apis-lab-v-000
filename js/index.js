function getRepositories() {
  var username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + username + '/repos');
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList =
    '<ul>' +
    repos.map(r => {
      const dataUser = 'data-username ="' + r.owner.login + '"';
      const dataRepo = 'data-repository ="' + r.name + '"';
      return `<li>
        <a href="${r.html_url}"${r.html_url}>${r.name}</a>
        <br>
        <a href="#" ${dataRepo} ${dataUser} onclick="getCommits(this)">List Commits</a><br>
        <a href="#" ${dataRepo} ${dataUser} onclick="getBranches(this)">Get Branches</a></li>`;
    })
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const user = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + user + '/' + repo + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.commit.author.name +
        '</strong> - ' +
        commit.author.login +
        ' - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const user = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + user + '/' + repo + '/branches');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(branch => '<li>' + branch.name + '</li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
