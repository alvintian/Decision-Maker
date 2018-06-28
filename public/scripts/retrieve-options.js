var nb_items = document.getElementById("tes").innerHTML;
var nodes = document.getElementById("leftrails").querySelectorAll(".option");

function createOptions() {


  for (let i = 0; i < nb_items; i++) {
    nodes[i].setAttribute('id', 'choice' + (i + 1));
    nodes[i].setAttribute('draggable', "true");
    nodes[i].setAttribute('display', "inline");
    nodes[i].setAttribute('ondragstart', "drag(event)");
    //   nodes[i].style.backgroundColor = "white";
    nodes[i].style.width = "80%";
    nodes[i].style.height = "250px";
    //   nodes[i].style.transform = "rotate(" + rot + "deg) translate(20em) rotate(" + (-rot) + "deg)";
    nodes[i].setAttribute('title', 'noimg');
    if (document.getElementById('pic1').innerHTML.length > 0) {
      nodes[i].removeAttribute('title');
      // document.getElementById('rails').appendChild(nodes[i]);
    }
    if (i % 2 === 0) {
      document.getElementById("leftrails").appendChild(nodes[i]);
    } else {
      document.getElementById("rightrails").appendChild(nodes[i]);
    }
  }
}

createOptions();

// if (document.getElementById('pic1').innerHTML.length > 0) {
//   document.getElementById('choice1').style.backgroundImage = "url(" + '../styles/images/' + document.getElementById('pic1').innerHTML + ")";
//   document.getElementById('choice2').style.backgroundImage = "url(" + '../styles/images/' + document.getElementById('pic2').innerHTML + ")";
  // document.getElementById('choice1').style.width = "250px";
  // document.getElementById('choice1').style.height = "250px";
  //  document.getElementById('choice1').style.transform = "rotate(" + rot + "deg) translate(20em) rotate(" + (-rot) + "deg)";
  //  document.getElementById('choice2').style.transform = "rotate(" + rot + "deg) translate(20em) rotate(" + (-rot) + "deg)";
// }
if (Number(nb_items) === 2) {
  document.getElementById('boxy').style.backgroundImage = "url('../images/Thisorthat.png')";
  // document.getElementById('boxy').style.backgroundPosition = "50 % 50 %";
  document.getElementById('boxy').style.backgroundSize="100%";
} else {
  document.getElementById('boxy').style.backgroundImage = "url('../images/hynotize.png')";
  // document.getElementById('boxy').style.backgroundPosition = "50 % 50 %";
}

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
  if (document.getElementById('boxy').childNodes.length === Number(nb_items)) {
    document.getElementById('sneak').style.visibility = "visible";
  }
  if (Number(nb_items) === 2 && document.getElementById('boxy').childNodes.length === 1) {
    countScore();
    document.getElementsByTagName('form')[0].submit();
  }
}

function countScore() {
  let totInBoxy = document.getElementById('boxy').childNodes.length;
  for (let i = 0; i < totInBoxy; i++) {
    let row = document.createElement("input");
    row.setAttribute('type', 'hidden');
    row.setAttribute('name', document.getElementById('boxy').childNodes[i].innerHTML);
    row.setAttribute('value', totInBoxy - i);
    document.getElementById("hide").appendChild(row);
  }
}