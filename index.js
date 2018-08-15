function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li><a href="'+ r.html_url +'">' + r.name + '</a> - <a href="' + r.commits_url + '" data-repository="' + r.name + '" data-username="' + r.owner["login"] + '" onclick="getCommits(this)">Get Commits</a> - <a href="' + r.branches_url + '" data-repository="' + r.name + '" data-username="' + r.owner["login"] + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
};

function displayCommits(event, data) {
	let commits = JSON.parse(this.responseText)
	const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + ' - ' + commit.commit.message + '</li>').join('')}</ul>`
	document.getElementById("details").innerHTML = commitsList
};

function displayBranches(event, data) {
	let branches = JSON.parse(this.responseText)
	const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
	document.getElementById("details").innerHTML = branchesList
};

function getRepositories() {
	let username = document.getElementById("username").value
	const req = new XMLHttpRequest()
  	req.addEventListener("load", displayRepositories);
  	req.open("GET", 'https://api.github.com/users/' + username +'/repos')
  	req.send()
};

function getCommits(el) {
  const repoName = el.dataset.repository
  const userName = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + userName + '/' + repoName + '/commits')
  req.send()
};

function getBranches(el) {
  const repoName = el.dataset.repository
  const userName = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + userName + '/' + repoName + '/branches')
};

















