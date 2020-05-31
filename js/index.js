function getRepositories() {
  const req = new XMLHttpRequest();
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        ' - <a href="#" data-repository="' +
        r.html_url +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  // const user = document.getElementById("username").value;
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}

function displayCommits(){
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit =>
       '<li><strong>' +
       'Username: ' + commit.author.login + '<br>' + commit.commit.author.name +
      '</strong> - ' +
       commit.commit.message +
       '</li>'
    ).join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
	const req = new XMLHttpRequest();
	const username = document.getElementById("username").value;
	const repository = el.dataset.repository;
	req.addEventListener('load', displayBranches);
  	req.open('GET', 'https://api.github.com/repos/' + username + '/' + repository + '/branches');
  	req.send();
}

function displayBranches() {
	const branches = JSON.parse(this.responseText);
	const branchesList = `<ul>${branches.map(
		branch =>
		'<li>' +
		branch.name +
		'<li>').join('')}</ul>`;
	document.getElementById('details').innerHTML = branchesList;
}
