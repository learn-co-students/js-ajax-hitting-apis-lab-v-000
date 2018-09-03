
function getRepositories() {
  let username = document.getElementById('username').value
  let req = new XMLHttpRequest()
    req.addEventListener("load", displayRepositories);
    req.open("GET", `https://api.github.com/users/${username}/repos`)
    req.send()
}

  function displayRepositories() {
    let repos = JSON.parse(this.responseText)
     const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)"> Get Commits</a></li>').join('')}</ul>`


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
    req.open("GET", 'https://api.github.com/repos/octocat/' + username + '/commits')
    req.send()
  }

  function displayCommits() {
    const commits = JSON.parse(this.responseText)
    const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
    document.getElementById("commits").innerHTML = commitsList
  }
