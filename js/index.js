// your code here
let user;

function getRepositories(){
	user = document.getElementById('username').value
	const req = new XMLHttpRequest();
	req.addEventListener('load', displayRepositories);
	req.open('GET', `https://api.github.com/users/${user}/repos`);
	req.send();
}

function displayRepositories(){
	let repos = JSON.parse(this.responseText);
	console.log(repos);
	const repoList = `<ul>${repos
		.map(
			repo => '<li>' + repo.name + ' - <a href="#" data-repo="' +
				repo.name +
				'" onclick="getCommits(this)">Get Commits</a>' + ' - ' +
				'<a href="#" data-repo="' +
					repo.name +
				'"onclick="getBranches(this)">Get Branches</a>' + '</li>'
		)
		.join('')}</ul>`;

  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(repoJsonRep) {
  const name = repoJsonRep.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + user + '/' + name + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
	console.log(commits)
  const commitsList = `<ul>${commits
	.map(
	  commit =>
		'<li><strong>' +
		commit.commit.author.name +
		'<li><strong> - ' +
		commit.author.login +
		'</strong> - ' +
		commit.commit.message +
		'</li>'
	)
	.join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(repoJsonRep) {
	// GET /repos/:owner/:repo/branches
  const name = repoJsonRep.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + user + '/' + name + '/branches');
  req.send();
}

function displayBranches() {
	const branches = JSON.parse(this.responseText);
	console.log(branches)
	const branchesList = `<ul>${branches
	.map(
	  branch =>
		'<li>' +
		branch.name +
		'</li>'
	).join('')}</ul>`;
	document.getElementById('details').innerHTML = branchesList;
}















/* Instructions

    Create a form with a username field that calls a getRepositories function that loads the repositories div with a list of public repositories for that user. The displayed repositories should include the name and a link to the URL (HTML URL, not API URL).
    Add a link to each repository that calls a getCommits function on click and, when the request is complete, calls a displayCommits function that fills the details div with a list of commits for that repository. The display of commits should include the author's Github name, the author's full name, and the commit message. Give the link data attributes of username and repository to be used by the getCommits function.
    Add a link to each repository that calls a getBranches function when clicked and, when complete, calls a displayBranches function that fills the details div with a list of names of each branch of the repository. Give the link data attributes of username and repository for use by the getBranches function.
*/
