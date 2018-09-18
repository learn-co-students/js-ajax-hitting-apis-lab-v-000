function getRepositories() {
  let username = document.getElementById('username').value
  let req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`)
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  let repoList = `<ul>${repos.map(r => '<li>' + r.name + ` - <a href="${r.html_url}">${r.html_url}</a>` + ' - <a href="#" data-repo="' +  r.name +'" onclick="getCommits(this)">Get Commits</a> '+ ' - <a href="#" data-repo="' +  r.name +'" onclick="getBranches(this)">Get Branches</a>' + '</li>').join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}


function getCommits(el) {
  let username = document.getElementById('username').value
  let name = el.dataset.repo; 
  let req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  console.log(`https://api.github.com/repos/${username}/` + name + '/commits')
  req.open('GET', `https://api.github.com/repos/${username}/` + name + '/commits')
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.committer.name + '</strong> - ' + commit.author.login +' - ' + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  let username = document.getElementById('username').value
  let name = el.dataset.repo; 
  let req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/` + name + '/branches')
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}



