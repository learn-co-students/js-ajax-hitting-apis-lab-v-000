

function getRepositories() {
	const user = document.getElementById("username").value // gets tue username from the form 
	const req  = new XMLHttpRequest() // creates a new instance of XMLHttpRequest
	req.addEventListener('load', displayRepositories);
	req.open ('GET', 'https://api.github.com/users/' + user + '/repos' ); 
	req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText); // tells JavaScript that it's working with JSON. 
  const repoList = `<ul>${repos
    .map(r => '<li>' + `<a href="${r.html_url}">${r.name}</a>`
 + ` <a href="#" data-repository="${r.name}" data-user_name="${r.owner.login}" onclick="getCommits(this)">Get Commits</a>` + 
` <a href="#" data-repository="${r.name}" data-user_name="${r.owner.login}" onclick="getBranches(this)">Get Branches</a>` +
 '</li>')
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el){
	let uri = `https://api.github.com/repos/${el.dataset.username}/${el.dataset.repository}/commits`
	let req  = new XMLHttpRequest()
	req.addEventListener('load', displayCommits);
	req.open ('GET', uri); 
	req.send();
}

function displayCommits() {
	let commits = JSON.parse(this.responseText)
	debugger;
    const commitsList =  `<ul>${commits
    	.map(c => '<li>' + `${c.commit.author.name}` +  `${c.commit.author.login}` + `${c.commit.message}` + '</li>').join('')}</ul>`;
    	
  	document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
	let uri = `https://api.github.com/repos/${el.dataset.user_name}/${el.dataset.repository}/branches`
	let req  = new XMLHttpRequest()
	req.addEventListener('load', displayBranches);
	req.open ('GET', uri); 
	req.send();
}

function displayBranches() {
	let branches = JSON.parse(this.responseText)
	const branchList = `<ul>${branches.map( b => '<li>' + `${b.name}` + '</li>').join(' ')}</ul>`
	document.getElementById('details').innerHTML = branchList;
}


// GET /repos/:owner/:repo/commits
// GET /repos/:owner/:repo/branches/:branch




// get Repositories() gets all the users repos and calls 
// displayRepositories() that displays them in an UL as links

