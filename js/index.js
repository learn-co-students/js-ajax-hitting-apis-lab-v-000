// your code here
function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  const repoList = '<ul>' + repos.map(r => {
        const userName = 'data-username="' + r.owner.login + '"';
            const repoName = 'data-repository="' + r.name + '"';
            return `
              <li>
                <h2>${r.name}</h2>
                <a href="${r.html_url}">${r.html_url}</a><br>
                <a href="#" ${repoName} ${userName} onclick="getCommits(this)">Get Commits</a><br>
                <a href="#" ${repoName} ${userName} onclick="getBranches(this)">Get Branches</a></li>
              </li>`;}).join('') + '</ul>';
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  let user = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + user + '/repos');
  req.send();
}

function getCommits(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  const place = 'https://api.github.com/repos/octocat/' + name + '/commits';
  req.addEventListener('load', displayCommits);
  req.open('GET', place);
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
        commit.author.login +
        '</strong> - ' +
        commit.commit.message +

        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const rep = el.dataset.repository;
  const req = new XMLHttpRequest();
  const change = 'https://api.github.com/repos/octocat/' + rep + '/branches';
  req.addEventListener('load', displayBranches);
  req.open('GET', change);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(
    branch =>
        '<li>' + branch.name +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
