function getRepositories() {
  var username = document.getElementById("username").value
  const req= new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET","https://api.github.com/users/" + username + "/repos")
  req.send()



}

function displayRepositories(event, data){
  var repos = JSON.parse(this.responseText)

  const repoList = `<ul>${repos.map(repos => '<li>'+ repos.name + ' - <a href="'+repos.html_url+'" data-repo= "' + repos.name + '" onClick = "getCommits(this)">Get Commits </a> </li>')}</ul>`
  repoDiv= document.getElementById("repositories")
  repoDiv.innerHTML += repoList

}


function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()

}

function displayCommits(){
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + ' ' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  const commitsDiv = document.getElementById("details")
  commitsDiv.innerHTML= commitsList


}


function getBranches(el){
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/branches')
  req.send()

}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchFormat = `<ul> ${branches.map(branch => '<li>' + branch.name + ' </li>')}</ul> `
  const branchDiv = document.getElementById("details")
  branchDiv.innerHTML += branchFormat
}
