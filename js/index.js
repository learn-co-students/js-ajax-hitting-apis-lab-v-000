const rootURL = 'https://api.github.com';

function getRepositories() {
  const usernameValue = document.getElementById('username').value;
  const requestReposURL = `${rootURL}/users/${usernameValue}/repos`;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', requestReposURL);
  req.send();
}
// Explanation of getRepositories():
// document.getElementById('username') is <input type="text" id="username"> (form field where username is entered)
// document.getElementById('username').value retrieves the string value entered in this form field
// usernameValue variable stores the string username that was entered into the form field
// req stores a new instance of an XMLHttpRequest
// define an eventListener on the req object to tell it to listen for the load event,
// which fires to indicate that the request to retrieve the public repos of the user whose name was entered into form field is complete
// Once the load event fires, the displayRepositories() callback function is called
// When we call open() on the req object, the first argument is the HTTP verb 'GET' and the
// second argument is the string URL for the request (stored in requestReposURL)
// According to GitHub API documentation, to list public repos for the specified user:
// GET "/users/:username/repos" and we fill in :username route variable (dynamic segment)
// with the string value stored in our usernameValue variable
// req.send() will send the request to retrieve that particular user's public repos
function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList =
  '<ul>' +
  repos
    .map(repo => {
      const usernameDataAttribute = 'data-username="' + repo.owner.login + '"';
      const repositoryDataAttribute = 'data-repository="' + repo.name + '"';
      return `<li>
        <h2>${repo.name}</h2>
        <a href="${repo.html_url}">View ${repo.name} on GitHub</a><br>
        <a href="#" ${usernameDataAttribute} ${repositoryDataAttribute} onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" ${usernameDataAttribute} ${repositoryDataAttribute} onclick="getBranches(this)">Get Branches</a>
      </li>`;
    })
    .join('') +
  '</ul>';
 document.getElementById('repositories').innerHTML = repoList;
}
// Explanation of displayRepositories():
// Inside displayRepositories callback function
// (which is called when the load event fires to indicate that the request to receive a user's public repos is complete)
// this refers to the XMLHttpRequest object (i.e. the req object) that fired the load event.
// this.responseText lets us see the full body of the JSON response from our XHR request.
// We pass this.responseText to JSON.parse() to tell JS that we're working with JSON
// (b/c otherwise it will just view it as string text and we'll get a bunch of undefineds)
// repos stores an array of repo objects

function getCommits(el) {
  const ownerValue = el.dataset.username;
  const repoValue = el.dataset.repository;
  const requestCommitsURL = `${rootURL}/repos/${ownerValue}/${repoValue}/commits`;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', requestCommitsURL);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
      '<li><strong>' +
      commit.commit.author.name +
      '</strong> (<em>' +
      commit.author.login +
      '</em>)' +
      ' - ' +
      commit.commit.message +
      '</li>'
    )
    .join('')}</ul>`;
 document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const ownerValue = el.dataset.username;
  const repoValue = el.dataset.repository;
  const branchesRequestURL = `${rootURL}/repos/${ownerValue}/${repoValue}/branches`;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', branchesRequestURL);
  req.send();
}
// Explanation of getBranches(el) function:
// According to GitHub API documentation, to list the branches of a specific repo, use the route:
// GET "/repos/:owner/:repo/branches"
// The function getBranches(el) takes the argument of the element (<a> link tag from the displayRepositories function)
// so that getBranches(el) function can access the data attributes (data-username and data-repository)
// that are properties of the <a> tag (w/ corresponding string values of the GitHub user's username and the name of the repo)
// ownerValue variable stores the string value corresponding to the <a> tag's data-username property
// and we access it with el.dataset.username
// repoValue stores the string value corresponding to the data-repository property of the <a> tag,
// and we access it with el.dataset.repository
// ownerValue and repoValue replace the :owner and :repo route variables
// in GET /repos/:owner/:repo/branches when we compose the full URL for the request to list the repo's branches:
// const branchesRequestURL = `${rootURL}/repos/${ownerValue}/${repoValue}/branches`
// req stores a new instance of an XMLHttpRequest (i.e. req is an XMLHttpRequest object)
// Define an eventListener on the req object, to listen for the load event.
// The load event fires when the request to list a particular repo's branches is complete
// The displayBranches callback function is called when the load event fires
// Inside the displayBranches callback function, this refers to the req object that triggered the load event
// Calling open on the req object w/ 2 arguments: the 'GET' HTTP verb and the URL for the request (stored in branchesRequestURL variable)
// Calling send on the req object sends the request to retrieve the specified repo's branches
function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(branch => '<li>' + branch.name + '</li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
// Explanation of displayBranches() function:
// Inside of the displayBranches callback function, this refers to the req object that fired the load event
// The load event fired to indicate that the request for the repo's branches was complete,
// so the response can now be sent and handled to actually show the repo's branches on the page)
// this.responseText allows us to see the full body of the JSON response from our XHR request
// we pass this.responseText to JSON.parse() to tell the JS engine that it's dealing with JSON
// (otherwise, it will treat the response as a normal text string and we'll see a bunch of 'undefined's in the browser)
// branches stores an array of branch objects
// For each branch object in the branches array of objects,
// generate a string list item `<li>...</li>` that contains the name of the branch
// object.key returns corresponding value, so branch.name returns the string name of the branch
// which we put between each <li></li> tag
// map returns an array of comma-separated values, so we .join('') the list items
// so that the bullet-point <li>s are not separated by commas
// branchesList stores a string list `<ul>...</ul>` containing these `<li>` elements of the repo's branch names
// The string `<ul>...</ul>` becomes the string HTML inside of the <div id="details"> on the page

//Another way to write displayBranches():
//function displayBranches() {
//  const branches = JSON.parse(this.responseText);
//  const branchesList =
//  '<ul>' +
//  branches
//    .map(branch => {
//      return '<li>' + branch.name + '</li>'
//    })
//    .join('')
//   + '</ul>'
// document.getElementById('details').innerHTML = branchesList;
//}
