// your code here

function getRepositories() {
  const request = new XMLHttpRequest();
  request.addEventListener('load', displayRepositories);
  request.open('GET', 'https://api.github.com/users/octocat/repos');
  request.send();
}

function displayRepositories(){
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos.map(repo => '<li>' +
  repo.name  + '   ' +
  '- <a href="#" data-repo=' +
  repo.name + '" onclick="getCommits(this)">Get Commits</a>'+ '  '+
  repo.html_url +'</li>')
  .join('')} </ul> `;

  document.getElementById('repositories').innerHTML = repoList;
}




function getCommits(el) {
  let name = el.dataset.repo;
  const request = new XMLHttpRequest();
  request.addEventListener('load', displayCommits);
  request.open('GET', 'https://api.github.com/repos/octocat/'+ name +'/commits');
  console.log(name);
  request.send();
};

function displayCommits(){
//   const commits = JSON.parse(this.responseText);
//   const commitsList = `<ul>${commits.map(commit => '<li>' commit.author.name + commit.author.full_name + commit.message + '</li>')}
// ).join('')}</ul>`;
//
//   document.getElementById('details').innerHTML = commitList;

}
