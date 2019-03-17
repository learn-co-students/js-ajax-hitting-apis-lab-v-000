// your code here

let user = ""
function retrieveUsername(){
  	user = document.getElementById("username").value
  	
  }
  

function getRepositories(){
	let button = document.querySelector('input[type="submit"]')
  	button.addEventListener('click',retrieveUsername())
  	console.log(user)
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + user + '/repos');
  req.send();
}

function displayRepositories(){
	var repos = JSON.parse(this.responseText);
  console.log(repos)
  const repoList = `<ul>${repos
     .map(
      r =>
        '<li>' +
        r.name +
        ' - <a href="#" data-username="' +
        r.owner.login + '" data-real="' + r.name +
        '" data-repository="' + r.html_url + '" onclick="getCommits(this)">Get Commits</a>'+
        '- <a href="#" data-username="' +
        r.owner.login + '" data-real="' + r.name + 
        '" data-repository="' + r.html_url + '" onclick="getBranches(this)">Get Branches</a></li>'
    	)
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const repo = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repo + '/commits');
  req.send();
}

function getBranches(el) {
  const repo = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repo + '/branches');
  req.send();
}


function displayCommits() {
  let commits = JSON.parse(this.responseText);
  console.log(commits)
  const commitsList = `<ul>${commits
    .map( commit => 
      
        '<li><strong>' +
        commit.commit.author.name +
        '</strong> - ' + ' ' + commit.author.login + ' ' +
        commit.commit.message + 
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}


function displayBranches() {
  let branches = JSON.parse(this.responseText);
  console.log(branches)
  const branchesList = `<ul>${branches
    .map( branch => 
      
        '<li><strong>' +
        branch.name +
        '</strong></li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}

