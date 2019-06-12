function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name + ` - <a href= "${r.html_url}">${r.name}</a>` +
        ' - <a href="#" data-username="'+ r.owner.login + '"data-repository="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a>' + ' - <a href="#" data-username="'+ r.owner.login + '"data-repository="' +
        r.name + '"onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
const userName = document.getElementById('username').value;
const req = new XMLHttpRequest();
req.addEventListener('load', displayRepositories);
req.open('GET', `https://api.github.com/users/${userName}/repos`);
req.send();
}

function getCommits(el) {
  const repoName = el.dataset.repository;
  const userName = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${userName}/${repoName}/commits`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);

  const commitsList = `<ul>${commits
    .map(
      c =>
        '<li><strong>' +
        c.commit.author.name +
        c.author.login +
        '</strong> - ' +
        c.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const repoName = el.dataset.repository;
  const userName = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${userName}/${repoName}/branches`);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  let branchName = `<ul>${branches.map(
    b =>
    '<li><strong>' + b.name + '</strong></li>'
  ).join('')}</ul>`;
  document.getElementById('details').innerHTML = branchName;
}
