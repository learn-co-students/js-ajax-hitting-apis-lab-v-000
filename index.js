function getRepositories() {
  const req = new XMLHttpRequest();
  const userName = document.getElementById("username").value;
  req.addEventListener("load", displayRepositories)
  req.open("GET", `https://api.github.com/users/${userName}/repos`)
  req.send();
}

function displayRepositories() {
  const resp = JSON.parse(this.responseText);
  const template = Handlebars.compile(document.getElementById("repositories-template").innerHTML);
  const result = template(resp);
  document.getElementById("repositories").innerHTML = result;
}

function getCommits(link) {
  const owner = link.dataset.username;
  const repo = link.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${owner}/${repo}/commits`);
  req.send();
}

function displayCommits() {
  const resp = JSON.parse(this.responseText);
  const template = Handlebars.compile(document.getElementById("commits-template").innerHTML);
  const result = template(resp);
  document.getElementById("details").innerHTML = result;
}

function getBranches(link) {
  const owner = link.dataset.username;
  const repo = link.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${owner}/${repo}/branches`);
  req.send();
}

function displayBranches() {
  const resp = JSON.parse(this.responseText);
  const template = Handlebars.compile(document.getElementById("branches-template").innerHTML);
  const result = template(resp);
  document.getElementById("details").innerHTML = result;
}
