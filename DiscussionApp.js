var quesCol = [];
var responde = [];
var id=0;
function addQuestion()
{
    document.getElementById("quesList").innerHTML="";
    var sub = document.getElementById("subject");
    var question = document.getElementById("ques");
    console.log(sub.value!=="");
    if((sub.value!==undefined && sub.value!=="" && sub.value!==NaN && sub.value!==null) && (question.value!==undefined && question.value!=="" && question.value!=NaN && question.value!=null))
    {
        var a = {};
        a.subject = sub.value;
        a.question = question.value;
        a.id=id;
        quesCol.push(a);
        id++;
    }
    showQues();
}
function srchFxn()
{
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchQues");
    filter = input.value.toUpperCase();
    ul = document.getElementById("quesList");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("div")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
function showQues()
{
    document.getElementById("quesList").innerHTML="";
    for(i=0;i<quesCol.length;i++)
    {
        var ele = document.createElement("li");
        ele.className = "valBox";
        ele.onclick = function()
        {
            var child = this.childNodes;
            var subject = child[0].innerHTML;
            var question = child[1].innerHTML;
            var mEle = document.createElement("div");
            mEle.class="ResponseContainer";
            document.getElementsByClassName("rightContent")[0].innerHTML="";
            document.getElementsByClassName("rightContent")[0].appendChild(mEle);
            var mainDiv = document.getElementsByClassName("ResponseConatiner")[0];
            var tempDiv = document.createElement("div");
            tempDiv.className = "ResponseQuestion";
            mEle.appendChild(tempDiv);
            var getDiv = document.getElementsByClassName("ResponseQuestion")[0];
            var temp = document.createElement("p");
            temp.innerHTML="Question";
            getDiv.appendChild(temp);
            tempDiv = document.createElement("div");
            tempDiv.className = "Qbox";
            mEle.appendChild(tempDiv);
            getDiv = document.getElementsByClassName("Qbox")[0];
            tempDiv = document.createElement("div");
            tempDiv.className="Qbox-sub";
            tempDiv.innerHTML = `${subject}`;
            getDiv.appendChild(tempDiv);
            tempDiv = document.createElement("div");
            tempDiv.className="Qbox-Ques";
            tempDiv.innerHTML = `${question}`;
            getDiv.appendChild(tempDiv);
            var b = document.createElement("button");
            b.innerHTML="resolve";
            b.className="submitBtnStyle";
            b.onclick = function()
            {
                var sub = document.getElementsByClassName("Qbox-sub")[0].innerHTML;
                var qtn = document.getElementsByClassName("Qbox-Ques")[0].innerHTML;
                console.log(sub,qtn);
                for(i=0;i<responde.length;i++)
                {
                    if(responde.question===qtn)
                    {
                        responde.splice(i);
                        i--;
                    }
                }
                for(i=0;i<quesCol.length;i++)
                {
                    if(quesCol[i].subject===sub && quesCol[i].question===qtn)
                    {
                        quesCol.splice(i);
                        i--;
                    }
                }
                showQues();
                quesForm();
                
            }
            b.id="resolveBtn";
            mEle.appendChild(b);
            mEle.appendChild(document.createElement("br"));
            tempDiv = document.createElement("div");
            tempDiv.className = "ResponseQuestion";
            mEle.appendChild(tempDiv);
            getDiv = document.getElementsByClassName("ResponseQuestion")[1];
            temp = document.createElement("p");
            temp.innerHTML="Response";
            getDiv.appendChild(temp);
            temp = document.createElement("ul");
            temp.id ="respList"
            mEle.appendChild(temp);
            tempDiv = document.createElement("div");
            tempDiv.className = "sub";
            mEle.appendChild(tempDiv);
            temp = document.createElement("input");
            temp.placeholder = "Name";
            temp.id="ressubject";
            temp.type="text";
            temp.className="subjectStyle";
            getDiv = document.getElementsByClassName("sub")[0];
            getDiv.appendChild(temp);
            tempDiv = document.createElement("div");
            tempDiv.className = "textAreaQues";
            mEle.appendChild(tempDiv);
            temp = document.createElement("textarea");
            temp.placeholder = "Answer";
            temp.id="resques";
            temp.className="quesStyle";
            getDiv = document.getElementsByClassName("textAreaQues")[0];
            getDiv.appendChild(temp);
            temp = document.createElement("button");
            temp.innerHTML="Submit";
            temp.className="submitBtnStyle";
            temp.onclick = function()
            {
                document.getElementById("quesList").innerHTML="";
                var sub = document.getElementsByClassName("Qbox-sub")[0].innerHTML;
                var qtn = document.getElementsByClassName("Qbox-Ques")[0].innerHTML;
                var name = document.getElementById("ressubject").value;
                var ans = document.getElementById("resques").value;
                
                if((name!==undefined && name!=="" && name!==NaN && name!==null) && (ans!==undefined && ans!=="" && ans!=NaN && ans!=null))
                {
                    var a={};
                    a.subject=sub;
                    a.question = qtn;
                    a.name = name;
                    a.ans = ans;
                    responde.push(a);
                }   
                showQues();
                showResponse(sub,qtn);
            }
            temp.id="reSubmitBtn";
            mEle.appendChild(temp);
            showResponse(subject,question);
            showQues();
            
        }
        ele.innerHTML=`<div class="valSub">${quesCol[i].subject}</div><div class="valQues">${quesCol[i].question}</div>`;
        document.getElementById("quesList").appendChild(ele);
        //document.getElementsByClassName("High");

    }
}
function showResponse(sub,ques)
{
        var ct =0;
        var addEle = document.getElementById("respList");
        addEle.innerHTML="";
        for( i=0;i<responde.length;i++)
        {
            if(responde[i].question===ques && responde[i].subject===sub)
            {
                var mainel = document.createElement("li");
                mainel.className = "Rbox";
                addEle.appendChild(mainel);
                addEle = document.getElementsByClassName("Rbox")[ct];
                console.log(addEle);
                tempDiv = document.createElement("div");
                tempDiv.className="Rbox-name";
                tempDiv.innerHTML = `${responde[i].name}`;
                addEle.appendChild(tempDiv);

                tempDiv = document.createElement("div");
                tempDiv.className="Rbox-ans";
                tempDiv.innerHTML = `${responde[i].ans}`;
                addEle.appendChild(tempDiv);
                ct++;
                console.log(ct);
            }
        }
    
}
function quesForm()
{
    var qf = `
    <div class="titleDoubt"><p>Welcome to Discussion Portal !</p></div>
                <p class="subTitle">Enter The subject and question to get Started</p>
                <div class="sub"><input type="text" id="subject" class="subjectStyle"></div>
                <div class="textAreaQues">
                    <textarea id="ques" class="quesStyle"></textarea>
                </div>
                <button id="submitBtn" onclick="addQuestion()" class="submitBtnStyle">submit</button>
        </div>`;
    document.getElementsByClassName("rightContent")[0].innerHTML = qf;
}