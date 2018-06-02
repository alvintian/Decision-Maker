$(() => {

});
var nb_items = document.getElementById("tes").innerHTML;
var nodes = document.getElementById("rails").querySelectorAll(".option");

function createOptions() {
  let angle = 360 / nb_items;
  let rot = 0;
  for (let i = 0; i < nb_items; i++) {
    nodes[i].setAttribute('id', 'choice' + (i + 1));
    nodes[i].setAttribute('draggable', "true");
    nodes[i].setAttribute('ondragstart', "drag(event)");
    nodes[i].style.backgroundColor = "red";
    nodes[i].style.width = "250px";
    nodes[i].style.height = "150px";
    nodes[i].style.transform = "rotate(" + rot + "deg) translate(20em) rotate(" + (-rot) + "deg)";
    document.getElementById("rails").appendChild(nodes[i]);
    rot = rot + angle;
  }
}
createOptions();

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.id);
}

function drop(ev, el) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  el.appendChild(document.getElementById(data));
  console.log(nb_items);
}

function countScore() {
  for (let i = 0; i <= nb_items; i++) {
    let row = document.createElement("input");
    row.setAttribute('type', 'hidden');
    row.setAttribute('name', document.getElementById('choice' + (i + 1)).innerHTML);
    row.setAttribute('value', nb_items - i);
    document.getElementById("hide").appendChild(row);
  }
}