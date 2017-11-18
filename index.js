
function getRepositories(){
  
    const req = new XMLHttpRequest()
    req.addEventListener("Load", displayRepositories)
    
    var name = document.getElementById("username").value
    // debugger
    req.open('GET', 'https://api.github.com/users/'+ name + '/repos')
    req.send()
    
  }
function displayCommits(){

}

function displayBranches(){

}
function getBranches(){
  
}
function getCommits(el){
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)

  // req.open("GET", 'https://api.github.com/repos/:owner/:repo/commits')

}

function displayRepositories(event, data){
  
  var repos = JSON.parse(this.responsetext)
  console.log(repos)
  document.getElementById("username").innerHTML = repolist
}

