function getRepositories() {
	const username = document.getElementById("username").value
	const req = new XMLHttpRequest()
	console.log(`https://api.github.com/users/${username}/repos`)
	req.addEventListener("load", displayRepositories)
	req.open("GET", `https://api.github.com/users/${username}/repos`)
	req.send()
}

function displayRepositories() {
	const repos = JSON.parse(this.responseText)
	const repoLists = `<ul>${repos.map(r => `<li><a href="${r.html_url}">${r.name}</a> - <a href="#" data-repo="${r.name}" data-owner="${r.owner.login}" onclick="getCommits(this)">Commits</a> - <a href="#" data-repo="${r.name}" data-owner="${r.owner.login}" onclick="getBranches(this)">Branches</a></li>`).join("")}</ul>`
	document.getElementById("repositories").innerHTML += repoLists
	console.log(repos)
}
  // el = { dataset: { repository: 'Spoon-Knife', username: 'octocat' } }
function getCommits(el) {
	const repo = el.dataset.repository
	const owner = el.dataset.username
	const req = new XMLHttpRequest
	req.addEventListener("load", displayCommits)
	req.open("GET", `https://api.github.com/repos/${owner}/${repo}/commits`)
	req.send()
}

function displayCommits() {
	const repos = JSON.parse(this.responseText)
	const repoLists = `<ul>${repos.map(r => `<li>${r.author.login} - ${r.commit.author.name} - ${r.commit.message}</li>`).join("")}</ul>`
	document.getElementById("details").innerHTML += repoLists
}

function getBranches(el) {
	const owner = el.dataset.username
	const repo = el.dataset.repository
	const req = new XMLHttpRequest()
	req.addEventListener("load", displayBranches)
	req.open("GET", `https://api.github.com/repos/${owner}/${repo}/branches`)
	req.send()
}

function displayBranches() {
	const repos = JSON.parse(this.responseText)
	const repoLists = `<ul>${repos.map(r => `<li>${r.name}</li>`).join("")}`
	document.getElementById("details").innerHTML += repoLists
}