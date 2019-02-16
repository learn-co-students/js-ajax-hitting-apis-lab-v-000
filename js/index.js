// your code here
function getRepositories() {
  let username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + username + '/repos');
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos.map(
    r =>
      '<li>' +
        '<a href="https://github.com/' + r.owner.login + '/' + r.name + '">' + r.name + '</a>' +
        ' - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a>' +
        ' - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a>' +
      '</li>'
  )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(i) {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + i.dataset.username + '/' + i.dataset.repository + '/commits');
  req.send();
}

function displayCommits() {
  var commits = JSON.parse(this.responseText);
  console.log(commits);
  let commitsList =
    `<ul>${commits.map(
      c =>
        '<li>' +
          'Username: ' + c.author.login + '<br />' +
          'Full Name: ' + c.commit.author.name + '<br />' +
          'Commit Message: ' + c.commit.message +
        '</li>' + '<br />'
    ).join('')}</u>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(i) {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + i.dataset.username + '/' + i.dataset.repository + '/branches');
  req.send();
}

function displayBranches() {
  var branches = JSON.parse(this.responseText);
  console.log(branches);
  let branchesList =
    `<ul>${branches.map(
      b =>
        '<li>' +
          b.name +
          '</li>' + '<br />'
        ).join('')}</u>`;
    document.getElementById('details').innerHTML = branchesList;
}
