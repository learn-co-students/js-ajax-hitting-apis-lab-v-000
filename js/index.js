function displayRepositories() {
  //this is set to the XMLHttpRequest object that fired the event
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(r => '<li>' + '<a href="' + r.html_url + '">' + r.name + '</a>' +
        ' - <a href="#" data-repository="' + r.name + '" data-username="' +  r.owner.login +
        '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repository="' + r.name +
        '" data-username="' +  r.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>')
    .join('')}</ul>`;
    //Add a link to each repository that calls a getBranches function
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  let username = document.getElementById('username').value;
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
        ' (' +
        commit.commit.author.name +
        ')</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
    //info to include author's Github name, the author's full name, and the commit message.
  document.getElementById('details').innerHTML = commitsList;
}

function getCommits(el) {
  const repository = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repository + '/commits');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches
    .map(
      branch =>
        '<li><strong>' +
        branch.name +
        '</strong></li>'
    )
    .join('')}</ul>`;
  //a list of names of each branch of the repository
  document.getElementById('details').innerHTML = branchList;
}

function getBranches(el) {
  const repository = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repository + '/branches');
  req.send();
}
