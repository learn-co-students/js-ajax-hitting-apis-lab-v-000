// your code here
function getRepositories(){
  let username = document.getElementById("username").value
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('Get', `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories(){
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r=> '<li><a href="' + r.html_url + '">' + r.name + '</a> - <a href="#" data-repository="' + r.name + '"data-username="' + r.owner.login + '"onclick="getCommits(this)"> Get Commits</a> | <a href="#" data-repository="' + r.name +'"data-username="'+ r.owner.login +'" onclick="getBranches(this)"> Get Branches</a> </li>').join(' ')}</ul>`

  document.getElementById('repositories').innerHTML = repoList
}

function getCommits(el){
  let repo = el.dataset.repository;
  let username = el.dataset.username;
  console.log(name)
  const req = new XMLHttpRequest();
  req.addEventListener('load',displayCommits)
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/commits`)
  req.send()
}

function displayCommits(){
  const commits =JSON.parse(this.responseText)
  const commitList = `<ul>${commits.map(
    c=>'<li><strong>' + c.author.login + '</strong>-' + c.commit.message + c.commit.committer.name + '</li>'
  ).join(' ')}</ul>`
  document.getElementById('details').innerHTML = commitList
}

function getBranches(el){
  const name = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load',displayBranches)
  req.open('GET', 'https://api.github.com/repos/'+ username + '/' + name + '/branches')
  req.send()
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(
    b=>'<li><strong>' + b.name + '</li>'
  ).join(' ')}</ul>`
  document.getElementById('details').innerHTML = branchList
}