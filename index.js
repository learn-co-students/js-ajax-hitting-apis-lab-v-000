function displayBranches() {
	const branches = JSON.parse(this.responseText);
	let branchList = "<ul>" + branches.map(branch => `<li>${branch["name"]}</li>`).join('') + "</ul>";
	document.querySelector("#details").innerHTML = branchList;
}

function getBranches(el) {
	const username = el.dataset.username,
				repo = el.dataset.repository;
	const req = new XMLHttpRequest();
	req.addEventListener("load", displayBranches);
	req.open("GET", "https://api.github.com/repos/" + username + "/" + repo + "/branches");
	req.send();
}

function displayCommits() {
	const commits = JSON.parse(this.responseText);
	let repo = commits[0].url.split('https://api.github.com/repos/')[1].split('/')[1];
	let commitList =  "<ul>" + commits.map(commit => `<li>${commit["commit"]["author"]["name"]} 
														 @${commit["author"]["login"]} 
														 <i>${commit["commit"]["message"]}</i>
														 <a href="" data-repository='${repo}' data-username='${commit["author"]["login"]}' onclick="getBranches(this)">Get Branches</a>
														 </li>`).join('') + "</ul>";
	document.querySelector("#details").innerHTML = commitList;
}

function getCommits(el) {
	const username = el.dataset.username,
				repo = el.dataset.repository;
	const req = new XMLHttpRequest();
	req.addEventListener("load", displayCommits);
	req.open("GET", "https://api.github.com/repos/" + username + "/" + repo + "/commits");
	req.send();
}

function displayRepositories(data, event) {
	const repos = JSON.parse(this.responseText);
	let repoList = "<ul>"+ repos.map(function(repo){
		return `<li><a href=${repo["html_url"]}>${repo["name"]}</a>=>  <a href="#" data-username='${repo["owner"]["login"]}' data-repository='${repo["name"]}' onclick="getCommits(this)"> Get Commits</a></li>` 
	}).join('') + "</ul>";
	document.querySelector('#repositories').innerHTML = repoList;
}

function getRepositories() {
	const username = document.querySelector('#username').value;
	const req = new XMLHttpRequest();
	req.addEventListener("load", displayRepositories);
	req.open('GET', "https://api.github.com/users/" + username + "/repos");
	req.send();
}