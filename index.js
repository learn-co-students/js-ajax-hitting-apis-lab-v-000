
function getRepositories(){
  
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayRepositories)
    
    var name = document.getElementById("username").value
    // debugger
    req.open('GET', 'https://api.github.com/users/'+ name + '/repos')
    req.send()
    
  }
  function displayRepositories(){
    var repos = JSON.parse(this.responseText)
    const repoList = "<ul>" + repos.map(repo => {
      const dataUsername = 'data-username="' + repo.owner.login + '"'
      const dataRepoName = 'data-repository="' + repo.name + '"'
      return(`
            <li>
              <h2>${repo.name}</h2>
              <a href="${repo.html_url}">${repo.html_url}</a><br>
              <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
              <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
            </li>`
            )
    }).join('') + "</ul>";
    document.getElementById("repositories").innerHTML = repoList

  }
function displayCommits(){
  var commits = JSON.parse(this.responseText)
  
  const commitList = 

  document.getElementById("details").innerHTML = commitList
  
}

function displayBranches(){

}
function getBranches(el){
  
  const repo = el.dataset.repository
  const owner = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)  

  req.open("GET", 'https://api.github.com/repos/' + owner + '/' + repo + '/branches')
  req.send()
}
function getCommits(el){
  
  const username = el.dataset.username
  const repo = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repo + '/commits')
  req.send()
}



