function displayRepositories(event, data){
  let repos = JSON.parse(this.responseText)
  let repoList = "<ul>"
  for(let i = 0; i < repos.length; i++){
    repoList += `<li>Name: ${repos[i].name}<br> <a href="#" data-repository="${repos[i].name}" data-username="${repos[i].owner.login}" onClick="getCommits(this)">Get Commits</a> <br> <a href="#" data-repository="${repos[i].name}" data-username="${repos[i].owner.login}" onClick="getBranches(this)">Get Branches</a> <br>  <a href="${repos[i].html_url}">${repos[i].html_url}</a> </li>`
  }
  repoList += "</ul>"

  // const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.querySelector("#repositories").innerHTML = repoList
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  let commitsList = ""
  for (let i = 0; i < commits.length; i++){
    if(commits[i].author){
      commitsList += `Username: ${commits[i].author.login}<br> Name: ${commits[i].commit.author.name} <br> Message: ${commits[i].commit.message} <br><br>`
    }
  }
  
  // author's github name  --   commits[i].author.login
  // author's full name  --   commits[i].commit.message
  // commit message  --   commits[i].commit.message
  
  // `<ul>${commits.map(commit =>  '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  // console.log(commitsList)

  document.querySelector("#details").innerHTML = commitsList
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  let branchesList = ""
  for (let i = 0; i < branches.length; i++){
    branchesList += `Branch Name: ${branches[i].name}<br><br>`
  }
  document.querySelector("#details").innerHTML = branchesList  
}


function getRepositories(){
  // console.log(event)
  // event.preventDefault()
  // loads #repositories div with list of public repositories
  // for that user.
  // repositories should have name and link to html url.
  let name = document.querySelector("#username").value

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", `https://api.github.com/users/${name}/repos`)
  req.send()
}

function getCommits(el) {
  const name = el.dataset.repository
  const username = el.dataset.username

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`)
  req.send()
}

function getBranches(el) {
  const name = el.dataset.repository
  const username = el.dataset.username  

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/${name}/branches`)
  req.send()

}