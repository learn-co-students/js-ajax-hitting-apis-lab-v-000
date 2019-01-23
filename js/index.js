function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById("username").value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(
      r =>
        `<li><a href="${r.html_url}">${r.name}</a></li>` +
        `<a href="#" data-repository="${
          r.name
        }" onclick ="getCommits(this)">Get Commits</a>` +
        ` - <a href="#" data-repository="${
          r.name
        }" onclick ="getBranches(this)">Get Branches</a>`
    )
    .join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const repoName = el.dataset.repository;
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open(
    "GET",
    `https://api.github.com/repos/${username}/${repoName}/commits`
  );
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      c =>
        `<li>${c.author.login} - ${c.commit.author.name}
      - ${c.commit.message}</li>`
    )
    .join("")}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}

function getBranches(el) {
  const repoName = el.dataset.repository;
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open(
    "GET",
    `https://api.github.com/repos/${username}/${repoName}/branches`
  );
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches
    .map(b => `<li>${b.name}</li>`)
    .join("")}</ul>`;
  document.getElementById("details").innerHTML = branchList;
}
