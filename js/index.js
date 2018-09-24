// your code here

function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.querySelector("#username").value;

  req.addEventListener("load", displayRepositories);
  req.open("GET", "https://api.github.com/users/" + username + "/repos");
  req.send();
}

function getCommits(el) {
  const repository = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open(
    "GET",
    "https://api.github.com/repos/" + username + "/" + repository + "/commits"
  );
  req.send();
}

function getBranches(el) {
  const repository = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();

  req.addEventListener("load", displayBranches);
  req.open(
    "GET",
    "https://api.github.com/repos/" + username + "/" + repository + "/branches"
  );
  req.send();
}

function displayBranches() {
  var branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(r => "<li>" + r.name + "</li>")
    .join("")}</ul>`;

  document.getElementById("details").innerHTML += branchesList;
}

function displayCommits() {
  var commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      r =>
        "<li>" +
        r.author.login +
        " - " +
        r.commit.message +
        " - " +
        r.commit.committer.name +
        "</li>"
    )
    .join("")}</ul>`;

  document.getElementById("details").innerHTML += commitsList;
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(
      r =>
        "<li>" +
        `<h2>${r.name}</h2><br>` +
        `<a href="${r.html_url}">${r.html_url}</a><br>` +
        ' - <a href="#" data-repository="' +
        r.name +
        '"' +
        ' data-username="' +
        r.owner.login +
        '" onclick="getCommits(this)">Get Commits</a><br>' +
        '<a href="#" data-repository="' +
        r.name +
        '"' +
        ' data-username="' +
        r.owner.login +
        '" onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}
