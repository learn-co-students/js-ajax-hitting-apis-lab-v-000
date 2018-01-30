function getRepositories() {
  const name = document.getElementById("username").value
  const address = "https://api.github.com/users/" + name + "/repos"
  const request = new XMLHttpRequest()

  request.addEventListener("load", displayRepositories)
  request.open("GET",address)
  request.send()
  return false;
};


function displayRepositories() {
	const repos = JSON.parse(this.responseText)
	const repoList = repos.map(function(repo) {
		const listUserName = repo.owner.login
		const listRepoName = repo.name
			return (` 
				<ul>
					<li>
						<h4>${repo.name}</h4>
						<a href = "${repo.html_url}">${repo.html_url}</a><br>
						<a href="#" onclick="getCommits(this)">Get Commits</a><br>
						<a href="#" onclick="getBranches(this)">Get Branches</a><br>
					</li>
				</ul>`
			);
	}).join("")
		document.getElementById("repositories").innerHTML = repoList
};

function getCommits(selectCommit) {
	const repoName = selectCommit.dataset.repository
	const address = "https://api.github.com/repos/" + selectCommit.dataset.username + "/" + repoName + "/commits" 
	const request = new XMLHttpRequest()

	request.addEventListener("load", displayCommits)
	request.open("GET", address)
	request.send()
	return false;
};

function displayCommits(){
	const commits = JSON.parse(this.responseText)
	
	const commitsList = commits.map(function(commit) {
		return (`
				<ul>
					<li>${commit.commit.author.name}</li>
					<li>${commit.author.login}</li>
					<li>${commit.commit.message}</li>
				</ul>`
				);
		});
	document.getElementById("details").innerHTML = commitsList
};


function getBranches(selectBranch) {
	const repoName = selectBranch.dataset.repository
	const  address = "https://api.github.com/repos/" + selectBranch.dataset.username + "/" + repoName + "/branches"
	const request = new XMLHttpRequest()

	request.addEventListener("load", displayBranches)
	request.open("GET", address)
	request.send()
	return false;
};

function displayBranches() {
	const branches = JSON.parse(this.responseText)

	const branchesList = branches.map(function(branch){
		return (`
			<ul>
				<li> ${branch.name}</li>
			</ul>`
			);
	});
	document.getElementById("details").innerHTML = branchesList
};