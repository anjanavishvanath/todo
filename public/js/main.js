const items = document.querySelectorAll(".item span.notDone")
const itemCompleted = document.querySelectorAll(".item span.done")
const deleteItems = document.querySelectorAll("button.delete")


Array.from(items).forEach(item => {
    item.addEventListener('click', markComplete)
})

Array.from(itemCompleted).forEach(item => {
    item.addEventListener('click', markIncomplete)
})

Array.from(deleteItems).forEach(button => {
    button.addEventListener('click', deleteItem)
})

async function markComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
        
    } catch (error) {
        console.error(error)
    }
}

async function markIncomplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (error) {
        console.error(error)
    }
}

async function deleteItem(){
    const itemText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'itemToDel': itemText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (error) {
        console.error(error)
    }

}