function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(
      branch =>
        '<li><strong>' +
        branch.name +
        '</strong> - ' +
        '</li>'
    )
    .join('')}</ul>`;

    document.getElementById('details').innerHTML = branchesList;
}

function getBranches(el) {
  const username= el.dataset.username;
  const repository = el.dataset.repository;
  console.log(username, repository);
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repository + '/branches');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits[0]);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.author.name +
        ' - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;

    document.getElementById('details').innerHTML = commitsList;
}
//
function getCommits(el) {
  const username = el.dataset.username;
  const repository = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repository + '/commits');
  req.send();
}

function displayRepositories() {
	var repos = JSON.parse(this.responseText);
	const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name + ' - <a href="' + r.html_url + '" >' + r.html_url + '</a>' +
        '- <a href="#" data-username="' +
        r.owner.login + '" data-repository="' + r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>' +
        '- <a href="#" data-username="' +
        r.owner.login + '" data-repository="' + r.name +
        '" onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join('')}</ul>`;
	document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  let userName = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + userName + '/repos');
  req.send();
}
