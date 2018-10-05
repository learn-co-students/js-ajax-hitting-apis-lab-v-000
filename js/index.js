// your code here
function getRepositories(){
	let username = document.getElementById("username").value;
	let url = `https://api.github.com/users/${username}/repos`;
	const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
	req.open('GET', url);
	req.send();
}


function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        `<a href='${r.html_url}'>${r.name}</a>` +
        ' - <a href="#" data-repository="' + r.name +'" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a>' +
        ' - <a href="#" data-repository="' + r.name +'" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a>' +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const repoName = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${repoName}/commits`);
  req.send();

}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' +
        commit.commit.author.name + '-' + commit.commit.message +
        '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const repoName = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${repoName}/branches`);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = branchList;
}
