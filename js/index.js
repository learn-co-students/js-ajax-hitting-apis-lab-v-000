// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username.value}/repos`);
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos.map(r => 
    '<li>' + 
    '<a href="' + 
    r.html_url + 
    '">' + 
    r.name +
    '</a>' + 
    ' | ' +
    '<a href="#" data-repo="' +
    r.name +
    '" onclick="getCommits(this)">Get Commits</a>' +
    ' | ' +
    '<a href="#" data-repo="' + 
    r.name +
    '" onclick="getBranches(this)">Get Branches</a>' + 
    '</li><br>').join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  console.log(el);
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username.value}/${name}/commits`);
  req.send();
}

function displayCommits() {
  let commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits.map(c => 
    '<li><strong>' +
    c.commit.author.name +
    ' (' +
    c.author.login +
    ')' +
    '</strong> - ' +
    c.commit.message +
    '</li>'
    ).join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username.value}/${name}/branches`);
  req.send();
}

function displayBranches() {
  let branches = JSON.parse(this.responseText);
  console.log(branches);
  let branchesList = `<ul>${branches.map(b =>
    '<li>' + b.name + '</li>').join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;
}