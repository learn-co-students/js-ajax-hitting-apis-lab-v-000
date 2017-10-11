function getRepositories () {
	const req = new XMLHttpRequest();
	req.addEventListener("load", displayRepositories);
	req.open("GET", `https://api.github.com/users/${document.querySelector('input#username').value}/repos`);
  req.send();
}

function displayRepositories(event) {
  let repos = JSON.parse(this.responseText);

	const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.full_name + '" onclick="getCommits(this)">Get Commits</a>'+ ' - <a href="#" data-repo="' + r.full_name + '" onclick="getBranches(this)">Get Branches</a>' + ' - <a href="'+ r.html_url +'">View on GitHub</a>'+ '</li>').join('')}</ul>`;
	document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(element) {
	const repoName = element.dataset.repo;
	const req = new XMLHttpRequest();
	req.addEventListener("load", displayCommits);
	req.open("GET", `https://api.github.com/repos/${repoName}/commits`);
  req.send();
}

function displayCommits () {
  let commits = JSON.parse(this.responseText);
  // console.log(commits[0].commit.author.name);
	const commitList = `<ul>${commits.map(c => '<li>' + c.commit.author.name+ ' - '+ c.author.login + ' - ' + c.commit.message +'</li>').join('')}</ul>`;
	document.getElementById("details").innerHTML = commitList;
}

function getBranches (element) {
	const repoName = element.dataset.repo;
	const req = new XMLHttpRequest();
	req.addEventListener("load", displayBranches);
	req.open("GET", `https://api.github.com/repos/${repoName}/branches`);
  req.send();
}

function displayBranches () {
  let branches = JSON.parse(this.responseText);
  console.log(branches[0]);
	const branchList = `<ul>${branches.map(c => '<li>' + c.name + '</li>').join('')}</ul>`;
	document.getElementById("details").innerHTML = branchList;
}



