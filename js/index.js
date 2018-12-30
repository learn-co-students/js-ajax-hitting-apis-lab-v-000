// your code here
function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repolist = `<ul>${repos.map(repo => '<li><a href = "' + repo.html_url + '">'+repo.name+'</a>' +
    '- <a href="#" data-repo="' + repo.name + '" data-user="' + repo.owner.login + '" onClick= "getCommits(this)">Get Commits</a>' +
    '- <a href="#" data-repo="' + repo.name + '" data-user="' + repo.owner.login + '" onClick= "getBranches(this)">Get Branches</a>' +
    '</li>')
    .join('')}</ul>`
  document.getElementById('repositories').innerHTML = repolist
}

function getRepositories() {
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest;
  req.addEventListener('load', displayRepositories)
  req.open('GET', 'https://api.github.com/users/'+ username +'/repos')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitList = `<ul>${commits.map(commit => '<li>'+ commit.author.login + '-' +
    commit.commit.committer.name + '-' +
    commit.commit.message +
  '</li>').join('')}</ul>`
  document.getElementById('details').innerHTML = commitList
}

function getCommits(rp) {
  const repo = rp.dataset.repo
  const user = rp.dataset.user
  const req = new XMLHttpRequest;
  const html = 'https://api.github.com/repos/' + user + '/' + repo + '/commits'
  // debugger;
  req.addEventListener('load', displayCommits)
  req.open('GET', html)
  req.send()
  console.log('https://api.github.com/repos/' + user + '/' + repo + '/commits');
  
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(branch => '<li>'+ branch.name +'</li>').join('')}</ul>`
  document.getElementById('details').innerHTML = branchList
}

function getBranches(rp) {
  const repo = rp.dataset.repo
  const user = rp.dataset.user
  const req = new XMLHttpRequest;
  req.addEventListener('load', displayBranches)
  req.open('GET', 'https://api.github.com/repos/' + user + '/' + repo + '/branches')
  req.send()
  console.log('https://api.github.com/repos/' + user + '/' + repo + '/branches');
}