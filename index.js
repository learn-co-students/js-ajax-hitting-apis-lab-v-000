
function getRepositories() {
  let username = document.getElementById('username').value
  let req = new XMLHttpRequest()
    req.addEventListener("load", displayRepositories);
    req.open("GET", `https://api.github.com/users/elaineparie/repos`)
    req.send()
}

  function displayRepositories() {
    let repos = JSON.parse(this.responseText)
     const repoList = `<ul>${repos.map(r => '<li>' + 'Repo Name:' + r.full_name + 'Link:' + r.html_url + '</li>').join('')}</ul>`
     console.log(repoList)
  }
//  document.getElementById("repositories").innerHTML = repoList
//}
//
//
//function getCommits(el) {
//  const name = el.dataset.repo
//  const req = new XMLHttpRequest()
//  req.addEventListener("load", showCommits)
//  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
//  req.send()
//}

//function displayCommits() {
//  const commits = JSON.parse(this.responseText)
//  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
//  document.getElementById("commits").innerHTML = commitsList
//}
