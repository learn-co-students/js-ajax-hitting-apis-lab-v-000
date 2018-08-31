function getRepositories() {
  const req = new XMLHttpRequest();
  const user = document.getElementById("username").value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${user}/repos`);
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `${repos.map(r => r.html_url)}`;
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const req = new XMLHttpRequest();
  const repo = el.dataset.repository;
  const user = el.dataset.username;
  req.addEventListener("load", showCommits);
  req.open("GET", `https://api.github.com/repos/${user}/${repo}/commits`);
  req.send();
}

function showCommits () {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("commits").innerHTML = commitsList;
}
