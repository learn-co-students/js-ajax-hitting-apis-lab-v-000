function getRepositories() {
	let input = document.querySelector('input');
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + input.value + '/repos');
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(
    	repo => `
    		<li>
    		<h2>${repo.name}</h2>
    		<a href="${repo.html_url}">${repo.html_url}</a>
    		<br>
    		<a href="#" onclick="getCommits(this)" data-repo="${repo.name}" data-username="${repo.owner.login}">Get Commits</a>
    		</li>`
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', getCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.author.name +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
	const name = el.dataset.repository;
	const username = el.dataset.username;
	debugger
	const req = new XMLHttpRequest();
	req.addEventListener('load', getBranches);
	req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/branches');
	req.send();
}

function displayBranches() {
	const branches = JSON.parse(this.responseText);
	const branchesList = `<ul>${branches
    .map(
      branch =>
        '<li><strong>' +
        branch.name
      )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}