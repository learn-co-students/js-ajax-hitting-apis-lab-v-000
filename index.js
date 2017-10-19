function getRepositories() {
  let username = event.target.username.value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()  
}

function displayRepositories() {
  let repos = JSON.parse(event.srcElement.responseText)
  let reposHTML = '<ul>'
  for(let i = 0; i < repos.length; i++){
    let repo = repos[i]
    let repoLink = `<li>Name: <strong>${repo.name}</strong><br>URL: <a href="https://github.com/${repo.owner.login}/${repo.name}">showRepo</a><br>Commits: <a href="#" data-repository="${repo.name}" data-username="${repo.owner.login}" onclick="getCommits(this)">Get Commits</a><br>Branches: <a href="#" data-repository="${repo.name}" data-username="${repo.owner.login}" onclick="getBranches()">Get Branches</a></li><br>`
    reposHTML += repoLink
  }
  reposHTML += '</ul>'
  $('#repositories')[0].innerHTML = reposHTML
}

function getCommits() {
  const repo = event.target.dataset.repository
  const username = event.target.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${repo}/commits`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  let commitsHTML = '<ul>'
  for(let i = 0; i < commits.length; i++){
    if (commits[i]){
      let commitDetails = ''     
      let details = `username: ${commits[i].author.login}<br>fullname: ${commits[i].commit.author.name}<br>message: ${commits[i].commit.message}<br><br>`
      commitsHTML += details 
    }
  }
  document.getElementById('details').innerHTML = commitsHTML
}

function getBranches(){
  const repository = event.target.dataset.repository
  const username = event.target.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/branches`)
  req.send()  
}

function displayBranches(){
  let branches = JSON.parse(event.target.response)
  let branchesHTML = '<ul>'
  for(let i = 0; i < branches.length; i++){
    if (branches[i]){
      let branchDetails = ''     
      branchDetails = `<li>branch name: ${branches[i].name}</li>`
      branchesHTML += branchDetails 
    }
  }
  branches += '</ul>'
  document.getElementById('details').innerHTML = branchesHTML
}

function branchesData(){
  console.log("you talkin to me??")
}