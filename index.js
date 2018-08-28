function getRepositories() {
  const req = new XMLHttpRequest
  let username = document.getElementById("username").value
  req.addEventListener("load", displayRepositories)
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  let username = document.getElementById("username").value
  
  const list = repos.map(r=>{
      console.log(r)
    return `<li><a href=${r.html_url}>${r.name}</a>
     <a href="#"
     data-repository="${r.name}"
     data-username="${r.owner.login}"
     onclick='getCommits(this)'> Get Commits </a>
     <a href="#"
     data-repository="${r.name}"
     data-username="${r.owner.login}"
     onclick='getBranches(this)'> Get Branches </a>
     </li>`
  }).join('')
  let repoList = `<ul> ${list}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  let dataset = el.dataset
  const datarep = dataset.repository
  const name = dataset.username
  console.log("data", dataset)
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${name}/${datarep}/commits`)
  req.send()
}
 function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const list = commits.map(commit => {
    return `<li> user: ${commit.author.login}, name: ${commit.commit.author.name}, message: ${commit.commit.message}</li>`
  }).join('')
  const commitsList = `<ul>${list}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
 function getBranches(el) {
  let dataset = el.dataset
  const datarep = dataset.repository
  const name = dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${name}/${datarep}/branches`)
  req.send()
}
 function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const list = branches.map(branch => {
    return `<li> name: ${branch.name}</li>`
  }).join('')
  const detailsList = `<ul>${list}</ul>`
  document.getElementById("details").innerHTML = detailsList
}