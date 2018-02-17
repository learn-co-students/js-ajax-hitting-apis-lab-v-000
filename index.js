const rootURL = 'https://api.github.com/'

function getRepositories() {
  const username = document.getElementById("username").value;
  const uri = rootURL + 'users/' + username + '/repos'
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", uri);
  req.send();
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r =>
    '<li><h3><a href="' + r.html_url + '">' + r.name + '</a></h3>' +'<a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '"onclick="getCommits(this)">Get Commits</a><br>' +
    '<a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '"onclick="getBranches(this)">Get Branches</a><br></li>').join("")}<ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const uri = rootURL + 'repos/' + el.dataset.username + '/' + el.dataset.repository + '/commits'
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", uri);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(c => '<li><strong>' +  c.commit.author.name + ' (' + c.author.login + ') </strong> - ' + c.commit.message + '</li>').join("")}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}

function getBranches(el) {
  const uri = rootURL + 'repos/' + el.dataset.username + '/' + el.dataset.repository + '/branches'
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", uri);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches.map(b => '<li>' +  b.name + '</li>').join("")}</ul>`;
  document.getElementById("details").innerHTML = branchList;
}
