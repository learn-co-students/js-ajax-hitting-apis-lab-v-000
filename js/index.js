// your code here
function getRepositories(){
  let name = document.getElementById('username').value
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/'+ name +'/repos');
  req.send();
}

function displayRepositories(){
  let repos = JSON.parse(this.responseText);
  // console.log(repos);
  const repoList = `<ul>${repos
    .map( r =>
        '<li>' + r.name + ' - <a href="#" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repository="'+ r.name +'" onclick="getBranches(this)">Get Branches</a> <ul><li>'+r.owner.login+'</li><li>'+ r.html_url +'</li></ul></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el){
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}

function displayCommits(){
  let commits = JSON.parse(this.responseText)
  const commitList = `<ul>${commits.map(c =>
    '<li>' + c.commit.message +
      '<ul><li>' + c.author.login +'</li><li>' + c.commit.author.name + '</ul></li>'
  ).join('')}</ul>`
  document.getElementById('details').innerHTML = commitList
}

function getBranches(el){
  let repoName = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayBranches)
  req.open('GET', 'https://api.github.com/repos/octocat/' + repoName + '/branches')
  req.send()
}

function displayBranches(){
  let branches = JSON.parse(this.responseText)
  let branchList = `<ul>${branches.map(b =>
    '<li>' + b.name + '</li>'
  ).join('')}</ul>`
  document.getElementById('details').innerHTML = branchList

}
