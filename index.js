const rootURL = "https://api.github.com";

//calls out to Github
function getRepositories(){
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/josh-kramer-dev/repos');
  req.send();
}
//parses and displays json values for repositories
fuction displayRepositories(event, data){
  let repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}



//calls out to Github
function getCommits(){}
//parses and displays json values for commits
function displayCommits(){}

//calls out to Github
function getBranches(){}
//parses and displays json values for branches
function displayBranches(){}
