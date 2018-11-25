// your code here


function getRepositories() {
  let username = document.getElementById('username').value

  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + username + '/repos');
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);

  // to display in the console to look through it
  console.log(repos);

  // const repoList = `<ul>'${repos.map(r => '<li>' + r.name + '- <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`;

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
              <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a>
              <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
            </li>`;
        })
        .join('') +
      '</ul>';

  const repositories = document.getElementById('repositories');
  repositories.innerHTML = repoList;
}

function getCommits(ele) {
  // username and name of the repo from the a href data-variable
  let username = ele.dataset.username;
  const repoName = ele.dataset.repository;

  // making another GET request but this time instead of username, we're requesting by repo name.
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);

  // GET /repos/:owner/:repo/commits
  req.open('GET', 'https://api.github.com/repos/' + username +'/' + repoName + '/commits');

  // req.open('GET', 'https://api.github.com/users/octocat/' + name + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);

// display of commits should include the author's Github name, the author's full name, and the commit message. Give the link data attributes of username and repository to be used by the getCommits function

  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.committer.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`;
  console.log(commitsList)

  const details = document.getElementById('details');
  details.innerHTML = commitsList;

}


function getBranches(ele) {
  // username and name of the repo from the a href data-variable
  let username = ele.dataset.username;
  const repoName = ele.dataset.repository;

  // making another GET request but this time instead of username, we're requesting by repo name.
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);

  // GET /repos/:owner/:repo/branches
  req.open('GET', 'https://api.github.com/repos/' + username +'/' + repoName + '/branches');

  // req.open('GET', 'https://api.github.com/users/octocat/' + name + '/commits');
  req.send();
}

function displayBranches(ele) {
  const branches = JSON.parse(this.responseText);
// list of names of each branch of the repository

  const branchLists = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;

  const details = document.getElementById('details');
  details.innerHTML = branchLists;


}
