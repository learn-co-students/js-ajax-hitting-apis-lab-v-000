function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoTemplate = _.template(document.getElementById("repository-template").innerHTML);
  document.getElementById("repositories").innerHTML = '<ul id="repositories-list"></ul>';
  var repoList = document.getElementById("repositories-list").innerHTML;
  repos.map(r => repoList += repoTemplate({'html_url': r.html_url, 'name': r.name, 'username': r.owner.login}));
  document.getElementById("repositories").innerHTML = repoList;
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitTemplate = _.template(document.getElementById("commit-template").innerHTML);
  document.getElementById("details").innerHTML = '<ul id="commits-list"></ul>';
  var commitsList = document.getElementById("commits-list").innerHTML;
  commits.map(c => commitsList += commitTemplate({'author_name': c.commit.author.name, 'username': c.author.login, 'message': c.commit.message}));
  document.getElementById("details").innerHTML = commitsList;
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchTemplate = _.template(document.getElementById("branch-template").innerHTML);
  document.getElementById("details").innerHTML = '<ul id="branches-list"></ul>';
  var branchesList = document.getElementById("branches-list").innerHTML;
  branches.map(b => branchesList += branchTemplate({'name': b.name}))
  //console.log(branches);
  //var branchesInfo = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById("username").value;
  const apiURL = "https://api.github.com/users/" + username + "/repos";
  req.addEventListener("load", displayRepositories);
  req.open("GET", apiURL);
  req.send();
}

function getCommits(el) {
  const repository = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/commits');
  req.send();
}

function getBranches(el) {
  const repository = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/branches');
  req.send();
}
