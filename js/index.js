// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${document.getElementById('username').value}/repos`)
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>' + " " + '<li>' + r.html_url + '</li>' + " " + '<li>' + '<a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}


function getCommits(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${document.getElementById('username').value}/` + name + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits[0].commit.author.name)
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        `${commit.commit.message}` + `- ${commit.commit.author.name}` +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  console.log(el)
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${document.getElementById('username').value}/` + name + '/branches');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(
      branch =>
        '<li><strong>' +
        branch.name +
        '</strong></li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;

}
