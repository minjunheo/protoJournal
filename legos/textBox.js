import {ParentDiv,createHtmlElm,sizeHtml, setBorder,moveHtml,cloneHtmlElm,convertHtmlNum } from "./htmlSet.js"

import {opacityAction} from "./actions.js"




export class DataList{
    constructor(){

        this.list = createHtmlElm("datalist");
        this.parent = createHtmlElm("div");
        this.search = createHtmlElm("input");
        this.submit = createHtmlElm("button");
        

        //[this.listSearch,this.listSubmit].forEach(ele => ele.style.display = "none");

        

    }
    makeList =(left,top)=>{

        
        // this.listSearch.style.border = "solid red 10px"
        this.listSubmit.innerHTML = "submit";

        this.listSearch.style.left = left;
        this.listSearch.style.top = top;

        moveHtml(this.listSubmit,
            left + 185,
            top
        );

        

        let option = document.createElement("option");
        this.list.setAttribute("id","lister");
        option.value = "babe";
        option.innerHTML = "yuh";
        this.listSearch.setAttribute("list",this.list.id);
        this.listSearch.setAttribute("autocomplete","on");
        this.list.appendChild(option);

        return this;

    }

    setList(left,top){
        this.listSearch.style.left = left;
        this.listSearch.style.top = top;
        this.listSearch.focus();

    }
    appendOption = (topic)=>{
        let option = document.createElement("option");

        option.value = topic;

        this.list.appendChild(option);

    }
    activateDataList(action){
        switchBorder(this.listSearch,"lavender","indigo","Control",4);

        window.addEventListener("keydown",(e)=>{
            if(e.key === "Enter"){
                if(this.listSearch.style.borderColor === "indigo" && this.listSearch.style.display === "block"){
                    action()
                }
            }
        });
        this.listSubmit.addEventListener("click",()=>{
            action();
            
        })
    }
}


export class textPackage{
    constructor(heading){
        this.parent = createHtmlElm("div");
        this.textBox = createHtmlElm("textarea");
        this.heading = createHtmlElm(heading);
        this.submit = createHtmlElm("button");
        this.search = createHtmlElm("input");
        this.searchBorder = createHtmlElm("div");

        
        

    }


    setUp = (left,top,width,height)=>{

        [this.textBox,this.heading,this.submit,this.search,this.searchBorder].forEach(ele=>this.parent.appendChild(ele));


        
        
        
        moveHtml(this.parent,left,top)
        
        

        moveHtml(this.search,10,15);

        sizeHtml(this.search,width)

        this.submit.innerHTML = "submit"
        moveHtml(this.submit,
        convertHtmlNum(this.search,"left") + this.search.offsetWidth + 10,
        convertHtmlNum(this.search,"top"));
        
        setBorder(this.searchBorder);
        moveHtml(this.searchBorder,
            convertHtmlNum(this.search,"left") - 5,
            convertHtmlNum(this.search,"top") - 10
        );

        sizeHtml(this.searchBorder,
            this.search.offsetWidth + this.submit.offsetWidth + 15,
            this.search.offsetHeight + 10
        );

        moveHtml(this.textBox,
            convertHtmlNum(this.searchBorder,"left"),
            convertHtmlNum(this.searchBorder,"top") + convertHtmlNum(this.searchBorder,"height") + 10
        );

        

        sizeHtml(this.textBox,
            convertHtmlNum(this.searchBorder,"width") + 10,
            height
            )

        sizeHtml(this.parent,
            convertHtmlNum(this.searchBorder,"width") + 20,
            convertHtmlNum(this.searchBorder,"height") + convertHtmlNum(this.textBox,"height") + 25
        );


        setBorder(this.textBox);
        setBorder(this.parent);

         this.search.style.zIndex = 3;
         this.submit.style.zIndex = 3;




        
        return this;
    }

    convertHeading = (action)=>{


        let activate = ()=>{
            // if(document.activeElement === this.search){

            
                this.heading.innerHTML = this.search.value;
                //this.heading.style.display = "block";
                moveHtml(this.heading,convertHtmlNum(this.search,"left"),convertHtmlNum(this.heading,"top") -10)

                opacityAction([this.search,this.submit],0)
                .then(()=>{
                    this.submit.remove();
                    this.search.remove();
                    anime ({
                        targets: this.searchBorder,
                        duration: 700,
                        easing: "linear",
                        width: this.heading.offsetWidth + 15,
                    })
                    // .add({
                    //     targets: this.heading,
                    //     opacity: [0,1]
                    // })
                })
                .then(()=>{
                    this.textBox.focus()
                })
                //.then(opacityAction(this.heading,[0,1]))
                
            }
        //}

        window.addEventListener("keydown",(e)=>{
            if(e.key === "Enter"){
                if(document.activeElement === this.search)
                activate()
            }
        });
        this.submit.addEventListener("click",activate)

        
        

        if(action){
            action()
        }

        return this;


    }

    resizeBox = ()=>{


        let width = convertHtmlNum(this.parent,"width")/convertHtmlNum(this.textBox,"width");

        let height = convertHtmlNum(this.parent,"height")/convertHtmlNum(this.textBox,"height");

        this.textBox.addEventListener("mouseup",()=>{
                this.parent.style.width = convertHtmlNum(this.textBox,"width") * width;
                this.parent.style.height = convertHtmlNum(this.textBox,"height") * height
            
            // this.parent.style.width = convertHtmlNum(this.parent,"width") +  (convertHtmlNum(this.textBox,"width") - ogWidth);
            // this.parent.style.height = convertHtmlNum(this.parent,"height") + (convertHtmlNum(this.textBox,"height") - ogHeight);
        })
    }
}
