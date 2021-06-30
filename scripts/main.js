let defaultSize=16;
let isRainbow=false;
const GRAY_CODE=`rgb(128, 128, 128)`;
const BLACK_CODE=`rgb(0, 0, 0)`;
const eraser = document.querySelector(".eraser");
const buttonSize = document.querySelector(".size-grid");
const defaultColors = document.querySelector(".colors");
const colorPicker = document.querySelector("#colorPicker");

eraser.addEventListener("click",()=>{
    isRainbow=false;
    setColors(`rgb(255, 255, 255)`);
});

colorPicker.addEventListener("change",(e)=>{
    isRainbow=false;
    setColors(e.target.value);
});


buttonSize.addEventListener("click",sizeController);
defaultColors.addEventListener("change", (e)=>{
    if(e.target.value=="gray"){
        setColors(GRAY_CODE);
        isRainbow=false;
    }else if(e.target.value=="black"){
        setColors(BLACK_CODE);
        isRainbow=false;
    }else{
        console.log(e);
        isRainbow=true;
    }
})

function sizeController(){
    defaultSize=parseInt(prompt("Enter your grid size"));
    if(isNaN(defaultSize)){
        defaultSize=parseInt(prompt("Enter your grid size (NUMBER)"));
        resetGrid();
        createGrid();
    }else if(defaultSize<2||defaultSize>=60){
        defaultSize=parseInt(prompt("Enter your grid size (range 2-60)"));
        resetGrid();
        createGrid();
    }else{
        resetGrid();
        createGrid();
    }
}

function createGrid(){
    const panel = document.querySelector(".panel");
    panel.style.cssText = `grid-template-columns: repeat(${defaultSize}, auto);grid-template-rows: repeat(${defaultSize}, auto);`;
    for(i=0;i<defaultSize*defaultSize;i++){
        let boxs = document.createElement("div");
        boxs.classList.add("boxs");
        
        panel.appendChild(boxs);
    }
    setColors(GRAY_CODE);
}

function resetGrid(){
    const panel = document.querySelector(".panel");
    const boxs = document.querySelectorAll(".panel div");
    boxs.forEach(e=>panel.removeChild(e));
}


function rainbowColor(){
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    return `rgb(${r},${g},${b})`
}

function setColors(color){
    const panelChildrens = document.querySelectorAll(".boxs");
    panelChildrens.forEach(x=>x.addEventListener("mouseover",()=>{
        if(!isRainbow){
            x.style.cssText=`background-color:${color}`;
        }else{
            x.style.cssText=`background-color:${rainbowColor()}`;
        }
        
    }));
}

createGrid();
setColors(GRAY_CODE);