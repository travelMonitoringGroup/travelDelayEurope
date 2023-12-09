export async function importData(url){
    let importedInfo;
    const response = await fetch(url)
    const rawImportedInfo = await response.json()
        .then ((result) => {
            importedInfo = result;
        })
    return importedInfo;
    
}
