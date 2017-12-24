function getRepositories() {
  debugger;
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => '<li>' + '<a href=' + r.html_url + '>' + r.name + '</a>' + '</li>').join('')}</ul>`
  // const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList;
}
