
function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => `<li>/${branch.name}/</li>`).join('')}</ul>`

  document.getElementById('details').innerHTML = branchesList
}

function getBranches(el){
  const fullName = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayBranches)
  req.open('GET',`https://api.github.com/repos/${fullName}/branches` )
  req.send()
}

function displayCommits(){
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(c => `<li>${c.author.login} ${c.commit.author.name} ${c.commit.message}</li>`).join('')}</ul>`

  document.getElementById('details').innerHTML = commitsList
}

function getCommits(el){
  const owner = el.dataset.username
  const repo = el.dataset.repository
  const req = new XMLHttpRequest()
  debugger
  req.addEventListener('load', displayCommits)
  req.open('GET', `https://api.github.com/repos/${owner}/${repo}/commits`)
  req.send()
}

function displayRepositories(){
  const repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => `<li>/${r.name}/ /${r.owner.login}/ /${r.html_url}/ <br> <a href="#" data-repo="${r.full_name}" onclick="getCommits(this)">Get Commits</a> <br>
    <a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getBranches(this)">Get Branches</a></li>`).join('')}</ul>`

  document.getElementById('repositories').innerHTML = repoList
}

function getRepositories(){
  const username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayRepositories)
  req.open('GET', `https://api.github.com/users/${username}/repos`)
  req.send()
}
