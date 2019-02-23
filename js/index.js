function getRepositories() {
  let username = document.getElementById("username").value;
  let repos = `https://api.github.com/users/${username}/repos`;

  let req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", repos);
  req.send();
}




function getCommits() {

}


function getBranches() {

}


function displayCommits() {

}


function displayBranches() {

}


function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  let repoList = `<ul>${repos.map(r => "<li>" + r.name + "<a href="${r.html_url}">" + "</li>").join(" ")}</ul>`;

  document.getElementById('repositories').innerHTML = repoList;
}
