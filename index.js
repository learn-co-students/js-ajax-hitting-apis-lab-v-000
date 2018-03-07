function getRepositories() {
	const xhr = new XMLHttpRequest();
	xhr.addEventListener('load', displayRepositories);
	const username = getUsername();
	xhr.open("GET", `https://api.github.com/users/${username}/repos`);
	xhr.send();
}

function getCommits(el) {
	const username = el.dataset.username;
	const repo = el.dataset.repository;
	const xhr = new XMLHttpRequest();
	xhr.addEventListener('load', displayCommits);
	xhr.open("GET", `https://api.github.com/repos/${username}/${repo}/commits`)
	xhr.send();
}

function getBranches(el) {
	const username = el.dataset.username;
	const repository = el.dataset.repository;
	const xhr = new XMLHttpRequest();
	xhr.addEventListener('load', displayBranches);
	xhr.open("GET", `https://api.github.com/repos/${username}/${repository}/branches`);
	xhr.send();
}

function getUsername() {
	return document.getElementById("username").value;
}

function displayRepositories(event, data) {
	const repoDiv = document.getElementById('repositories');
	var repos = JSON.parse(this.responseText);
	let repoHTML = '<ul>';
	repoHTML += repos.map(r => `<li><a href="` + r["html_url"] + `">` + r["name"] + '</a> - <a href="#" onclick="getCommits(this);return false;" data-repository="' + r.name + '" data-username="'+ r["owner"]["login"] + '">' + 'Get Commits' + '</a> <a href="#" onclick="getBranches(this);return false;" data-repository="' + r.name + '" data-username="'+ r["owner"]["login"] + '">Get Branches</a></li>').join('');
	repoHTML += '</ul>';

	repoDiv.innerHTML = repoHTML;
}

function displayCommits(event, data) {
	const detailsDiv = document.getElementById("details");
	var commits = JSON.parse(this.responseText);
	let commitHTML = '<ul>';
	commitHTML += commits.map(commit => '<li><h3>Author: ' + commit["commit"]["author"]["name"] + '(' + commit["author"]["login"] + ')</h3><p>'  + commit["commit"]["message"] + '</p></li>').join('');
	commitHTML += '</ul>';

	detailsDiv.innerHTML = commitHTML;
}

function displayBranches(event, data) {
	const detailsDiv = document.getElementById("details");
	var branches = JSON.parse(this.responseText);
	let branchHTML = '<ul>';
	branchHTML += branches.map(branch => '<li>' + branch["name"] + '</li>').join('');
	branchHTML += '</ul>';

	detailsDiv.innerHTML = branchHTML;
}
