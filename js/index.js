
function getRepositories() {
	const req = new XMLHttpRequest();
	const user = document.getElementById('username').value;
		
	req.addEventListener('load', displayRepositories);
	req.open('GET', `https://api.github.com/users/${user}/repos`);
	req.send();
	return false;
}

function displayRepositories() {
	const repos = JSON.parse(this.responseText);
	console.log(repos);
	const repoList = `${repos.map(r => r.html_url)}`;
	document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
	const req = new XMLHttpRequest();
	const repo = el.dataset.repository;
	const user = el.dataset.username;
	
	req.addEventListener('load', displayCommits);
	req.open('GET', `https://api.github.com/repos/${user}/${repo}/commits`);
	req.send();
}

function displayCommits() {
	const commits = JSON.parse(this.responseText);
	const commitsList = `${commits.map(commit => 
			`${commit.commit.author.name}/
			${commit.author.login}/
			${commit.commit.message}`)}`;
	document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
	const req = new XMLHttpRequest();
	const repo = el.dataset.repository;
	const user = el.dataset.username;
	
	req.addEventListener('load', displayBranches);
	req.open('GET', `https://api.github.com/repos/${user}/${repo}/branches`);
	req.send();
}

function displayBranches() {
	const branches = JSON.parse(this.responseText);
	const branchesList = `${branches.map(branch => branch.name)}`;
		document.getElementById('details').innerHTML = branchesList;
}







