function getRepositories() {
	username = document.getElementById('username').value;
	console.log(username);
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos` );
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li> <a href="' + r.html_url + '">'+ r.name  + '</a>' + 
        ' - <a href="#" data-repository="' +
        r.name + '" data-username="' + r.owner.login  + '"' +
        ' onclick="getCommits(this)">Get Commits</a>' + 
        ' - <a href="#" data-repository="' +
        r.name + '" data-username="' + r.owner.login  + '"' +
        ' onclick="getBranches(this)">Get Branches</a></li>'

    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
	username = el.dataset.username;
	repository = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${repository}/commits`);
  req.send();
}

function displayCommits() {
  var commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitList = `<ul>${commits
    .map(
      c =>
        '<li>' + (c.author === null ? '' : c.author.login) + 
					' - ' + (c.commit === null ? '' : c.commit.committer.name + ' - ' + c.commit.message) +  
				'</li>' 
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitList;
}

function getBranches(el) {
	username = el.dataset.username;
	repository = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${repository}/branches`);
  req.send();
}

function displayBranches() {
  var branches = JSON.parse(this.responseText);
  console.log(branches);
  const branchList = `<ul>${branches
    .map(
      b =>
        '<li>' + (b === null ? '' : b.name) + '</li>' 
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchList;
}

