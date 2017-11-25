
function displayRepositories(event) {
  // //debugger
  let username = document.getElementById('username').value

  let repos = JSON.parse(this.responseText)
  console.log(repos)
  //debugger
  let repolist = `<ul>${repos.map(r =>{return '<li>' + r.name + '- <a href="' + r.html_url + '">Link to Repo</a> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this); return false;"> Show Commits</a>' + '</li>'}).join('')}</ul>`
  // debugger
  document.getElementById('repositories').innerHTML = repolist
}

function getRepositories(){
  let username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  // debugger
  req.addEventListener("load", displayRepositories);
  //debugger
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  //debugger
  req.send()
}


function displayCommits(){
  let commits = JSON.parse(this.responseText)
  console.log(commits)

  let commitList = `<ul>${commits.map(c => '<li>' + c.commit.committer.name + ' - ' + c.committer.login + ' - ' + c.commit.message).join('')} </ul>`

  document.getElementById('details').innerHTML = commitList
}

function getCommits(el){
  console.log(el)
  const repoName = el.dataset.repository
  const ownerName = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${ownerName}/${repoName}/commits`)
  req.send()
}
