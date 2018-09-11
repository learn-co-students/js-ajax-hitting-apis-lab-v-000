function displayBranches(ev) {
  const branches = JSON.parse(this.responseText);
   const branchList = `<ul>${branches
     .map(
       branch =>
         '<li><strong>' +
         branch.name +
         '</strong>' +
         '</li>'
     )
     .join('')}</ul>`;
   document.getElementById('details').innerHTML = branchList;
}


function getBranches(el) {
  const name = el.dataset.repo; // from show repositories <a> data-repo
  const user = el.dataset.user;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + user + '/' + name + '/branches');
  req.send();
}

function displayCommits(ev) {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
     .map(
       commitInfo =>
         '<li><strong>' +
         commitInfo.author.login + ' - ' +
         commitInfo.commit.author.name +
         '</strong> - ' +
         commitInfo.commit.message +
         '</li>'
     )
     .join('')}</ul>`;
   document.getElementById('details').innerHTML = commitsList;
}

function getCommits(el) {
  const name = el.dataset.repo; // from show repositories <a> data-repo
  const user = el.dataset.user;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + user + '/' + name + '/commits');
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  var user = repos[0].owner.login;
  const repoList = `<ul>${repos
    .map(
       r =>
         '<li>' +
         r.name +
         ' - <a href="#" data-repo="' +
         r.name +
         '" data-user="' +
         user +
         '" onclick="getCommits(this)">Get Commits</a></li>' +
         ' - <a href="#" data-repo="' +
         r.name +
         '" data-user="' +
         user +
         '" onclick="getBranches(this)">Get Branches</a></li>'
     )
    .join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}
