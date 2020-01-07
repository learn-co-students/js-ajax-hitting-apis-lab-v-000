// your code here
const rootURL = 'https://api.github.com';

function displayCommits(){
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getRepositories(){
  const req = new XMLHttpRequest();
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

function getCommits(el){
  const repoName = el.dataset.repository;
  const uri = rootURL + '/repos/' + el.dataset.username + '/' + repoName + '/commits';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayCommits);
  xhr.open('GET', uri);
  xhr.send();
}

function displayRepositories(){
  const repos = JSON.parse(this.responseText);
  const repoList = '<ul>' + repos.map(r => {
    const usernameData = 'data-username="' + r.owner.login + '""';
    const repoNameData = 'data-repository="' + r.name + '""';
    return `<li>
    <h2>${r.name}</h2>
    <a href="${r.html_url}">${r.html_url}</a><br>
    <a href="#" ${repoNameData} ${usernameData} onclick="getCommits(this)">Get Commits</a><br>
    <a href="#" ${repoNameData} ${usernameData} onclick="getBranches(this)">Get Branches</a><br>
    </li>`;
  }).join('') + '</ul>';
  document.getElementById('repositories').innerHTML = repoList;
}

function displayBranches(){
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;

}

function getBranches(el){
  const req = new XMLHttpRequest();
  const repoName = el.dataset.repository;
  const uri = rootURL + '/repos/' + el.dataset.username + '/' + repoName + '/branches';
  req.addEventListener('load', displayBranches);
  req.open('GET', uri);
  req.send();
}
