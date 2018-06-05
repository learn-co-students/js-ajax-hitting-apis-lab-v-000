function displayRepositories(e, data) {
  const repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="' + r.html_url + '">' + r.html_url + '</a>' +
  '<a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getCommits(this)"> Get Commits </a><br><a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getBranches(this)"> Get Branches </a></li>').join('')}</ul>`

  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  let username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos', + username + "/repos")
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  console.log(commits)
  const commitsList = `<ul>${commits.map(c => '<li><b>Github Name: </b> ' + c.author.login + '<br> <b>Author Name:</b> '
   + c.commit.author.name + '<br><b>Commit Message:</b> ' + c.commit.message + '</li>').join('')}</ul>`
   document.getElementById("details").innerHTML = commitsList
}

//grab the data-repo value through the dataset property, then set up an XHR request, with an event listener and callback function
function getCommits(user) {
  let username = user.dataset.username
  const repoName = user.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", "https://api.github.com/repos/" + username + "/" + repoName + "/commits");
  req.send();
}

function displayBranches() {
 const branches = JSON.parse(this.responseText);
 console.log(branches);
 const branchesList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`
 document.getElementById("details").innerHTML = branchesList
}

function getBranches(user) {
  let username = user.dataset.username
  const repoName = user.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", "https://api.github.com/repos/" + username + "/" + repoName + "/branches");
  req.send();

}
