function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + document.getElementById('username').value +'/repos');
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>
  ${repos.map(r => '<li>' + '<a href="#" data-name="'+ r.full_name +'" onclick="click_func(this)">' + r.name + ": " + r.html_url + '</a>' + '</li>').join('')}
  </ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + name + '/' + repo + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + " - " + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el){
  const name = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + name + '/' + repo + '/branches');
  console.log(el)
  req.send();
}

function displayBranches(){
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}

function click_func(elm) {
    getCommits(elm);
    getBranches(elm);
}