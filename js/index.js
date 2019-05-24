// your code here


function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById("username").value

  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + username + '/repos');
  req.send;
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();

  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + name + '/commits')
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li>' +
        commit.author.login +
        ' - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;

  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(){

}

function displayBranches() {

}
