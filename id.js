$(document).ready(function(){
'use strict';

$(document).ready(function(event){
  setTimeout(function(){
    $('#minilock_id input').val(location.search.split('?')[1])
    $('#minilock_id input').trigger('input')
  }, 1)
})

$(document).on('mousedown', function(event) {
  if ($(event.target).is('input,code')) return
  event.preventDefault()
  var input = $('#minilock_id input').get(0)
  var length = input.value.length
  if (window.getSelection().type === 'Range') {
    input.setSelectionRange(length, length)
  } else {
    input.setSelectionRange(0, length)
  }
})

$(document).on('input', '#minilock_id', function(event) {
  var id = $('#minilock_id input[type=text]').val()
  var isBlank = id.trim() === ''
  var isAcceptable = miniLockLib.ID.isAcceptable(id)
  $('body,form').toggleClass('acceptable', isAcceptable)
  $('body,form').toggleClass('unacceptable', !isAcceptable && !isBlank)
  $('body,form').toggleClass('blank', isBlank)
  if (isAcceptable) {
    renderPublicKey(id)
  } else {
    renderBlankPublicKey()
  }
})

function renderPublicKey(id) {
  var publicKey = miniLockLib.ID.decode(id)
  var byteDuration = 30
  $('#public_key').removeClass('blank')
  $('#public_key img').each(function(index, tag){
    $(tag).css({
      'height': publicKey[index] + 'px',
      'transition': 'height 100ms ease-out '+(index*byteDuration)+'ms, background-color 0ms linear '+((index*byteDuration)+0)+'ms'
    })
  })
}

function renderBlankPublicKey() {
  if ($('#public_key').hasClass('blank') === false) {
    $('#public_key').addClass('blank')
    $('#public_key img').css({
      'height': '',
      'transition': 'height 500ms ease-out 500ms'
    })
  }
}

})
