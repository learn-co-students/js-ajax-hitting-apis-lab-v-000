function getRepositories() {
  let username = document.getElementById("username").value;
  let repos = `https://api.github.com/users/${username}/repos`;

  req = new XMLHttpRequest();
  req.open("GET", repos);
  req.send();
}




function getCommits() {

}


function getBranches() {

}


function displayCommits() {

}


function displayBranches() {

}


function displayRepositories() {

}
