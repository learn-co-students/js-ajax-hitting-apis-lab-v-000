// your code here
function getRepositories(){
  const req = new XMLHttpRequest();
  const username = document.getElementById('username').value;
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories(){
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList =
    '<ul>' +
      repos.map(r => {
        const dataUsername = 'data-username="' + r.owner.login + '"';
        const dataRepo = 'data-repository="' + r.name + '"';
        return `
          <li>
            ${r.name}
            <a href="${r.html_url}">${r.html_url}</a></br>
            <a href="#" ${dataUsername} ${dataRepo} onclick="getCommits(this)">Get Commits</a></br>
            <a href="#" ${dataUsername} ${dataRepo} onclick="getBranches(this)>Get Branches</a></br>
          </li`
      })
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el){
  const repoName = el.dataset.repository;
  const repoUsername = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/'+ repoUsername + '/' + repoName + '/commits')
  req.send();
}

function displayCommits(){
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(
    commit =>
      '<li>' +
      commit.commit.author.name +
      commit.author.login +
      commit.commit.message +
      '</li>'
  ).join('')}</ul>`;

  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el){
  const repoName = el.dataset.repository;
  const repoUsername = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/'+ repoUsername + '/' + repoName + '/branches')
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(branch => '<li>' + branch.name + '</li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}