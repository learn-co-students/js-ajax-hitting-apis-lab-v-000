let username = document.getElementById('username').value

console.log(username)


function getRepositories(el) {
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", "https://api.github.com/users/octocat/repos");
  req.send();
}

function getBranches(el) {
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/octocat/Spoon-Knife/branches');
  req.send();
}


function getCommits(el) {
  //const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", "https://api.github.com/repos/octocat/Spoon-Knife/commits");
  req.send();
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  //console.log(repos)
  const repoList = `<a href="#" data-repo= onclick="displayCommits(this)">test</a>${repos[0].full_name}, ${repos[0].name},${repos[0].clone_url} `;
  document.getElementById("repositories").innerHTML = repoList;
}

function displayCommits(event, data) {
  var commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `${commits[0].commit.author.name}, ${commits[0].author.login}, ${commits[0].commit.message},`;
  document.getElementById("details").innerHTML = commitsList;
}

function displayBranches(event, data) {
  const commits = JSON.parse(this.responseText);
  const branchesList = "master";
  document.getElementById("details").innerHTML = branchesList;
}
