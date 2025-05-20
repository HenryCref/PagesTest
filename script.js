const sidebar = document.getElementById('sidebar')
const box = document.getElementById('box')
const ref = document.getElementsByClassName('ref')[0]
const container = document.getElementById("buttons");
const Ubutton = document.getElementById("unfullscreen")
if (!("sites" in localStorage)) {
  localStorage.setItem("sites","[]")
}
document.getElementById("url").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        document.getElementById('iframe').src = e.target.value;
    }
});
function fullscreen () {
	sidebar.style.width = "0%";
	sidebar.style.padding = "0px";
	box.style.left = "0px";
	Ubutton.style.visibility = "visible"
}
function unfullscreen() {
	sidebar.style.width = "20%";
	sidebar.style.padding = "10px";
	box.style.left = "20%";
	Ubutton.style.visibility = "hidden"
}
function search(){
  let Input = document.getElementById('url').value;
  document.getElementById('iframe').src = Input;
}
function openPage(elem){
  document.getElementById('iframe').src = elem.id;
}
function saveNewWebsite(url){
  let prev = JSON.parse(localStorage.getItem("sites"));
  let name = prompt("name it");
  prev = [...prev, [url, name]];
  localStorage.setItem("sites",JSON.stringify(prev));
  genButton([url, name])
}
function genButton(item) {
    const button = document.createElement('button');
    button.textContent = item[1];
    button.setAttribute("onclick","openPage(this)");
    button.setAttribute("id",item[0]);
    button.setAttribute("class",ref.id + " SButton");
    const Rbutton = document.createElement('button');
    Rbutton.textContent = "remove";
    Rbutton.setAttribute("class",ref.id + " Rbutton");
    Rbutton.setAttribute("onclick","removeC(this)");
    let newNum = parseInt(ref.id) + 1;
    ref.setAttribute("id", newNum.toString());
    container.appendChild(button);
    container.appendChild(Rbutton);
}
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    var a = document.createElement("a"),
    url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0); 
}
function removeC(elem) {
  let c = elem.className;
  let objs = document.getElementsByClassName(parseInt(c));
  let button = objs[0];
  let prev = JSON.parse(localStorage.getItem("sites"));
  let ind = findArrayIndex(prev, button.innerHTML);
  prev.splice(ind,1);
  localStorage.setItem("sites",JSON.stringify(prev));
  objs[0].remove();
  objs[0].remove();
}
function findArrayIndex(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][1] == target) {
        return i;
    }
  }
  return null;
}
JSON.parse(localStorage.getItem("sites")).forEach(genButton)
