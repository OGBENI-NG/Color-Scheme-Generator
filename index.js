const selectOptionColor = document.querySelector('#select-color-option')
const getColorBtn = document.querySelector('#get-color-btn')
const colorContainer = document.querySelector('#color-container')
const color = document.querySelector('#color')


getColorBtn.addEventListener('click', () => {
    let colorHtml = ''
    const option = selectOptionColor.options[selectOptionColor.selectedIndex].value
    
    fetch(
        `https://www.thecolorapi.com/scheme?hex=${color.value.slice(1)}&mode=${option}`
    )
    .then(res => res.json())
    .then(data => {
        let colors = data.colors
        colors.forEach(colorEl => {
            const newColor = colorEl.hex.value
            
            colorHtml += `
                <div class="hex-container tooltip" id="copy-area">
                    <span class="tooltiptext" id="myTooltip">${newColor}</span>
                    <div class="rectangle-shape color-one" 
                        id="rectangle-shape" style="background:${newColor}">
                    </div>
                    <p class="hex" id="hex">${newColor}</p>
                </div>
                
            `
            return newColor
        })
        colorContainer.innerHTML = colorHtml


        document.addEventListener('click', (e) => {
            if(e.target.id === 'rectangle-shape' || e.target.id === 'hex') {
                colors.forEach(hexEl => {
                let hexValue = hexEl.hex.value
                    console.log(hexValue)
                })
        
            }
        })     
    })
    
})




















