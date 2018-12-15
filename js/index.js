function getRepositories() {
  let user_name = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${user_name}/repos`);
  req.send();
}


function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList =
    `<ul>${repos.map(
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


function getCommits(list_item) {
  const owner = list_item.dataset.username;
  const repoName = list_item.dataset.repository;
  const apiUri = 'https://api.github.com/repos/' + owner + '/' + repoName + '/commits'
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', apiUri)
  req.send();
}


function displayCommits() {
  let commits = JSON.parse(this.responseText);
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


function getBranches(list_item) {
  const owner = list_item.dataset.username;
  const repoName = list_item.dataset.repository;
  const apiUri = 'https://api.github.com/repos/' + owner + '/' + repoName + '/branches';
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', apiUri);
  req.send();
}


function displayBranches() {
  let branches = JSON.parse(this.responseText);
  let branchList =
    `<ul>${branches.map(
      b =>
        '<li>' +
          b.name +
        '</li>'
    ).join('')}</ul>`;

    document.getElementById('details').innerHTML = branchList;
}
