function getRepositories() {
	var username = document.getElementById("username").value;
	const req = new XMLHttpRequest();
	req.addEventListener("load", displayRepositories);
	req.open("GET", `https://api.github.com/users/${username}/repos`);
	req.send()
}

function displayRepositories(event, data) {
	var repos = JSON.parse(this.responseText)
	console.log(repos)
	const repoList = `<ul>${repos.map(r => `<li><a href="${r.html_url}">${r.name}</a> - <a href="#" data-repository="${r.name}" 
		data-username="${r.owner.login}" onclick="getCommits(this)">Get Commits</a> - 
		<a href="#" data-repository="${r.name}" data-username="${r.owner.login}" 
		onclick="getBranches(this)">Get Branches</a></li>`)}</ul>`;
  	document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(repo) {
	const name = repo.dataset.repository;
	const username = repo.dataset.username;
	const req = new XMLHttpRequest();
	req.addEventListener("load", displayCommits);
	req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`);
	req.send();
}

function displayCommits() {
	const commits = JSON.parse(this.responseText);
	const commitsList = `<ul>${commits.map(c => `<li>${c.commit.author.name}(${c.author.login}): 
		${c.commit.message}</li>`)}</ul>`;
	document.getElementById("details").innerHTML = commitsList;
}

function getBranches(repo) {
	const name = repo.dataset.repository;
	const username = repo.dataset.username;
	const req = new XMLHttpRequest();
	req.addEventListener("load", displayBranches);
	req.open("GET", `https://api.github.com/repos/${username}/${name}/branches`);
	req.send();
}

function displayBranches() {
	const branches = JSON.parse(this.responseText);
	const branchesList = `<ul>${branches.map(b => `<li>${b.name}</li>`)}</ul>`;
	document.getElementById("details").innerHTML = branchesList;
}