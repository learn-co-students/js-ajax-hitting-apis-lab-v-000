// your code here

const rootURL = 'https://api.github.com';


function retrieveGithubUsername(){
  return document.getElementById('username').value
}

function getRepositories() {
  const usernameInput = retrieveGithubUsername()
  const request = new XMLHttpRequest();
  request.addEventListener('load', displayRepositories);
  request.open('GET', `https://api.github.com/users/${usernameInput}/repos`);
  request.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList =
    '<ul>' +
    repos
      .map(repo => {
        const dataUsername = 'data-username="' + repo.owner.login + '"';
        const dataRepoName = 'data-repository="' + repo.name + '"';
        return `
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`;
      })
      .join('') +
    '</ul>';
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(element){
  const repoName = element.dataset.repository
  const uri = rootURL + '/repos/' + element.dataset.username + '/' + repoName + '/commits';
  const request = new XMLHttpRequest();
  request.addEventListener('load', displayCommits);
  request.open('GET', uri);
  request.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
      .map(
        commit =>
        '<li><h3>' +
        '/' +
        commit.author.login +
        '/' +
        commit.commit.committer.name +
        '</h3>' +
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
