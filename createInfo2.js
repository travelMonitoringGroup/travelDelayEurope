export function createInfo(importedInfo){
    let ii = 0;
    importedInfo.forEach((element) => {
        if(ii%25==0){
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
        ii++;
        let flagRoute; let trainIconRoute;
        if (element.motherland === "PL"){
            flagRoute = "/images/flagPL.png";
        }
        if(element.trainNumber.includes("IC" || element.trainNumber.includes("EIC") || element.trainNumber.includes("TLK"))){
            trainIconRoute = "/images/ICpic2.png"
        } else{
            trainIconRoute = "/images/Rpic2.png"
        }
        let czyZawieraStacjeWyszukiwania = false;
        element.midStations.forEach((el)=>{
            if(el.includes(element.searchLocation)){
                czyZawieraStacjeWyszukiwania = true;
            }
        });
        if(!czyZawieraStacjeWyszukiwania){element.destination = " Train no. is not unique in EU"}
        delayedDiv.innerHTML = `
            
        <div></div>
            <div>
                <p class="p-lebel-style"> Time + delay: </p>
                <p class="p-style">${element.regularTime + " + "+element.delayTime.match(/\d+/)[0]+"min"}</p>
            </div>

            <div>
                <p class="p-lebel-style"> Station: </p>
                <p class="p-style">${element.searchLocation}</p>
            </div>

            <div>
                <image class="miniaturka-flag" src=${flagRoute}>
            </div>

            <div></div>

            <div></div>

            <div>
                <p class="p-lebel-style"> Train no:</p>
                <p class="p-style"> ${element.trainNumber}</p>
            </div>

            <div>
                <p class="p-lebel-style"> Destination:</p>
                <p class="p-style"> ${element.destination}</p> 
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
    });
}
