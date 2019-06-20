function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + document.getElementById('username').value +'/repos');
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
          '<a href=' +
              r.html_url +
          '>' +
              r.name +
          '</a> - ' +

          '<a href="#" data-repository="' +
              r.name + '" data-username="' + document.getElementById('username').value  +
          '" onclick=getCommits(this)>Get Commits</a> - ' +

          '<a href="#" data-repository="' +
            r.name + '" data-username="' + document.getElementById('username').value  +
          '" onclick=getBranches(this)>Get Branches</a>' +
          '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitList = `<ul>${commits.map(
      commit =>
        '<li>' +
          commit.commit.message +
          ' - ' +
          commit.author.login +
          ' - ' +
          commit.commit.author.name +
        '</li>'
  ).join('')}</ul>`;
  document.getElementById('details').innerHTML = commitList;
}

function getBranches(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/branches');
  req.send();
}
function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches.map(
    branch =>
      '<li>' +
        branch.name +
      '</li>'
  ).join('')}</ul>`;
  document.getElementById('details').innerHTML = branchList;
}
