function preventRefreshOnSubmit(){
  document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault()
  })
}
preventRefreshOnSubmit()

function getRepositoriesForUser() {
  document.querySelector('form').addEventListener('submit', getRepositories())
}

function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById('username').value;
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        ' - ' + r.owner.login + 
        ' - <a href="https://github.com/' + r.full_name + '">https://github.com/' + r.full_name + '</a>' + 
        ' - <a href="#"  data-repo="' + r.name +'" onclick="getCommits(this)">Get Commits</a>' + 
        ' - <a href="#"  data-repo="' + r.name +'" onclick="getBranches(this)">Get Branches</a></li>'
        )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}
 
function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  console.log(el)
  req.open('GET', `https://api.github.com/repos/octocat/${name}/commits`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li>' + commit.author.login + ' - ' + commit.commit.author.name + ' - ' + commit.commit.message + '</li>'
    ).join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/octocat/${name}/branches`);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(branches)
  const branchesList = `<ul>${branches
    .map(
      branch =>
        '<li>'+ branch.name + '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}

