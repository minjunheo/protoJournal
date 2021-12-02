
import * as html from './htmlSet.js';
import * as svg from './svgSet.js';

import { CtxMenu } from './contextMenu.js';

import {Target} from './specific.js';

import * as actions from './actions.js';

import * as textStuff from "./textBox.js";

//import * as anime from "../libraries/anime.js"



const specific = new Target("specific","primed")

const mainMenu = new CtxMenu("lightgreen")
.addContext("create TextBox","createText")
.addContext("header List","headerList")

const shell = html.createHtmlElm("div");


// const parentTexter = new html.ParentDiv();
// const texter = new textStuff.TextBox(200,200);
// const textHeader = new textStuff.Header("h3");
// specific Stuff


// establish the main Menu
window.addEventListener("keydown",(e)=>{
    if(e.key === "Alt"){
        
        e.preventDefault();
        specific.setQuery(mainMenu.menu);

        mainMenu.menu.style.left = window.scrollX + 15;
        mainMenu.menu.style.top = window.scrollY + 200;
        mainMenu.menu.style.display = "block";
    }
});

window.addEventListener("keyup",(e)=>{
    if(e.key === "Alt"){
        mainMenu.menu.style.display = "none";
    }
});

window.addEventListener("keydown",(e)=>{
    if(e.key === "Alt"){
        e.preventDefault();
    }
})

window.addEventListener("keydown",
actions.moveThruKeyPress(mainMenu.menu,"ArrowUp","ArrowDown","ArrowRight","ArrowLeft")
.action)


mainMenu.moveContext("w","s")
.hoverContext();

mainMenu.enterContext("createText",()=>{
    shell.style.left = html.convertHtmlNum(mainMenu.menu,"left") + 50;
    shell.style.top = html.convertHtmlNum(mainMenu.menu,"top");
    shell.style.display = "block";
    specific.setQuery(shell);
})

mainMenu.enterContext("headerList",()=>{

})






html.sizeHtml(shell,200,200);
html.moveHtml(shell,200,200);
html.setBorder(shell);
shell.style.display = "none";

specific.setQuery(shell)
.clickTarget(shell)

const moveShell = actions.moveThruKeyPress(shell,"w","s","d","a");

const hideShell = actions.actionKeyPress("Delete",()=>{
    shell.style.display = "none"
});
const transitionShell = actions.actionKeyPress("Enter",()=>{
    actions.opacityAction(shell,0,()=>{
        shell.style.opacity = 1;
        shell.style.display = "none";
        //actions.opacityAction(texter.cloneText(html.convertHtmlNum(shell,"left"),html.convertHtmlNum(shell,"top")),[0,1]);
    })
    .then(()=>{
        const texter = new textStuff.textPackage("h2");
        texter.setUp(html.convertHtmlNum(shell,"left"),html.convertHtmlNum(shell,"top")
        ,html.convertHtmlNum(shell,"width"),html.convertHtmlNum(shell,"height"))
        .convertHeading()
        .resizeBox();

        texter.parent.style.visibility = "hidden";

        actions.animateBox().animateElm(texter.parent,()=>{
            texter.parent.style.visibility = "visible";

            [texter.textBox,texter.search,texter.submit,texter.searchBorder].forEach(ele => ele.style.visibility = "hidden")
        })
        .then(setTimeout(()=>{
            actions.animateBox().animateManual(texter.textBox,
                html.convertHtmlNum(texter.parent,"left") + html.convertHtmlNum(texter.textBox,"left"),
                html.convertHtmlNum(texter.parent,"top") + html.convertHtmlNum(texter.textBox,"top"),
                texter.textBox.offsetWidth,
                texter.textBox.offsetHeight,
                ()=>{
                    texter.textBox.style.visibility = "visible"
                }
            )
            .then(()=>{
                actions.animateBox().animateManual(texter.searchBorder,
                    html.convertHtmlNum(texter.parent,"left") + html.convertHtmlNum(texter.searchBorder,"left"),
                    html.convertHtmlNum(texter.parent,"top") + html.convertHtmlNum(texter.searchBorder,"top"),
                    texter.searchBorder.offsetWidth,
                    texter.searchBorder.offsetHeight,
                    ()=>{
                        texter.searchBorder.style.visibility = "visible"
                    }
                )
            })
            .then(()=>{
                //[texter.search,texter.submit].forEach(ele=>ele.style.visibility = "visible")

                new Promise((resolve)=>{
                    let func = ()=>{
                            texter.search.style.visibility = "visible";
                            texter.submit.style.visibility = "visible";
                        
                    }
                    resolve(func());
                })
                .then(()=>{
                    actions.opacityAction([texter.search,texter.submit],[0,1],()=>{
                        texter.search.focus();
                    })
                })
                
                
            })

            
        },1000))
        .then(setTimeout(()=>{
            specific.setQuery(texter.parent)
            .clickTarget(texter.parent)
            .clickChildren(texter.parent)
        },2500))
        


    })

});

specific.queryAction(shell,window,"keydown",moveShell.action)
.queryAction(shell,window,"keydown",hideShell.action)
 .queryAction(shell,window,"keydown",transitionShell.action)


//  textHeader.setUpSearchBar(200,200,200);
//  textHeader.activateSearch();




        
        
       




  

// function generic1 (){
//     console.log(this.yuh);
    

// }

// let generic2 = generic1.bind({yuh:"yuhyiiuh"});
 








