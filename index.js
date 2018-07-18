function getRepositories(){
  const username = document.getElementById('username').value;

  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories)
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
};

function displayRepositories(){
  const repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => `<li><a href=${r.html_url}>${r.name}</a>, <a href='#' data-repository='${r.name}' data-username='${r.owner.login}' onclick='getCommits(this)'>See Commits</a>, <a href='#' data-repository='${r.name}' data-username='${r.owner.login}' onclick='getBranches(this)'>See Branches</a></li>`).join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
};

function getCommits(element){
  //<a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">
  const repo = element.dataset.repository;
  const owner = element.dataset.username;

  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${owner}/${repo}/commits`);
  req.send();
};

function displayCommits(){
  const commits = JSON.parse(this.responseText);
  const commitList = commits.map(c => `<ul><li>Github username: ${c.committer.login}</li><li>Full name: ${c.commit.committer.name}</li><li>Message: ${c.commit.message}</li></ul>`).join('');

  document.getElementById('details').innerHTML = commitList;
};

function getBranches(element){
  const repo = element.dataset.repository;
  const owner = element.dataset.username;

  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${owner}/${repo}/branches`);
  req.send();
};

function displayBranches(){
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches.map(b => `<li>${b.name}</li>`).join('')}</ul>`;

  document.getElementById('details').innerHTML = branchList;
};
