function getRepositories() {
  let username = document.getElementById('name').value;

  const req = new XMLHttpRequest();

  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r =>
    '<li>' +
      r.owner.login + '<br>' +
      r.name + '<br>' +
      r.html_url + '<br>' +
      '<a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)"> Get Commits</a>' + '<br>' +
      '<a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)"> Get Branches</a>' +
    '</li>'
  ).join('')}</ul>`

  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()

  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`);
  req.send();
}

function displayCommits() {
  let commits = JSON.parse(this.responseText)

  const commitList = `<ul>${commits.map(c =>
    '<li>' +
      c.commit.author.name + '<br>' +
      c.author.login + '<br>' +
      c.commit.message +
    '</li>'
  ).join('')}</ul>`

  document.getElementById("details").innerHTML = commitList
}

function getBranches(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()

  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/branches`);
  req.send();
}

function displayBranches() {
  let branches = JSON.parse(this.responseText);
  console.log(branches)
  const branchList = `<ul>${branches.map(b =>
    '<li>' +
      b.name + '<br>' +
    '</li>'
  ).join('')}</ul>`

  document.getElementById("details").innerHTML = branchList;
}
