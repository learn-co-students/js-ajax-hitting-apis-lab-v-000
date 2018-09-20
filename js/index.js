// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  let username = document.getElementById("username").value
  let url = 'https://api.github.com/users/' + username + '/repos'
  req.open('GET', url);
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  let repoArray = repos.map(function (repo) {
    return `<ul><li><strong>${repo.owner.login}</strong> - ${repo.name}<ul><li>URL: <u> ${repo.html_url}</u></li><li><a href="#" data-repository="${repo.name}" onclick="getCommits(this)">Get Commits</a></li><li><a href="#" data-repository="${repo.name}" onclick="getBranches(this)">Get Branches</a></li></ul></li></ul>`
  })
  document.getElementById('repositories').innerHTML = repoArray.join('');
}

function getCommits(el) {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  let username = document.getElementById("username").value
  let repo = el.dataset.repository
  let url = 'https://api.github.com/repos/' + username + '/' + repo + '/commits'
  req.open('GET', url);
  req.send();
}

function displayCommits() {
  var commits = JSON.parse(this.responseText);
  let commitArray = commits.map(function (el) {
    if ((el.commit.author.name) && (el.author != null)){
      return `<ul><li><strong>${el.author.login}</strong> - ${el.commit.message} - By:  ${el.commit.author.name}</li></ul>`
    } else {
      return `<ul><li><strong>Anonymous</strong> - ${el.commit.message}</li></ul>`
    }
  })
  document.getElementById('details').innerHTML = commitArray.join('');
}

function getBranches(el) {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  let username = document.getElementById("username").value
  let repo = el.dataset.repository
  let url = 'https://api.github.com/repos/' + username + '/' + repo + '/branches'
  req.open('GET', url);
  req.send();
}

function displayBranches() {
  var branches = JSON.parse(this.responseText);
  let branchNames = branches.map(function (el) {
    return `<ul><li>${el.name}</li></ul>`
  })
  document.getElementById('details').innerHTML = branchNames.join('');
}
