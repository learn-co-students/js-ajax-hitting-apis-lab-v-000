// function getRepositories() {
// 	const username = document.getElementById("username").value
// 	const req = new XMLHttpRequest()
// 	console.log(`https://api.github.com/users/${username}/repos`)
// 	debugger
// 	req.addEventListener("load", displayRepositories)
// 	req.open("GET", `https://api.github.com/users/${username}/repos`)
// 	req.send()
// 	return false
// }

function getRepositories() {
  const name = document.getElementById("username").value
  const rootURL = "https://api.github.com"
  const uri = rootURL + "/users/" + name + "/repos"
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayRepositories)
  xhr.open("GET", uri)
  xhr.send()
  return false;
}

function displayRepositories() {
	// debugger
	console.log("Got here!")
}