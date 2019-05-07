// your code here
function getRepositories()
{
  let username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/'+username+'/repos');
  req.send();

}
function displayRepositories()
{
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
  .map(
    r =>
      '<li>' +
      r.name +
      ': <a href="'+r.html_url+'">'+r.html_url+'</a><br>' +

      ' - <a href="#" data-repository="' + r.name +
      '" data-username="' + r.owner.login +
      '" onclick="getCommits(this)">Get Commits</a>' +

      ', <a href="#" data-repository="' + r.name +
      '" data-username="' + r.owner.login +
      '" onclick="getBranches(this)">Get Branches</a></li>'
  )
  .join('')}</ul>`;
  console.log(repoList);
  document.getElementById('repositories').innerHTML = repoList;
}
function getCommits(el)
{
  const repoName = el.dataset.repository;
  const username = el.dataset.username;

  console.log(repoName);
  console.log('https://api.github.com/repos/'+username+'/' + repoName + '/commits');
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/'+username+'/' + repoName + '/commits');
  req.send();

}
function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li>'+ commit.commit.author.name +
        ' (' +
        commit.author.login +
        ') - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}
function getBranches(el)
{
  const repoName = el.dataset.repository;
  const username = el.dataset.username;


  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  debugger
  req.open('GET', 'https://api.github.com/repos/'+username+'/' + repoName + '/branches');
  req.send();
}
function displayBranches()
{
  const branches = JSON.parse(this.responseText);
  console.log(branches);

  const branchesList = `<ul>${branches
     .map(branch => '<li>' + branch.name + '</li>')
     .join('')}</ul>`;
   document.getElementById('details').innerHTML = branchesList;
}
