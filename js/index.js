// your code here
let begURL = 'https://api.github.com/users/'

function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById("username").value;
  let url = begURL + username + '/repos';
  console.log(url);
  req.addEventListener('load', displayRepositories);
  req.open('GET', url);
  req.send();
}

function displayRepositories() { 
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = 
    `<ul>
      ${repos
          .map(
              r =>
                '<li>' +
                  r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>' + 
                  r.html_url
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
  
}

function getCommits(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();   
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login
         +
        '</strong> - ' +
        commit.commit.author.name
         +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const repoName = el.dataset.repository;
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayBranches);
  xhr.open('GET', 'https://api.github.com/repos/octocat/' + repoName + '/branches');
  xhr.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(branch => '<li>' + branch.name + '</li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}



/*function showRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}
*/



/*Create a form with a username field that calls a getRepositories function that loads the repositories div with a list of public repositories for that user. The displayed repositories should include the name and a link to the URL (HTML URL, not API URL).*/
/*
Add a link to each repository that calls a getCommits function on click and, when the request is complete, calls a displayCommits function that fills the details div with a list of commits for that repository. The display of commits should include the author's Github name, the author's full name, and the commit message. Give the link data attributes of username and repository to be used by the getCommits function.
*/