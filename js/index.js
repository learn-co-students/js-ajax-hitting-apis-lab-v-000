// your code here
function getRepositories() {
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest;
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`)
  req.send();
}

function displayRepositories() {
  const reposResponse = JSON.parse(this.responseText);
  console.log(reposResponse);
  const repos = `<ul>${ reposResponse
    .map(
      repo =>
       '<li>' + repo.name + ' - <a href="' + repo.html_url + '">' + repo.html_url + '</a> + ' + '- <a href="#" data-owner="' + repo.owner.login + '" data-name="' + repo.name + '" onclick="getCommits(this)">Get Commits</a>' + '- <a href="#" data-owner="' + repo.owner.login + '" data-name="' + repo.name + '" onclick="getBranches(this)">Get Branches</a></li>'
    ).join(' ')}</ul>`;
  document.getElementById('repositories').innerHTML = repos;
}

function getCommits(repo) {;
  const owner = repo.dataset.username;
  const name = repo.dataset.repository;
  const req = new XMLHttpRequest;
  req.addEventListener('load', displayCommits);
  console.log('https://api.github.com/repos/' + owner + '/'+ name + '/commits');

  req.open('GET', 'https://api.github.com/repos/' + owner + '/'+ name + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsHTML = `<ul>${ commits
    .map( formatCommitDetails
  ).join(' ')}</ul>`;
  document.getElementById('details').innerHTML = commitsHTML;
}

function formatCommitDetails(commit) {
  let commitDetails = '<li>' + commit.commit.author.name + ' @ '
    if (!!commit.author) {
      commitDetails += commit.author.login
    }
    commitDetails += ' - ' + commit.commit.message + '</li>'
    return commitDetails
}

function getBranches(repo) {
  const owner = repo.dataset.username;
  const name = repo.dataset.repository;
  const req = new XMLHttpRequest;
  req.addEventListener('load', displayBranches)
  req.open('GET', 'https://api.github.com/repos/' + owner + '/'+ name + '/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesHTML = `<ul>${branches
  .map(
    branch => '<li>' + branch.name + '</li>'
  ).join(' ')}</ul>`;
  document.getElementById('details').innerHTML = branchesHTML;
}
