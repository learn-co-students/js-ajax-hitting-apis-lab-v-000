// your code here
function getRepositories() {
  let username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayRepositories)
  req.open('GET', `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos
    .map(
      r=>
      '<li>' +
      '<a href="https://github.com/'+r.full_name+'">'+ r.name +'</a>'+
      ' - <a href="#"'+
      'data-repository="'+ r.name +'"'+
      'data-fullname="'+ r.full_name +'"'+
      'data-username="'+ r.owner.login +'"'+
      ' onclick="getCommits(this)">Get Commits</a></li>'+
      ' - <a href="#"'+
      'data-repository="'+ r.name +'"'+
      'data-fullname="'+ r.full_name +'"'+
      'data-username="'+ r.owner.login +'"'+
      ' onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join('')}</ul>`

  document.getElementById('repositories').innerHTML = repoList
}

function getCommits(element) {
  const repository = element.dataset.repository
  const username = element.dataset.username
  const full_name = `${username}/${repository}`

  const req = new XMLHttpRequest()
  req.addEventListener('load',displayCommits)
  req.open('GET', `https://api.github.com/repos/${full_name}/commits`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li>' +
        commit.commit.message + ' <br>'+
        commit.commit.author.name + ' <br>' +
        commit.author.login+ ' <br>'+
        '</li>'
      )
      .join('')}</ul>`
    document.getElementById('details').innerHTML = commitsList
}

function getBranches(element) {
  const repository = element.dataset.repository
  const username = element.dataset.username
  const full_name = `${username}/${repository}`

  const req = new XMLHttpRequest()

  req.addEventListener('load',displayBranches)
  req.open('GET', `https://api.github.com/repos/${full_name}/branches`)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  console.log(branches)
  const branchesList = `<ul>${
    branches.map(
      branch=>
      '<li>'+
        branch.name +
      '</li>'
    ).join('')
  }</ul>`

  document.getElementById("details").innerHTML = branchesList
}
