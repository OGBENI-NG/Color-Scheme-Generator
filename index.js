const selectOptionColor = document.querySelector('#select-color-option')
const getColorBtn = document.querySelector('#get-color-btn')
const colorContainer = document.querySelector('#color-container')
const color = document.querySelector('#color')

const renderMenu = ()=> {
    let colorHtml = ''
    const option = selectOptionColor.options[selectOptionColor.selectedIndex].value
    fetch(
        `https://www.thecolorapi.com/scheme?hex=${color.value.slice(1)}&mode=${option}`
    )
    .then(res => res.json())
    .then(data => {
        const colors = data.colors
        colors.forEach(colorEl => {
            const newColor = colorEl.hex.value

            colorHtml += `
                <div class="hex-container tooltip">
                    <span class="tooltiptext hid" data-tooltip="">Copy
                        <span class="hex-color">${newColor}</span>
                    </span>
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
                if(navigator.clipboard.writeText(el.dataset['color'])) {
                    const tooltipHtml = document.querySelectorAll('[data-tooltip]')
                        tooltipHtml.forEach( (hex) => {
                        hex.textContent = `Copied`
                        setTimeout(() => {
                            hex.innerHTML = `Copy <span class="hex-color">${el.dataset["color"]}</span>`
                    }, 1000)})
                }
            })
        )

    })
}


getColorBtn.addEventListener('click', () => {
    renderMenu()
})
// first run
renderMenu()



