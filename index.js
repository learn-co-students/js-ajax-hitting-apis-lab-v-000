function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => '<li><a href="http://www.github.com/' + r.full_name + '">https://github.com/' + r.full_name + '</a> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repo="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById("username").value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos');
  req.send()
}

function getCommits(el) {
  console.log("getCommits fired");
  console.log(el);
  const repo = el.dataset.repository;
  console.log(repo);
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repo + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  commits.forEach(function(el) {
    if (!el.author) {
      el.author = {login: "Unknown"};
    }
  })

  const commitsList = `<h4>Commits</h4><ul>${commits.map(c => '<li><strong>' + c.author.login + ' / ' + c.commit.author.name + '</strong> - ' + c.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}

function getBranches(el) {
  const repo = el.dataset.repository;
  const owner = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + owner + '/' + repo + '/branches');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(branches);

  const branchesList = `<h4>Branches</h4><ul>${branches.map(b => '<li><strong>' + b.name + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
}
