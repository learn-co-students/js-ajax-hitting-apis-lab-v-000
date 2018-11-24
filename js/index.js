// your code here

function getRepositories() {
  const req = new XMLHttpRequest();                //make new request & set it to a variable
  req.addEventListener('load', displayRepositories);              //add event listener & call displayRepositories()
  var gitusername = document.getElementById("username");            //grab username from document & set it to a variable
  //var link1 = `https://api.github.com/users/${gitusername.value}/repos`             **made this line to ck value of https request
  req.open('GET', `https://api.github.com/users/${gitusername.value}/repos`);      //open request & get the repo for the username
  //console.log(link1)
  req.send()                                                                    //send the request
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);                  //parse JSON from the request & set it to a variable
  //console.log(repos);
  const repoList = `<ul>${repos                                //set the parsed data to variable
    .map(                                                       //iterate thru the data
      r =>
      '<li><a href="' + r.html_url + '">' + r.name +               //print out the link to  html_url & repository name
  '</a> - <a href="#" data-repository="' + r.name +               //set link to which repository you're on
  '" data-username="' + r.owner.login +                           //give username
  '" onclick="getCommits(this)">Get Commits</a> | <a href="#" data-repository="' + r.name +          //set link for commits for that repository
  '" data-username="' + r.owner.login +                           //set link to repository  & give username
  '" onclick="getBranches(this)">Get Branches</a> </li>').join('')}</ul>`               //set link for branches for that repository
    document.getElementById("repositories").innerHTML = repoList             //set innerHTML of repositories in index.html to repoList variable
}

function getCommits(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;
  console.log(name)
  console.log(username)
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  //var link2 = 'https://api.github.com/repos/' + username + '/' + name + '/commits'
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/commits');
  //console.log(link2)
  req.send()
}

function displayCommits() {
  var commits = JSON.parse(this.responseText);
  console.log(commits)
  const commitsList = `<ul>${commits
    .map(
      commit =>
      '<li><strong>' +
      commit.author.login +
      '</strong>-'+
      commit.commit.message +
      '<strong>-' +
      commit.commit.committer.name +
      '</li>'
    )
.join('')}</ul>`;

document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const name = el.dataset.repository
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username +'/' + name +'/branches');
  req.send()
}

function displayBranches() {
const branches = JSON.parse(this.responseText);
const branchList = `<ul>${branches
  .map(
    branch =>
    '<li>' +
    branch.name +
    '</li>')
    .join('')}</ul>`;
document.getElementById('details').innerHTML = branchList;
}
