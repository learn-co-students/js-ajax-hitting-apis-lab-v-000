function getRepositories() {
  const req = new XMLHttpRequest()
  const name = document.getElementById("username").value
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + name + '/repos')

  req.send()
  return false;
}




// The second part of XHR is handling the response once we've made the request. 
// We do this by defining an event listener on the request to listen for the load event, 
// which will tell us that the request is complete. We'll give this listener a callback function, 
// which is simply a function that will get called when the event fires.

// '<ul><li>undefined - <a href="#" data-repo="Hello-World" onclick="getCommits(this)">Get Commits</a></li></ul>'
function displayRepositories() {

  const repos = JSON.parse(this.responseText)
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


function getCommits(el) {
  const nameRepo = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)

  req.open("GET", 'https://api.github.com/repos/' + el.dataset.username +"/"+ nameRepo + '/commits')
  req.send()
}

function displayCommits(){
	const commits = JSON.parse(this.responseText)
	const commitsList = commits.map(c => {return `<li>user: ${c.author.login}, name: ${c.commit.author.name}, message: ${c.commit.message}</li>`}).join('')
	document.getElementById("details").innerHTML = commitsList
	// debugger
}


function getBranches(el){
	const nameRepo = el.dataset.repository
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayBranches)
    req.open("GET", 'https://api.github.com/repos/' + el.dataset.username +"/"+ nameRepo + '/branches')
    req.send()
}


function displayBranches(){
	const branches = JSON.parse(this.responseText)
	const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
	document.getElementById("details").innerHTML = branchesList
}







