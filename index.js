const domain = "https://api.github.com"

function displayRepositories(event, data){
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(r => {
    const dataUsername = `data-username="${r.owner.login}"`
    const dataRepo = `data-repository="${r.name}"`
    return(`
    <li>
      <h2>${r.name}</h2>
      <a href="${r.html_url}">${r.html_url}</a><br>
      <a href="#" ${dataRepo} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
      <a href="#" ${dataRepo} ${dataUsername} onclick="getBranches(this)">Get Branches</a><br>
      </li>
      `)
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el){
  const repository = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `${domain}/repos/${username}/${repository}/commits`)
  req.send()
}

function displayCommits(event, data){
  const commits = JSON.parse(this.responseText)
  const commitsList = "<ul>" + commits.map(commit => {
    return `<li><h4>${commit.commit.author.name}<h4> ${commit.author.login} ${commit.commit.message}</li>`
  }).join('') + "</ul>";
  document.getElementById("details").innerHTML = commitsList
}


function getRepositories(){
  let username = document.getElementById("username").value
  let userUrl = `${domain}/users/${username}/repos`
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories)
  req.open("GET", userUrl)
  req.send()
};

function getBranches(el){
  const repository = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `${domain}/repos/${username}/${repository}/branches` )
  req.send()
}

function displayBranches(event, data){
  const branches = JSON.parse(this.responseText)
  const branchList = "<ul>" + branches.map(b => {
    return `<li>${b.name}</li>`
  }) + "</ul>"
  document.getElementById("details").innerHTML = branchList
}