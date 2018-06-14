function getRepositories() {
  let username = document.getElementById("username").value;
  const request = new XMLHttpRequest();
  request.addEventListener("load", displayRepositories);
  request.open("GET", "https://api.github.com/users/" + username + "/repos");
  request.send();
}

function getCommits(element) {
  const username = element.dataset.username
  const reponame = element.dataset.repository
  const request = new XMLHttpRequest()
  request.addEventListener("load", displayCommits)
  request.open("GET", 'https://api.github.com/repos/' + username + '/' + reponame + '/commits')
  request.send()
}

function getBranches(element) {
  const username = element.dataset.username
  const reponame = element.dataset.repository
  const request = new XMLHttpRequest()
  request.addEventListener("load", displayBranches)
  request.open("GET", 'https://api.github.com/repos/' + username + '/' + reponame + '/branches')
  request.send()

}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li><h3> ' + r.name +
   '</h3>'+' URL: <a href="'+r.html_url+'" target="_blank">'+r.html_url+'</a>'+
   '<br><a href="#" data-repository="' + r.name +
   '" data-username="' + r.owner.login +
   '" onclick="getCommits(this)">Commits</a> | '+
   ' <a href="#" data-repository="' + r.name +
   '" data-username="' + r.owner.login +
   '" onclick="getBranches(this)">Branches</a>'+
   '</li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<h2>List of commits</h2><ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<h4>List of branches</h4><ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong> - commit url:' + branch.commit.url + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
