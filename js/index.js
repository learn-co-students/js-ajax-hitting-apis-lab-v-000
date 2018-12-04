// your code here

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

function displayRepositories(){
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos.map(repo => '<li>' +
  repo.name + ',' + '   ' +
  '- <a href="#" data-repo=' +
  repo.name + '" onclick="getCommits(this)">Get Commits</a>' +
  repo.html_url +'</li>')
  .join('')} </ul> `;
  document.getElementById('repositories').innerHTML = repoList;
}




function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  console.log(name);
  req.send();
};

function displayCommits(){


}
