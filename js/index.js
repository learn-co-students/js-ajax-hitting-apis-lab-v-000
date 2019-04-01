// your code here
function getRepositories() {
  // get username
  let user = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  // addEventListener
  req.addEventListener('load', displayRepositories);
  // api url/users/user/repos
  req.open('GET', 'https://api.github.com/users/' + user + '/repos');
  req.send();
}

//function showRepositories() {
//  var repos = JSON.parse(this.responseText);
//  console.log(repos);
//  const repoList = `<ul>${repos
//    .map(
//      r =>
//        '<li>' +
//        r.name +
//        ' - <a href="#" data-repo="' +
//        r.name +
//        '" onclick="getCommits(this)">Get Commits</a></li>'
//    )
//    .join('')}</ul>`;
//  document.getElementById('repositories').innerHTML = repoList;
//}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList =
    '<ul>' + repos.map(repo => {
        const userName = 'data-username="' + repo.owner.login + '"';
        const repoName = 'data-repository="' + repo.name + '"';
        return `
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${repoName} ${userName} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${repoName} ${userName} onclick="getBranches(this)">Get Branches</a></li>
          </li>`;}).join('') + '</ul>';
    
  document.getElementById('repositories').innerHTML = repoList;
}

///////////////////////////////////////////////////////////////////////////////

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const showCommits = `<ul>${commits.map(commit =>'<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`;
  
  document.getElementById('details').innerHTML = showCommits;
}

function getCommits(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  // expected: https://api.github.com/repos/octocat/Spoon-Knife/commits
  req.open('GET', 'https://api.github.com/repos/' + el.dataset.username + '/' + name + '/commits');
  req.send();
}

//////////////////////////////////////////////////////////////////////////////

function getBranches(el) {
  const name = el.dataset.repository;
  // const uri = rootURL + '/repos/' + el.dataset.username + '/' + name + '/branches';
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  // expected: https://api.github.com/repos/octocat/Spoon-Knife/branches
  req.open('GET', 'https://api.github.com/repos/' + el.dataset.username + '/' + name + '/branches');
  req.send();
}
function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const showBranches = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = showBranches;
}