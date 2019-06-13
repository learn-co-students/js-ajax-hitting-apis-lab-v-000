// Variables 
const reqxml = new XMLHttpRequest();
const apiUrl = 'https://api.github.com/users/octocat/repos'

// Handeling the response 
function showRepositories(event, data){
// We grab the data, and put in JSON form
  let repos = JSON.parse(this.responseText);
  console.log(repos)

  // Output the data by looping through repos
  const repoList = `<ul>${repos.map(repo => '<li>' + repo.name + ' - <a href=repo.html_url data-repo> Repo URL </a> - <a href="#" data-username="'+ repo.name + '" onclick="getCommits(this)">Get Commits</a></li>')} </ul>`;
  document.getElementById('repositories').innerHTML = repoList 
}
// the repository request 
function getRepositories(event, data){
  reqxml.addEventListener('load', showRepositories);
  reqxml.open("GET", apiUrl )
  reqxml.send()
}
// Get commit request - we grab the repo-data by using the dataset property 
function getCommits(event){
  const name =
  event.dataset.username 
  
  reqxml
  reqxml.addEventListener("load", showCommits)
  reqxml.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  reqxml.send()
}
// Now our showCommits() callback function 
function showCommits(){
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><storng>' + commit.author.login + '</stron> - ' + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = commitsList
}