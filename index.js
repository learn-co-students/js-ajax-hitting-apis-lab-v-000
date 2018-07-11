function showRepositories(event, data) {
	let repos = JSON.parse(this.responseText)
	console.log(repos);
	const repoList = `<ul>${repos.map(r => '<li>' + r.name + '</li>').join('')}</ul>`
	document.getElementById("repositories").innerHTML = repoList;

}

function getRepositories() {
	let username = document.getElementById("username").value
	
	const req = new XMLHttpRequest();
	req.addEventListener("load", showRepositories)
	req.open("GET", `https://api.github.com/users/${username}/repos`)
	req.send();
}

function getCommits(el)