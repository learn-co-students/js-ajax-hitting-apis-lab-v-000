function getRepositories() {
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayRepositories);
  const url = `https://api.github.com/users/${username}/repos`
  req.open('GET', url)
  req.send()
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        "<li>" +
        `<a href="https://github.com/${r.full_name}">${r.full_name}</a>` +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getBranches(this)">Get branches</a>' +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits from HEAD</a></li>'
    )
    .join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const username = document.getElementById("username").value
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  const url = `https://api.github.com/repos/${username}/${name}/commits`
  req.open('GET', url)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        "<li><strong>" +
        commit.commit.author.name +
        "</strong> - " +
        commit.commit.message +
        " - " +
        commit.author.login +
        "</li>"
    )
    .join("")}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}

function getBranches(el) {
  const username = document.getElementById("username").value
  const repo = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayBranches);
  const url = `https://api.github.com/repos/${username}/${repo}/branches`
  req.open('GET', url)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(branches);
  const branchesList = `<ul>${branches
    .map(
      branch =>
        "<li><strong>" +
        branch.name +
        "</strong> " +
        "</li>"
    )
    .join("")}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
}
