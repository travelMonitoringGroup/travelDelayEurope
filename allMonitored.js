export function createAllMonitoredInfo(importedInfo){
    let ii = 0;
    console.log("tralalalala");
    console.log(importedInfo);
    importedInfo.forEach((element) => {

        if(ii==0){
            const adDiv = document.createElement("div");
            adDiv.setAttribute("class", "add");
            adDiv.innerHTML = `
            <div class="add"></div>
            `;
            document.getElementById("info-holder").appendChild(adDiv);
        }
        ii++;

        const delayedDiv = document.createElement("div");
        delayedDiv.setAttribute("class", "info-module-holder");
        let flagRoute; let trainIconRoute;
        if (element.motherland === "PL"){
            flagRoute = "images/flagPL.png";
        }
        if(element.trainNumber.includes("IC" || element.trainNumber.includes("EIC") || element.trainNumber.includes("TLK"))){
            trainIconRoute = "images/ICpic2.png"
        } else{
            trainIconRoute = "images/Rpic2.png"
        }
        delayedDiv.innerHTML = `
            
        <div></div>
            <div>
                <p class="p-lebel-style"> Time: </p>
                <p class="p-style">${element.regularTime}</p>
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
                <p class="p-lebel-style"> Date:</p>
                <p class="p-style"> ${element.searchDate}</p> 
            </div>

            <div>
                <image class="miniaturka-train" src=${trainIconRoute}>
            </div>

            <div></div>
            
            `; 
            document.getElementById("info-holder").appendChild(delayedDiv);
    });
}
