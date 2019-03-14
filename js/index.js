// your code here
function getRepositories() {
  let userName = document.getElementById('username').value;
  const req = new XMLHttpRequest();

  req.addEventListener('load', displayRepositories);

  req.open('GET', `https://api.github.com/users/${userName}/repos`);
  
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);

  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.html_url + '" onclick="getCommits(this)">Get Commits</a>' + '</li>').join('')}</ul>`;

  document.getElementById('repositories').innerHTML = repoList;

}

function getCommits(el) {
  const repoName = el.dataset.repository;
  const uri = 'https://api.github.com' + '/repos/' + el.dataset.username + '/' + repoName + '/commits';
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', displayCommits);

  xhr.open('GET', uri);

  xhr.send();
}

function displayCommits () {
  const commits = JSON.parse(this.responseText);

  const commitsList = `<ul>${commits.map(c => '<li><strong>' + c.author.login + '</strong> - ' + c.commit.committer.name + ' - ' + c.commit.message + '</li>').join('')}</ul>`;
        
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const repoName = el.dataset.repository;
  const uri = 'https://api.github.com' + '/repos/' + el.dataset.username + '/' + repoName + '/branches';
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', displayBranches);

  xhr.open('GET', uri);

  xhr.send();
}

function displayBranches () {
  const branches = JSON.parse(this.responseText);

  const branchesList = `<ul>${branches.map(b => '<li>' + b.name+ ' - ' + '</li>').join('')}</ul>`;
        
  document.getElementById('details').innerHTML = branchesList;
}