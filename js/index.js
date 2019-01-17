function getRepositories(){
	const req = new XMLHttpRequest();
	const nameValue = document.getElementById("username").value;
	req.addEventListener('load', displayRepositories);
	req.open('GET', `https://api.github.com/users/${nameValue}/repos`);
	req.send();
}

function displayRepositories(){
	var repos = JSON.parse(this.responseText);
	console.log(repos);
	const repoList = repos.map( r =>
        `<li><a href="${r.html_url}" target="_blank">${r.name}</a></li>
        	<ul>
        	<li><a href="#" data-username="${r.owner.login}" data-repository="${r.name}" onclick="getCommits(this)">Get Commits</a></li>
	    	<li><a href="#" data-username="${r.owner.login}" data-repository="${r.name}" onclick="getBranches(this)">Get Branches</a></li>
	    	</ul>`
	    ).join('');
	const returnHtml = '<ul>' + repoList + '</ul>'
	document.getElementById('repositories').innerHTML = returnHtml;
}


function getCommits(el){
  const repoName = el.dataset.repository;
  const user = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${user}/${repoName}/commits`);
  req.send();
}


function displayCommits(){
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' + commit.author.login + '</strong>' +
	        '<ul><li>' + commit.commit.author.name + '</li>' +
	        '<li>' + commit.commit.message + '</li></ul>'
    ).join('')}</ul>`;
  document.getElementById('details').innerHTML += commitsList;
}

function getBranches(el){
  const repoName = el.dataset.repository;
  const user = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${user}/${repoName}/branches`);
  req.send();
}

function displayBranches(){
	const branches = JSON.parse(this.responseText);
	const branchesList = `<ul>${branches.map(branch =>
		'<li>' + branch.name + '</li>')
		.join('')}</ul>`;
	document.getElementById('details').innerHTML += branchesList
}

