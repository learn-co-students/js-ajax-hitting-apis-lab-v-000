// your code here
function displayRepositories() {
	const repos = JSON.parse(this.responseText);
	const repoList = `<ul>${repos.map(r => '<li>' + 
						'<a href="' + r.html_url + '">' + 
						r.name + '</a>' + 
						' - <a href="#" data-repository="' + 
						r.name + 
						'" data-username="' + 
						r.owner.login + '" onclick="getCommits(this)">Get Commits</a>' + 
						' - <a href="#" data-repository="' +
						r.name +
						'" data-username="' +
						r.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`;
	document.querySelector('#repositories').innerHTML = repoList;
}

function displayBranches() {
	const branches = JSON.parse(this.responseText);
	const branchList = `<ul>${branches
		.map(branch =>
			'<li>' +
			branch.name +
			'</li>'
		).join('')}</ul>`;
	document.getElementById('details').innerHTML = branchList;
}

function displayCommits() {
	const commits = JSON.parse(this.responseText);
	const commitsList = `<ul>${commits
		.map(commit =>
			'<li>' +
			commit.author.login +
			' - ' + 
			commit.commit.author.name +
			' - ' +
			commit.commit.message +
			'</li>'
		).join('')}</ul>`;
	document.getElementById('details').innerHTML = commitsList;
}

function getRepositories() {
	const username = document.querySelector('#username').value;
	console.log(username);
	const req = new XMLHttpRequest();
	req.addEventListener('load', displayRepositories)
	req.open('GET', `https://api.github.com/users/${username}/repos`);
	req.send();
}

function getBranches(commitReq) {
	const repo = commitReq.dataset.repository;
	const username = commitReq.dataset.username;
	const req = new XMLHttpRequest();
	req.addEventListener('load', displayBranches);
	let path = `https://api.github.com/repos/${username}/${repo}/branches`
	req.open('GET', path)
	req.send();

}

function getCommits(commitReq) {
	const repo = commitReq.dataset.repository;
	const username = commitReq.dataset.username;
	const req = new XMLHttpRequest();
	req.addEventListener('load', displayCommits);
	let path = `https://api.github.com/repos/${username}/${repo}/commits`
	req.open('GET', path)
	req.send();
}