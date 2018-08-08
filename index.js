function getRepositories() {
  const req = new XMLHttpRequest();
  var username = document.getElementById("username").value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", "https://api.github.com/users/" + username + "/repos");
  req.send();
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        "<li>" +
        r.name +
        ' - <a href="#" data-username="' +
        r.html_url +
        '" data-repo="' +
        r.name +
        '">Link</a> - <a href="#" onclick="getCommits(this)" data-username="' +
        r.owner["login"] +
        '" data-repository="' +
        r.name +
        '">Get Commits</a> - <a href="#" onclick="getBranches(this)" data-username="' +
        r.owner["login"] +
        '" data-repository="' +
        r.name +
        '">Get Branches</a></li>'
    )
    .join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  var username = document.getElementById("username").value;
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open(
    "GET",
    "https://api.github.com/repos/" + username + "/" + name + "/commits"
  );
  req.send();
}
function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        "<li><strong>" +
        commit.author.login +
        "</strong> (" +
        commit.commit.author.name +
        ") - " +
        commit.commit.message +
        "</li>"
    )
    .join("")}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}
function getBranches(el) {
  var username = document.getElementById("username").value;
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open(
    "GET",
    "https://api.github.com/repos/" + username + "/" + name + "/branches"
  );
  req.send();
}
function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(branch => "<li>" + branch.name + "</li>")
    .join("")}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
}
