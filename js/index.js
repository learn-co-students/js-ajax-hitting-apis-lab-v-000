const root = 'https://api.github.com';

function getRepositories() {
    // get the username from the form
    const name = document.getElementById('username').value;
    const uri = root + '/users/' + name + '/repos';
    // create XHR object
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories);
    req.open('GET', uri);
    req.send();
    return false;
};

function displayRepositories() {
    const repos = JSON.parse(this.responseText);
    const repoList =
      '<ul>' +
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
    document.getElementById('repositories').innerHTML = repoList;
  };

function getCommits(el) {
    const repoName = el.dataset.repository;
    const uri = root + '/repos/' + el.dataset.username + '/' + repoName + '/commits';
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', uri);
    req.send();
};

function displayCommits() {
    let commits = JSON.parse(this.responseText);
    let commitsList = `<ul>${commits
        .map(
            commit =>
                '<li><h3>' +
                commit.commit.author.name +
                ' (' +
                commit.author.login +
                ')</h3>' +
                commit.commit.message +
                '</li>'
        )
        .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
};

function getBranches(el) {
    const repoName = el.dataset.repository;
    const uri = root + '/repos/' + el.dataset.username + '/' + repoName + '/branches';
    let req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', uri);
    req.send();
};

function displayBranches(el) {
    let branches = JSON.parse(this.responseText);
    let branchesList = `<ul>${branches
        .map(
            branch =>
                '<li>' +
                branch.name +
                '</li>'
        )
        .join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;
};