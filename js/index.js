// your code here
function getRepositories() {
  const name = document.getElementById('username').value
  const uri = 'https://api.github.com/users/' + name + '/repos'
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', uri);
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = '<ul>' + repos.map(r => {
      const dataUsername = 'data-username="' + r.owner.login + '"';
      const dataRepoName = 'data-repository="' + r.name + '"';
      return `<li> ${r.name} <a href="${r.html_url}">${r.html_url}</a><br>
      <a href="#" ${dataRepoName} ${dataUsername} onclick=getCommits(this)>Get Commits</a>
      <a href="#" ${dataRepoName} ${dataUsername} onclick=getBranches(this)>Get Branches</a>
      </li>`
    })
    .join('') + '</ul>';
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const repoName = el.dataset.repository;
  const uri = 'https://api.github.com/repos/' + el.dataset.username + '/' + repoName + '/commits'
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', uri);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitList = '<ul>' +
      commits.map(commit => {
        return `<li> ${commit.commit.author.name} - ${commit.author.login} - ${commit.commit.message} </li>`
    })
    .join('') + '</ul>';
  document.getElementById('details').innerHTML = commitList;
}


function getBranches(el) {
  const repo = el.dataset.repository;
  const uri = 'https://api.github.com/repos/' + el.dataset.username + '/' + repo + '/branches'
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', uri);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = '<ul>' +
    branches.map(branch => {
      return `<li> ${branch.name} </li>`
    })
    .join('') + '</ul>';
    document.getElementById("details").innerHTML = branchesList;
}
