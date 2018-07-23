function getRepositories() {
    const user = document.getElementById('username').value;
    // console.log('Get Repos for user : ', user);

    const req = new XMLHttpRequest()
    req.addEventListener("load", displayRepositories);
    req.open("GET", 'https://api.github.com/users/' + user + '/repos')
    req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  // console.log(repos)
  
  const repoList = `<ul>${repos.map(r => '<li><a href="' + r.html_url + '">' + r.name + '</a>' + 
    ' - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login +  '" onclick="getCommits(this)">Get Commits</a>' + 
    ' - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login +  '" onclick="getBranches(this)">Get Branches</a>' + 
    '</li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const repository = el.dataset.repository;
  const username = el.dataset.username;
 
  console.log('Get Commits for : ', repository, username, el);

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  console.log('show commits : ', commits)
  
  for (let i=0; i<commits.length;i++) {
    console.log(commits[i].author);
  }

  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> (' + commit.author.login + ') - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getUserInfo() {
  const user = JSON.parse(this.responseText);
  console.log(user);
}




function getBranches(el) {
  const repository = el.dataset.repository;
  const username = el.dataset.username;
 
  // console.log('Get Branches for : ', repository, username, el);

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  // console.log(branches)

  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList;
}
