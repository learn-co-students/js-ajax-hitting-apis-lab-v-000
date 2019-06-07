const rootURL = 'https://api.github.com';

function retrieveGithubUsername(){
return document.getElementById('username').value
}

function getRepositories() {
  const username = retrieveGithubUsername()
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories() {

   var repos = JSON.parse(this.responseText);

   const repoList = `<ul>${repos.map(repo => {
       return `
       <li>
       <h2>${repo.name}</h2>
       <a href="${repo.html_url}">${repo.html_url}</a><br>
       <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="getCommits(this)">Get Commits</a><br>
       <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="getBranches(this)">Get Branches</a>
       </li>`
     }).join('')}</ul>`;

     document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', rootURL + '/repos/' + el.dataset.username + '/' + el.dataset.repository + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.committer.name +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(element){
  const repoName = element.dataset.repository
  const uri = rootURL + '/repos/' + element.dataset.username + '/' + repoName + '/branches'
  const request = new XMLHttpRequest();
  request.addEventListener('load', displayBranches);
  request.open('GET', uri);
  request.send();
}

 function displayBranches(){
  branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches
      .map(
        branch =>
        '<li><h3>' +
        branch.name +
        '</h3></li>'
      )
      .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
} 