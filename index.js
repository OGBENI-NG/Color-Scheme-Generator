const selectOptionColor = document.querySelector('#select-color-option')
const getColorBtn = document.querySelector('#get-color-btn')
const colorContainer = document.querySelector('#color-container')
const color = document.querySelector('#color')
const input = document.querySelector("input.copyfrom"); 

const renderMenu = ()=> {
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
                    <span class="tooltiptext" data-tooltip="${newColor}">${newColor}</span>
                    <div class="rectangle-shape color-one" 
                        id="rectangle-shape" style="background:${newColor}">
                    </div>
                    <p class="hex" data-color="${newColor}">${newColor}</p>
                </div>
                
            `
            return newColor
        })
        colorContainer.innerHTML = colorHtml

        document.querySelectorAll('[data-color]')
            .forEach(el=> el.addEventListener('click',() => {
                //navigator.clipboard.writeText(el.dataset['color'])
                const copyText = 'copied'
                const copiedEl = document.querySelector(`[data-tooltip="${el.dataset['color']}"]`)
                input.value=el.dataset['color']
                copytext()
                copiedEl.textContent = copyText
                setTimeout(()=> copiedEl.textContent = ``, 1000, copiedEl)
            })
            )    
        })
}


getColorBtn.addEventListener('click', () => {
    renderMenu()    
})

// first run
renderMenu()

function copytext() {
    //var selectedValues = getSelectValues(this); // get selected values
    //input.value = test.join(','); // join them in a comma separated list
    input.select(); // select offscreen inputs text
    document.execCommand("copy"); // copy it
    //this.focus(); // focus back on original, so we don't see any glitches
} 

