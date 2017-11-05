function getRepositories() {
  const req = new XMLHttpRequest()
  const username = document.getElementById("username").value;
  req.addEventListener("load", displayRepositories)
  req.open("GET", 'https://api.github.com/users/'+username+'/repos')
  req.send()
}


function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  //console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ` - <a href=${r.html_url}>${r.html_url}></a>` + 
                    '- <a href="#" data-repository="' + r.name + '" data-username="'+r.owner.login+'" onclick="getCommits(this)">Get Commits</a>' +
                    '- <a href="#" data-repository="' + r.name + '" data-username="'+r.owner.login+'" onclick="getBranches(this)">Get Branches</a>' +
                    '</li>').join('')}</ul>`

  document.getElementById("repositories").innerHTML = repoList
}


function getCommits(el) {
  const req = new XMLHttpRequest()
  const username = el.dataset.username
  const repository = el.dataset.repository
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username +  '/' + repository + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li>' + commit.commit.author.name  + commit.author.login + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const req = new XMLHttpRequest()
  const username = el.dataset.username
  const repository = el.dataset.repository
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + username +  '/' + repository + '/branches')
  req.send()
}


function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}