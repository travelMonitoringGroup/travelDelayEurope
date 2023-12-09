export function createMainInfo(importedInfo, liczbaInfo){

    /* sortuje po wartościach opóźnienia */
    function compareByDelayTime(a,b){
        return b.delayTime.match(/\d+/)[0] - a.delayTime.match(/\d+/)[0];
    }
    importedInfo.sort(compareByDelayTime);

    let ii;
    for(ii=0;ii<liczbaInfo;ii++){

        if(ii%10==0){
            const adDiv = document.createElement("div");
            adDiv.setAttribute("class", "add");
            adDiv.innerHTML = `
            <div class="add"></div>
            `;
            document.getElementById("info-holder").appendChild(adDiv);
        }

        const delayedDiv = document.createElement("div");
        delayedDiv.setAttribute("class", "info-module-holder");
        delayedDiv.setAttribute("isClicked", "no");
        delayedDiv.setAttribute("id", ii);
        let flagRoute; let trainIconRoute;
        if (importedInfo[ii].motherland === "PL"){
            flagRoute = "/images/flagPL.png";
        }
        if(importedInfo[ii].trainNumber.includes("IC" || importedInfo[ii].trainNumber.includes("EIC") ||importedInfo[ii].trainNumber.includes("TLK"))){
            trainIconRoute = "/images/ICpic2.png"
        } else{
            trainIconRoute = "/images/Rpic2.png"
        }
        let czyZawieraStacjeWyszukiwania = false;
        importedInfo[ii].midStations.forEach((el)=>{
            if(el.includes(importedInfo[ii].searchLocation)){
                czyZawieraStacjeWyszukiwania = true;
            }
        });
        if(!czyZawieraStacjeWyszukiwania){importedInfo[ii].destination = " Train no. is not unique in EU"}
        delayedDiv.innerHTML = `
        <div></div>
            <div>
                <p class="p-lebel-style"> Time + delay: </p>
                <p class="p-style">${importedInfo[ii].regularTime + " + "+importedInfo[ii].delayTime.match(/\d+/)[0]+"min"}</p>
            </div>

            <div>
                <p class="p-lebel-style"> Station: </p>
                <p class="p-style">${importedInfo[ii].searchLocation}</p>
            </div>

            <div>
                <image class="miniaturka-flag" src=${flagRoute}>
            </div>

            <div></div>

            <div></div>

            <div>
                <p class="p-lebel-style"> Train no:</p>
                <p class="p-style"> ${importedInfo[ii].trainNumber}</p>
            </div>

            <div>
                <p class="p-lebel-style"> Destination:</p>
                <p class="p-style"> ${importedInfo[ii].destination}</p> 
            </div>

            <div>
                <image class="miniaturka-train" src=${trainIconRoute}>
            </div>

            <div></div>
            
            `; 

            document.getElementById("info-holder").appendChild(delayedDiv);
            delayedDiv.addEventListener('click',(e)=>{
                if(delayedDiv.getAttribute("isClicked")==="no"){
                    const routeDiv = document.createElement("div");
                    routeDiv.setAttribute("id", delayedDiv.getAttribute("id")+"rD");
                    let textRoute = "Train route";
                    let labelStyle = "p-lebel-style"
                    let routeToPrint = importedInfo[delayedDiv.getAttribute("id")].midStations.toString();
                    routeToPrint = routeToPrint.replaceAll(',', ', ');
                    if(!czyZawieraStacjeWyszukiwania){
                        textRoute = "Train number is not unique in EU. Make sure if you are searching proper train";
                        labelStyle = "p-lebel-style-bold";
                    };
                    routeDiv.setAttribute("class", "info-module-route");
                    routeDiv.innerHTML = `
                    <div></div>
                    <div> 
                        <p class="p-lebel-style"> Date </p>
                    </div>
                    <div>
                        <p class=${labelStyle}>${textRoute}</p>
                    </div>
                    <div></div>
                    <div></div>
                    <div>
                        <p class="p-style">${importedInfo[delayedDiv.getAttribute("id")].searchDate} </p>
                        </div> 
                    <div>
                        <p class="p-style">${routeToPrint} </p>
                    </div>
                    <div></div>
                    `;
                    document.getElementById("info-holder").insertBefore(routeDiv, delayedDiv,); 
                    delayedDiv.setAttribute("isClicked", "yes");
                }else{
                    document.getElementById(delayedDiv.getAttribute("id")+"rD").remove();
                    delayedDiv.setAttribute("isClicked", "no");
                }
                
            });
    };
    
}