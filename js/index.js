function displayBranches() {
  let branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches.map(b =>
    '<li>' + b.name + '</li>'
  ).join('')}</ul>`;
  document.getElementById('details').innerHTML = branchList;
}

function getBranches(el) {
  let owner = el.dataset.username;
  let repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  const URI = 'https://api.github.com/repos/' + owner + '/' + repo + '/branches';
  // GET /repos/:owner/:repo/branches
  req.addEventListener('load', displayBranches);
  req.open('GET', URI);
  req.send();
}

function displayCommits() {
  let commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(c =>
    // console.log(c.commit.message)
    '<li>' + c.author.login + '</li>'
      + '<li>' + c.commit.author.name + '</li>'
      + '<li>' + c.commit.message + '</li>'
  ).join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getCommits(el) {
  let user = el.dataset.username;
  let repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  const URI = 'https://api.github.com/repos/' + user + '/' + repo + '/commits'
  // GET /repos/:owner/:repo/commits
  req.addEventListener('load', displayCommits);
  req.open('GET', URI);
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => { 
    return `
    <li><a href="${r.html_url}">${r.name}</a></li>
    <ul>
      <li><a href="#" data-username="${r.owner.login}" data-repository="${r.name} onclick="getCommits(this)">Get Commits</a></li>
      <li><a href="#" data-username="${r.owner.login}" data-repository="${r.name} onclick="getBranches(this)">Get Branches</a></li><br>
    </ul>
    `
  }).join('')}</ul>`
  document.getElementById('repositories').innerHTML = repoList;
}


function getRepositories() {
  const req = new XMLHttpRequest();
  let userName = document.getElementById("username").value
  let uRi = 'https://api.github.com/users/' + userName + '/repos'
  req.addEventListener('load', displayRepositories);
  req.open('GET', uRi);
  req.send();
}



