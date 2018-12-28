function getRepositories() {
	let username = document.getElementById('username').value;
	const req = new XMLHttpRequest();
	req.addEventListener('load', displayRepositories);
	req.open('GET', 'https://api.github.com/users/'+ username + '/repos');
	req.send();
}

function displayRepositories() {
	const repos = JSON.parse(this.responseText);
	console.log(repos);
	let username = document.getElementById('username').value;
	const repoList = `<ul>${repos.map(
		r => '<li>' + r.name + 
		'<br><a href="#" data-username="'+ r.owner.login +'"data-repository="' + r.name +'"onclick="getCommits(this)">GetCommits</a>' +
		'<br>https://github.com/'+ r.owner.login + '/' + r.name +
		'<br><a href="#" data-username="'+ r.owner.login +'"data-repository="' + r.name +'"onclick="getBranches(this)">GetBranches</a></li>'
		).join('')}</ul>`;
	document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
	const req = new XMLHttpRequest();
	const owner = el.dataset.username;
	const repo = el.dataset.repository;
	req.addEventListener('load', displayCommits);
	req.open('GET', 'https://api.github.com/repos/'+ owner + '/' + repo + '/commits');
	req.send();
}

function displayCommits() {
	const commits = JSON.parse(this.responseText);
	const commitsList = `<ul>${commits.map(
		commit => '<li><strong>' +  commit.author.login + '</strong> -' + commit.commit.author.name +'  ' + commit.commit.message + '</li>'
		).join('')}</ul>`;
	document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
	const req = new XMLHttpRequest();
	const owner = el.dataset.username;
	const repo = el.dataset.repository;
	req.addEventListener('load', displayBranches);
	req.open('GET', 'https://api.github.com/repos/' + owner + '/' + repo + '/branches');
	req.send();
}

function displayBranches() {
	const branches = JSON.parse(this.responseText);
	const branchesList = `<ul>${branches.map(
		branch => '<li>'+ branch.name + '</li>').join('')}</ul>`;
	document.getElementById('details').innerHTML = branchesList;
}