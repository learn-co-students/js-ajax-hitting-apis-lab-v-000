function getRepositories(){
	let username = document.getElementById('username').value
	const req = new XMLHttpRequest()
	req.addEventListener('load', displayRepositories)
	req.open("GET", `https://api.github.com/users/${username}/repos`)
	req.send()
}

function getCommits(elem){
	const repository = elem.dataset.repository
	const username = elem.dataset.username
	const req = new XMLHttpRequest()
	req.addEventListener('load', displayCommits)
	req.open("GET", `https://api.github.com/repos/${username}/${repository}/commits`)
	req.send()
}

function getBranches(elem){
	const repository = elem.dataset.repository
	const username = elem.dataset.username
	const req = new XMLHttpRequest()
	req.addEventListener('load', displayBranches)
	req.open("GET", `https://api.github.com/repos/${username}/${repository}/branches`)
	req.send()
}

function displayRepositories(){
	let repos = JSON.parse(this.responseText)
	console.log(repos)
	const repoList = `<ul>${repos.map(r => '<li><a href="'+r.html_url+'">'
		+ r.name + '</a><br/> - <a href="#" data-repository="'
		+ r.name + '" data-username="'+ r.owner.login +'" onclick="getCommits(this)">Get Commits</a><br/> - <a href="#" data-repository="'
		+ r.name + '" data-username="'+ r.owner.login +'" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
	document.getElementById('repositories').innerHTML = repoList
}

function displayCommits(){
	let commits = JSON.parse(this.responseText)
	const commitList = `<ul>${commits.map(c => '<li><p>Author Github Name: '
		+ c.author.login +'</p><p>Author Full Name: '+ c.commit.author.name +'</p><p>Message: '
		+ c.commit.message +'</p></li>').join('')}</ul>`
	document.getElementById('details').innerHTML = commitList
}

function displayBranches(){
	let branches = JSON.parse(this.responseText)
	const branchList = `<ul>${branches.map(b => '<li>'+ b.name +'</li>').join('')}</ul>`
	document.getElementById('details').innerHTML = branchList
}
