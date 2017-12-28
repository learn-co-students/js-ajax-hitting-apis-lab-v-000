
function getRepositories(){
  let username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send()
}

function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText)
  let list = repos.map(r => {
    return `<li><a href=${r.html_url}>${r.name}</a></li>
    <ul><li><a href='#'
      data-repository="${r.name}"
      data-username="${r.owner.login}"
      onclick='getCommits(this)'> Show Commits </a></li>
    <li><a href='#'
      data-repository="${r.name}"
      data-username="${r.owner.login}"
      onclick='getBranches(this)'> Show Branches </a></li></ul>`
  }).join('')

  let repoList = `<ul>${list}</ul>`

  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el){
  let repository = el.dataset.repository
  let username = el.dataset.username

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/commits`)
  req.send()
}

function displayCommits(){
  let commits = JSON.parse(this.responseText)
  let list = commits.map(c => {
    return `<li>Username: ${c.author.login}, Full Name: ${c.commit.author.name}<br>Message: ${c.commit.message}</li>`
  }).join('')
  let commitList = `<ul>${list}</ul>`

  document.getElementById("details").innerHTML = commitList

}


function getBranches(el){
  let repository = el.dataset.repository
  let username = el.dataset.username

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/branches`)
  req.send()
}

function displayBranches(){

  let branches = JSON.parse(this.responseText)
  let list = branches.map(b => {
    return `<li>${b.name}</li>`
  }).join('')
  let branchList = `<ul>${list}</ul>`

  document.getElementById("details").innerHTML = branchList

}
