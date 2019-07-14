// your code here
function displayRepositories(){
  var repos = JSON.parse(this.responseText);
  //console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li><strong>' +
        r.name +
        '</strong> - <a href="' + r.html_url + '">Visit Repo</a>' +
        ' - <a href="#" data-repository="' +
        r.name +
        '" data-username="' +
        r.owner.login +
        '" onclick="getCommits(this)">Get Commits</a>' +
        ' - <a href="#" data-repository="' +
        r.name +
        '" data-username="' +
        r.owner.login +
        '" onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories(){
  //console.log("called");
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  var un = document.getElementById('username').value;
  //console.log(un);
  req.open('GET', 'https://api.github.com/users/' + un + '/repos');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.commit.author.name +
        '</strong> - ' +
        commit.author.login +
        ' - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getCommits(el) {
  const repo = el.dataset.repository;
  const owner = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + owner + '/' + repo + '/commits');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches
    .map(
      b =>
        '<li><strong>' +
        b.name +
      //  '</strong> - ' +
      //  b.author.login +
        '</strong></li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchList;
}

function getBranches(el) {
  const repo = el.dataset.zrepo;
  const owner = el.dataset.zun;

  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + owner + '/' + repo + '/branches');
  req.send();
}
