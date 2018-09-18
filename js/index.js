// your code here

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitList = `<ul>${commits
    .map(c => '<li><p>Commit Author: ' + c.commit.author.name + '</p><p>Repo Author: ' + c.author.login + '</p><p>Commit Message: ' + c.commit.message + '</p></li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitList;
}

function getCommits(el) {
  const repo = el.dataset.repo;
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repo + '/commits');
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(r => '<li><p>Repo Name: ' + r.name + '</p><p>Author: ' + r.owner.login + '</p><p>URL: ' + r.html_url + '</p><a href="#" data-repo=' + r.name + '" onclick=getCommits(this)">Get Commits</a></li>')
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById('username').value;
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + username + '/repos');
  req.send();
}
