let ulTasks = $('#ulTasks')
let btnAdd = $('#btnAdd')
let btnReset = $('#btnReset')
let btnEdit = $('#btnEdit')
let btnCleanup = $('#btnCleanup')
let inpNewTask = $('#inpNewTask')
let editingTask = null

function addItem() {
  let listItem = $('<li>', {
    'class': 'list-group-item',
    text: inpNewTask.val()
  })
  listItem.click(() => {
    listItem.toggleClass('done')
    toggleInputButtons()
  })
  listItem.dblclick(() => {
    if (ulTasks.children('.done').length === 1) {
      editingTask = listItem
      inpNewTask.val(listItem.text())
      toggleInputButtons()
    }
  })
  ulTasks.append(listItem)
  inpNewTask.val('')
  toggleInputButtons()
}

function clearDone() {
  $('#ulTasks .done').each(function() {
    $(this).remove()  // Directly remove the done tasks
  })
  toggleInputButtons()
}

function editTask() {
  if (editingTask) {
    editingTask.text(inpNewTask.val())
    inpNewTask.val('')
    editingTask = null
    toggleInputButtons()
  }
}

function toggleInputButtons() {
  btnReset.prop('disabled', inpNewTask.val() === '')
  btnAdd.prop('disabled', inpNewTask.val() === '')
  btnEdit.prop('disabled', ulTasks.children('.done').length !== 1)
  btnCleanup.prop('disabled', ulTasks.children().length < 1)
}

inpNewTask.keypress((e) => {
  if (e.which == 13) addItem()
})

inpNewTask.on('input', toggleInputButtons)

btnAdd.click(addItem)
btnReset.click(() => {
  inpNewTask.val('')
  toggleInputButtons()
})
btnEdit.click(editTask)
btnCleanup.click(clearDone)
