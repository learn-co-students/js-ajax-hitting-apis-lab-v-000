// your code here
// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById('username').value;
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + username + '/repos');
  req.send();
}

function displayRepositories(){
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos.map(r =>
    '<li>' +
    '<a href=' +
    'https://github.com/'+ r.full_name +
    '>' + r.name + '</a>'+ '<br>' +
    '<a href="#" data-repository="' + r.name + '" onclick="getCommits(this);">'+
    'Show Commits' + '</a>' + '<br>' +
    '<a href="#" onclick="getBranches(this);" data-repository="' + r.name + '">'+
    'Get Branches' + '</a>' +
    '</li>'
  )
  .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(u) {
  let username = document.getElementById('username').value;
  const repo = u.dataset.repository;
  console.log(repo);
  let req = new XMLHttpRequest();
  req.addEventListener('load',displayCommits);
  req.open('GET',`https://api.github.com/repos/${username}/${repo}/commits`);
  req.send();
}

function displayCommits() {
  let commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitList = `<ul>${commits.map(c =>
    '<li>'+
    c.committer.login + '<br>' +
    c.commit.author.name + '<br>' +
    c.commit.message + '<hr>'+
    '</li>'
  ).join('')}</ul>`;
  document.getElementById('details').innerHTML = commitList;
}

function getBranches(el) {
  let username = document.getElementById('username').value;
  const repo = el.dataset.repository;
  let req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/branches`);
  req.send();
}

function displayBranches() {
  let branches = JSON.parse(this.responseText);
  console.log(branches);
  const branchList = `<ul>${branches.map(b =>
    '<li>' +
    b.name +
    '</li>'
  ).join('')}</ul>`;
  document.getElementById('details').innerHTML = branchList;
}
