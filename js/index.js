function displayRepositories() {
  let repos = JSON.parse(this.responseText);

  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
          //Link to the repository
          '<a href="' +r.html_url + '" target="_blank">' +
            r.name +
          '</a>' +
          ' - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">' +
            'Get Commits' +
          '</a>' +
          ' - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">' +
            'Get Branches' +
          '</a>' +
        '</li>'
      )
    .join('')}
  </ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  username = document.getElementById('username').value;

  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + username + '/repos');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.committer.name + commit.commit.message +
        '</li>'
    )
    .join('')
  }</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getCommits(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/commits');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(
      branch =>
        '<li>' +
        branch.name + branch.message +
        '</li>'
    )
    .join('')
  }</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}

function getBranches(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('lead', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/branches');
  req.send();
}
