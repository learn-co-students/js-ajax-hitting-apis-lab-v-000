function getRepositories() {
  let user = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  //need to put user into the open url
  req.open("GET", `https://api.github.com/users/${user}/repos`)
  req.send()
}

function displayRepositories(event, data) {
  //The displayed repositories should include the name and a link to the URL (HTML URL, not API URL).
  //need three things username, repository name, repository url
  var repos = JSON.parse(this.responseText)
  //console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' +
  '<p>Repository Name: ' + r.name +  `<p><a href="${r.html_url}">Github Link</a></p></p>` +
  'User Name: ' + r.owner.login +
  ' <p><a href="#" data-repository="' + r.name + '"data-username="'+ r.owner.login +'" onclick="getCommits(this)">Get Commits</a></p>   <a href="#" data-repository="' + r.name + '"data-username="'+ r.owner.login +'" onclick="getBranches(this)">Get Branches</a>                 </li>').join('')


  }</ul>`

  document.getElementById("repositories").innerHTML = repoList;
}

function getBranches(el) {
  const name = el.dataset.repository
  const owner = el.dataset.username//"seanoughton"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + owner + '/' + name + '/branches')
  //GET /repos/:owner/:repo/branches
  req.send()
}


//fills the details div with a list of names of each branch of the repository. Give the link data attributes of username and repository for use by the getBranches function.
function displayBranches() {
  //turns this into a json object
  const branches = JSON.parse(this.responseText)
  console.log(branches);
// creates the html by going through the commits collection and pulling out the data needed and putting it into a li
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</li>').join('')}</ul>`
  //gets the DOM element and puts the commitsList html into the div
  document.getElementById("details").innerHTML = branchesList
}


function getCommits(el) {
  const name = el.dataset.repository
  const owner = el.dataset.username//"seanoughton"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + owner + '/' + name + '/commits')
  req.send()
}

//The display of commits should include the author's Github name, the author's full name, and the commit message.
function displayCommits() {
  //turns this into a json object
  const commits = JSON.parse(this.responseText)
  //console.log(commits);
// creates the html by going through the commits collection and pulling out the data needed and putting it into a li
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + ' - ' + commit.commit.message + '</li>').join('')}</ul>`
  //gets the DOM element and puts the commitsList html into the div
  document.getElementById("details").innerHTML = commitsList
}
