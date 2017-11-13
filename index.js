function displayRepositories(event) {

  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById("username").value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)

  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> - (@' + commit.author.login + ") " + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getCommits(el) {
  const repo = el.dataset.repo //Here we grab that data-repo value through the dataset property,
  const username = el.dataset.username
  const req = new XMLHttpRequest() //then set up an XHR request,
  req.addEventListener("load", displayCommits) //with an event listener and callback function, just like we did in getRepositories
  req.open("GET", `https://api.github.com/repos/${username}/${repo}/commits`)
  req.send()
}
