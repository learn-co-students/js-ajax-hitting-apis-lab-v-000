function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText);
  const repoList = '<ul>' + repos.map(r => `<li>${r.name}<br/>
    <a href="${r.html_url}">${r.html_url}</a><br/>
    <a href="#" data-username="${r.owner.login}" data-repository="${r.name}" onclick="getBranches(this)">Get Branches</a> |
    <a href="#" data-username="${r.owner.login}" data-repository="${r.name}" onclick="getCommits(this)">Get Commits</a>
    </li>`).join('') + '</ul>';
  document.getElementById("repositories").innerHTML = repoList;
}

function displayBranches(){
  const branches = JSON.parse(this.responseText);
  const branchesList = '<strong>Branches:</strong><ul>' +
    branches.map(branch => `<li>${branch.name}</li>`).join('') + '</ul>';
  document.getElementById('details').innerHTML = branchesList;
}

function displayCommits(){
  const commits = JSON.parse(this.responseText);
  const commitsList = '<strong>Commits:</strong><ul>' +
    commits.map(commit => `<li><strong>${commit.commit.author.name} (${commit.author.login})</strong><br/>
    ${commit.commit.message}</li>`).join('') + '</ul>';
  document.getElementById('details').innerHTML = commitsList;
}

function getRepositories() {
  const req  = new XMLHttpRequest();
  const user = document.getElementById('username').value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${user}/repos`);
  req.send();
}

function getBranches(el) {
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${el.dataset.username}/${el.dataset.repository}/branches`);
  req.send();
}

function getCommits(el) {
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${el.dataset.username}/${el.dataset.repository}/commits`);
  req.send();
}