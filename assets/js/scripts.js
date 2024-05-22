$(document).ready(function() {
  $('#file-tree').find('li.folder > span').on('click', function (e) {
    alert('is folder')
  });

  $('#file-tree').find('li.file > span').on('click', function (e) {
    $('#right-content').html('hello,'+ e.target.innerHTML)
  });
});
