// your code here
function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  const username = document.getElementById('username').value;
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        '<a href="' +
        r.html_url +
        '">' +
        r.name +
        ' - <a href="#" data-username="' +
        username +
        '" data-repository="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a>' +
        ' - <a href="#" data-username="' +
        username +
        '" data-repository="' +
        r.name +
        '" onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById('username').value;

  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.commit.author.name +
        ' (' +
        commit.committer.login +
        ')' +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;

  document.getElementById('details').innerHTML = commitsList;
}

function getCommits(el) {
  const username = el.dataset.username;
  const repository = el.dataset.repository;
  const req = new XMLHttpRequest();

  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${repository}/commits`);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(
      branch =>
        '<li>' +
        branch.name +
        '</li>'
    )
    .join('')}</ul>`;

  document.getElementById('details').innerHTML = branchesList;
}

function getBranches(el) {
  const username = el.dataset.username;
  const repository = el.dataset.repository;
  const req = new XMLHttpRequest();

  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${repository}/branches`);
  req.send();
}
