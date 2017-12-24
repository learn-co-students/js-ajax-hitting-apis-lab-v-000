function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => '<li>' + '<a href=' + r.html_url + '>' + r.name + '</a> -  <a href="#" data-url="' + r.name + '" onclick="getCommits(this)">Get Commits</a>' + '</li>').join('')}</ul>`
  // const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const username = document.getElementById("username").value;
  const name = el.dataset.url;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/` + name + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  debugger;
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + commit.author.login +  '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
