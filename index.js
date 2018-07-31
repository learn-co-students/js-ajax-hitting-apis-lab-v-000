function getRepositories() {
  const uname = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", 'https://api.github.com/users/' + uname + '/repos')
  console.log("GET", 'https://api.github.com/users/' + uname + '/repos')
  req.send()
}

function displayRepositories(event, data) {
  repos = JSON.parse(this.responseText)
  console.log(repos)
  // const repoList = `<ul>${repos.map(r => '<li>' + r.)}`
  const repoList = `<ul>${repos.map(r => '<li>' + '<a href=https://github.com/' + r.full_name + '>' + r.name + '</a> <br /> <a href="#" data-repo=' + r.full_name + ' onclick="getCommits(this)">See Commits</a> - <a href="#" data-repo=' + r.full_name + ' onclick="getBranches(this)">See Branches</a>' + '</li><br />').join('')}`
  document.getElementById('repositories').innerHTML = repoList
}

function getCommits(link) {
  console.log('you called getCommits!')
  console.log(link)
}

function getBranches(link) {
  console.log('you called getBranches!')
  console.log(link)
}
