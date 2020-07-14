function getRepositories() {
  let username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}


function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        ' - <a href="' +
        r.html_url +
        '">Repo Website</a>' +
        ' - <a href="#" data-repository="' +
        r.name +
        '" data-username="' +
        r.owner.login + '" onclick="getCommits(this)">Get Commits</a> - <a href="' +
        r.html_url +
        '">Repo Website</a> - <a href="#" data-repository="' +
        r.name +
        '" data-username="' +
        r.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

//GET /repos/:owner/:repo/commits
function getCommits(el) {
  const repository = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/'+ repository +'/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.commit.author.name +
        '</strong>' +
        commit.author.login +
        ' - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

// GET /repos/:owner/:repo/branches
function getBranches(el) {
  const repository = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username + '/'+ repository +'/branches');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(branches);
  const branchesList = `<ul>${branches
    .map(
      branch =>
        '<li><strong>' +
        branch.name +
        '</strong></li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}