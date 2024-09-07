let ulTasks = $('#ulTasks')
let btnAdd = $('#btnAdd')
let btnReset = $('#btnReset')
let btnEdit = $('#btnEdit')
let btnCleanup = $('#btnCleanup')
let inpNewTask = $('#inpNewTask')
let currentEditItem = null;

function addItem() {
  let listItem = $('<li>', {
    'class': 'list-group-item',
    text: inpNewTask.val()
  })
  listItem.click(() => {
    ulTasks.children().removeClass('selected')  // Remove selection from all items
    listItem.toggleClass('selected')  // Select clicked item
    toggleInputButtons()  // Update buttons based on selection
  })
  ulTasks.append(listItem)
  inpNewTask.val('')
  toggleInputButtons()
}

function clearDone() {
  $('#ulTasks .done').fadeOut(function() {
    $(this).remove()
  })
  toggleInputButtons()
}

function editItem() {
  let selectedItem = $('#ulTasks .selected')
  if (selectedItem.length === 1) {
    currentEditItem = selectedItem;
    inpNewTask.val(selectedItem.text())  // Set input field to the selected item's text for editing
  }
}

function toggleInputButtons() {
  btnReset.prop('disabled', inpNewTask.val() === '')
  btnAdd.prop('disabled', inpNewTask.val() === '')
  btnEdit.prop('disabled', ulTasks.children('.selected').length !== 1)  // Enable only if one item is selected
  btnCleanup.prop('disabled', ulTasks.children().length < 1)
}

inpNewTask.keypress((e) => {
  if (e.which == 13 && currentEditItem) {  // Press Enter to finish editing
    currentEditItem.text(inpNewTask.val())
    currentEditItem.removeClass('selected')
    currentEditItem = null
    inpNewTask.val('')
    toggleInputButtons()
  } else if (e.which == 13) {
    addItem()
  }
})

inpNewTask.on('input', toggleInputButtons)

btnAdd.click(() => {
  if (currentEditItem) {
    currentEditItem.text(inpNewTask.val())  // Update the item text when editing
    currentEditItem.removeClass('selected')
    currentEditItem = null
  } else {
    addItem()
  }
  inpNewTask.val('')
  toggleInputButtons()
})

btnReset.click(() => {
  inpNewTask.val('')
  toggleInputButtons()
})

btnCleanup.click(clearDone)
btnEdit.click(editItem)
