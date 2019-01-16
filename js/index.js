function displayCommits () {
  var commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = commits.map(c => '/' + c.commit.committer.name + '/' + c.author.login + '/' + c.commit.message).join('');
  document.getElementById('details').innerHTML = commitsList;
}


function displayBranches() {
  var branches = JSON.parse(this.responseText);
  console.log(branches);
  const branchesList = branches.map(b => b.name).join('');
  document.getElementById('details').innerHTML = branchesList;
}


function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const reposList = repos.map(r => r.html_url).join('');
  document.getElementById('repositories').innerHTML = reposList;
}



function getRepositories () {
	const req = new XMLHttpRequest();
	const username = document.getElementById("username").value;
	req.addEventListener('load', displayRepositories);
	req.open('GET', 'https://api.github.com/users/' + username + '/repos');
	req.send();
}


function getCommits (el) {
	const name = el.dataset.username;
	const repository = el.dataset.repository;
	const req = new XMLHttpRequest();
	req.addEventListener('load', displayCommits);
	req.open('GET', 'https://api.github.com/repos/' + name + '/' + repository + '/commits');
	req.send();
}


function getBranches (el) {
	const name = el.dataset.username;
	const repository = el.dataset.repository;
	const req = new XMLHttpRequest();
	req.addEventListener('load', displayBranches);
	req.open('GET', 'https://api.github.com/repos/' + name + '/' + repository + '/branches');
	req.send();
}





