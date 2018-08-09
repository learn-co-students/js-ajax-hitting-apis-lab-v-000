function getRepositories(){
  username = document.getElementById('username').value

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + username + '/repos')
  req.send()


}


function displayRepositories(){
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  console.log(this)
  const repoNames = `<ul> ${repos.map(r => '<li> <h3><a href ='+r.html_url+'>' + r.name + '</h3></a> <a href ="#" data-url="' + r.html_url +'" data-username="' + r.owner.login +'" data-repository="' + r.name + '" onclick="getCommits(this)"> Commits </a> <a href ="#" data-url="' + r.html_url +'" data-username="' + r.owner.login +'" data-repository="' + r.name + '" onclick="getBranches(this)"> Branches </a> </li>').join('')}</ul>`

  document.getElementById('repositories').innerHTML = repoNames
}


function getCommits(el){
  const repo = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/commits`)
  req.send()
}

function displayCommits(){
  var commits = JSON.parse(this.responseText)
  var commitsList = `<ul>${commits.map(c=> '<li>' + c.commit.committer.name +' - ' +  c.author.login +' - '+ c.commit.message + '</li>').join('')}</ul>`
  document.getElementById('details').innerHTML = commitsList
}

function getBranches(el){
  var repo = el.dataset.repository
  var req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/branches`)
  req.send()
}


function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchList = branches.map(b => b.name)

  document.getElementById('details').innerHTML = branchList
}
