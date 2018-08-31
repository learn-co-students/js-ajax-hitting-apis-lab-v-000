function getRespositories(){
  const username = document. getElementById("username").innerHTML;
  const req = new XMLHttpRequest)();
  req.open ("GET", 'https://api.github.com/${username}/repos');
  req.addEventListener("load", displayRepositories);
  req.send();
}

//each repository should call on getCommits on click.
function displayRepositories(event, data){
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + '</li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

//make a request for commits on the repository that was clicked
function getCommits(){

}


//SHould fill the details div with a list of commits for the repository.
//The display should include the author's github name, the authors full name and the commit message
// give the link data attributes of username and repository to be used by the getCommits function
function displayCommits(){

}

// make a request for the branches of the repo
function getBranches(){


}


// should fill the details div with a list of names of each branch of the repository.
// the link attributes of username and repository for use by getBranches()
function displayBranches(){

}
