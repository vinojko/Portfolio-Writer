//SimpleMDE
var simplemde = new SimpleMDE({
   element: document.getElementById("mdeditor"),
   autosave: {
		enabled: true,
		uniqueId: "MyUniqueID",
		delay: 10,
	},
  
  spellChecker: false,
  status: ["autosave", "lines", "words", "cursor"]
  
   });
   

//Collapse all sections
   jQuery('.btn-block').click( function(e) {
    jQuery('.collapse').collapse('hide');
});

function HandleImage(){
  let fileReader = new FileReader(); 
  fileReader.onload = ()=>{
    let fileURL = fileReader.result;
    img = fileURL;
    let imgTag = `![image info](./assets/images/${fileURL})"`;
    simplemde.value(simplemde.value() + imgTag);

  }
}

simplemde.gui.toolbar.remove();
simplemde.toolbar.push({
  name: 'metadata',
  className: 'fa fa-upload',
  title: 'Metadata'
})
simplemde.createToolbar();



//Eel

var img = " ";

//Publication
document.getElementById('pubButton').addEventListener('click', async() => {
    var name = document.getElementById('namepub').value;
    var authors = document.getElementById('authorspub').value;
    var publisher = document.getElementById('publisherpub').value;
    var date = document.getElementById('datepub').value;
    var link = document.getElementById('linkpub').value;

    await eel.send_publication(name, authors, publisher, date, link);
})

//Poster
document.getElementById('posterButton').addEventListener('click', async() => {
    var name = document.getElementById('nameposter').value;
    var date = document.getElementById('dateposter').value;

    // Img je ze definirano


    await eel.send_poster(name, file.name, img, date);
})

//Project
document.getElementById('projectButton').addEventListener('click', async() => {
  var name = document.getElementById('nameproject').value;
  var date = document.getElementById('dateproject').value;
  var description = document.getElementById('description').value;
  var content = simplemde.value();
  // Img je ze definirano
  if (file2 == undefined){
    await eel.send_project(name, 'null', 'null', date, description, content);
  }else{
    await eel.send_project(name, file2.name, img, date, description, content);
  }
  
})


//Drag and drop
const dropArea = document.querySelector(".drag-image"),
dragText = dropArea.querySelector("h6"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file; 

button.onclick = ()=>{
  input.click(); 
}

input.addEventListener("change", function(){
 
  file = this.files[0];
  dropArea.classList.add("active");
  viewfile();
});

dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Spusti datoteko";
});


dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
}); 

dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); 
   
  file = event.dataTransfer.files[0];
  viewfile(); 
});

function viewfile(){
  let fileType = file.type; 
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if (validExtensions.includes(fileType)){ 
    let fileReader = new FileReader(); 
    fileReader.onload = ()=>{
      let fileURL = fileReader.result;
      img = fileURL;
      console.log(file.name);
       let imgTag = `<img src="${fileURL}" alt="image">`;
      dropArea.innerHTML = imgTag; 
    }
    fileReader.readAsDataURL(file);
  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

//Drag and drop2
const dropArea2 = document.querySelector(".drag-image2"),
dragText2= dropArea2.querySelector("h6"),
button2 = dropArea2.querySelector("button"),
input2 = dropArea2.querySelector("input");
let file2; 

button2.onclick = ()=>{
  input2.click(); 
}

input2.addEventListener("change", function(){
 
  file2 = this.files[0];
  dropArea2.classList.add("active");
  viewfile2();
});

dropArea2.addEventListener("dragover", (event)=>{
  event.preventDefault();
  dropArea2.classList.add("active");
  dragText2.textContent = "Release to Upload File";
});


dropArea2.addEventListener("dragleave", ()=>{
  dropArea2.classList.remove("active");
  dragText2.textContent = "Drag & Drop to Upload File";
}); 

dropArea2.addEventListener("drop", (event)=>{
  event.preventDefault(); 
   
  file2 = event.dataTransfer.files[0];
  viewfile2(); 
});

function viewfile2(){
  let fileType = file2.type; 
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if(validExtensions.includes(fileType)){ 
    let fileReader = new FileReader(); 
    fileReader.onload = ()=>{
      let fileURL = fileReader.result;
      img = fileURL;
      console.log(file2.name);
       let imgTag = `<img src="${fileURL}" alt="image">`;
      dropArea2.innerHTML = imgTag; 
    }
    fileReader.readAsDataURL(file2);
  }else{
    alert("This is not an Image File!");
    dropArea2.classList.remove("active");
    dragText2.textContent = "Drag & Drop to Upload File";
  }
}

//DragDrop za SimpleMDE
const dropAreaMD = document.querySelector(".drag-md");
let inputMD = dropAreaMD.querySelector("input");
let file3;

dropAreaMD.addEventListener("drop", (event)=>{
  event.preventDefault(); 
   
  file3 = event.dataTransfer.files[0];
  console.log(file3.name);
  viewfileMD();
  simplemde.value(simplemde.value() + `![${file3.name}](/assets/images/${file3.name})`)


});

function viewfileMD(){
  let fileType = file3.type; 
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if (validExtensions.includes(fileType)){ 
    let fileReader = new FileReader(); 
    fileReader.onload = ()=>{
      let fileURL = fileReader.result;
      let imgMD = fileURL;
      console.log(imgMD);
      send_image(file3.name, imgMD);      
    }
    fileReader.readAsDataURL(file3);
  }else{
    console.log("Napačna datoteka");
  }
}

async function send_image(filename, data) {

  await eel.save_image(filename, data);
}
