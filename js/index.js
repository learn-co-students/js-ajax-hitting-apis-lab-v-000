const rootURL = 'https://api.github.com';

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(
    commit => '<li><h3>' + commit.commit.author.name + ' (' +
    commit.author.login + ')</h3>' + commit.commit.message + '</li>'
  ).join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(
    branch => '<li>' + branch.name + '</li>'
  ).join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const reposList =     '<ul>' +
    repos
      .map(repo => {
        const dataUsername = 'data-username="' + repo.owner.login + '"';
        const dataRepoName = 'data-repository="' + repo.name + '"';
        return `
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`;
      })
      .join('') +
    '</ul>';
  document.getElementById('repositories').innerHTML = reposList;
}

function getRepositories() {
  const name = document.getElementById('username').value;
  const uri = rootURL + '/users/' + name + '/repos';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayRepositories);
  xhr.open('GET', uri);
  xhr.send();
  return false;
}

function getCommits(el) {
  const name = el.dataset.repository
  const uri = rootURL + '/repos/' + el.dataset.username + '/' + name +'/commits';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayCommits);
  xhr.open('GET', uri);
  xhr.send();
}

function getBranches(el) {
  const name = el.dataset.repository;
  const uri = rootURL + '/repos/' + el.dataset.username + '/' + name + '/branches';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayBranches);
  xhr.open('GET', uri);
  xhr.send();
}
