// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  const params = document.getElementById("username").value
  req.open('GET', `https://api.github.com/users/${params}/repos`);
  req.send();
}


function displayRepositories() {
  //this is set to the XMLHttpRequest object that fired the event
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
      .map(r => '<li><p><strong>' + r.name + '</strong></p>' + r.html_url +
      ' - <a href="#" data-repository="' +
      r.name +
      '" onclick="getCommits(this)">Get Commits</a></li>' +
      ' - <a href="#" data-repository="' +
      r.name +
      '" onclick="getBranches(this)">Get Branches</a></li>'
      )
      .join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repository;
  console.log('https://api.github.com/repos/octocat/' + name + '/commits');
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit => '<li>' +
        commit.commit.author.name +
        '(' + commit.author.login + ')' +
        '---' + commit.commit.message + '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/branches');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches
    .map(
      branch => '<li>' + branch.name +
         '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchList;
}
