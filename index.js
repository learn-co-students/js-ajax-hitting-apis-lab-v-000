
function getRepositories() {
  let username = document.getElementById('username').value
  const url = `https://api.github.com/users/${username}/repos`
  debugger
  let req = new XMLHttpRequest()
    req.addEventListener("load", displayRepositories);
    req.open("GET", url)
    req.send()
    return false
}

  function displayRepositories() {
    debugger
   let repos = JSON.parse(this.responseText)
    const repoList = '<ul>' + repos.map(r => {
      return `
    <li>
    <h3>${r.name}</h3>
    <a href=${r.html_url}>${r.html_url}</a>
    <a href="#" data-repo=${r.name} data-username=${r.owner.login} onclick="getCommits(this)"></a>
    <a href='#'
     data-repository="${r.name}"
     data-username="${r.owner.login}"
     onclick='getBranches(this)'> Show Branches </a></li>
     `

    //r.name + ' - <a href="#" data-repo="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)"> Get Commits</a><a href=' + repo.html_url +'>'repo.html_url'</a></li>').join('')}</ul>`
  }).join('') + '</ul>'

    document.getElementById("repositories").innerHTML = repoList
 }

  function getCommits(el) {
    const name = el.dataset.repo
    console.log(name)
    const repo = el.dataset.repository
    const username = el.dataset.username
    console.log(username)
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayCommits)
    req.open("GET", `https://api.github.com/repos/${username}/${repo}/commits`)
    req.send()
  }

  function displayCommits() {
    const commits = JSON.parse(this.responseText)
    const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> - ' + commit.author.login + " " + commit.commit.message + '</li>').join('')}</ul>`
    document.getElementById("details").innerHTML = commitsList
  }

  function getBranches(anchor) {
    let dataset = anchor.dataset;
    let repository = dataset.repository;
    let username = dataset.username;

    const req = new XMLHttpRequest()

    req.addEventListener("load", displayBranches);
    req.open("GET", `https://api.github.com/repos/${username}/${repository}/branches`)
    req.send()
  }

  function displayBranches() {
  let branches = JSON.parse(this.responseText)
  let list = branches.map(b => {
    return `<li>name: ${b.name}</li>`
  }).join('')
  let branchesList = `<ul>${list}</ul>`

  document.getElementById("details").innerHTML = branchesList
}
