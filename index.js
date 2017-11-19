function getRepositories() {
  const user = document.getElementById("username").value;
  const url = "https://api.github.com/users/" + user + "/repos";
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", url);
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);

  // <h2>${repo.name}</h2>
  // <a href="${repo.html_url}">${repo.html_url}</a><br>
  //
  const repoList = `<ul>${repos
    .map(
      repo =>
        "<li>" +
        `<h2>${repo.name}</h2>` +
        `<a href="${repo.html_url}">${repo.html_url}</a><br>` +
        ' - <a href="#" data-repository="' +
        repo.name +
        '" data-username="' +
        repo.owner.login +
        '" onclick="getCommits(this)">Get Commits</a>' +
        ' - <a href="#" data-repository="' +
        repo.name +
        '" data-username="' +
        repo.owner.login +
        '" onclick="getBranches(this)">Get Branches</a>' +
        "</li>"
    )
    .join("")}</ul>`;

  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(element) {
  const username = element.dataset.username;
  const repository = element.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open(
    "GET",
    "https://api.github.com/repos/" + username + "/" + repository + "/commits"
  );
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  let commitList = `<ul>${commits.map(
    commit =>
      "<li><strong>" +
      commit.commit.author.name +
      "</strong>" +
      " (" +
      commit.author.login +
      ") - " +
      commit.commit.message +
      "</li></br>"
  )}</ul>`;
  document.getElementById("details").innerHTML = commitList.replace(/,/g, "");
}

function getBranches(element) {
  const username = element.dataset.username;
  const repository = element.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open(
    "GET",
    "https://api.github.com/repos/" + username + "/" + repository + "/branches"
  );
  req.send();
}
// GET /repos/:owner/:repo/branches
function displayBranches() {
  const branches = JSON.parse(this.responseText);
  let branchList = `<ul>${branches.map(
    branch => "<li>" + branch.name + "</li></br>"
  )}</ul>`;
  document.getElementById("details").innerHTML = branchList.replace(/,/g, "");
}
