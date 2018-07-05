$(document).ready(() => {

  const sideClass = () => {
    let wid = $(window).width();
    (wid > 768)?$('#sidebar').addClass('active'):$('#sidebar').removeClass('active');
  };

  $('#sidebarCollapse').on('click', () => {
    $('#sidebar').toggleClass('active');
  });

  $(window).resize(() => {
    sideClass();
  });

  sideClass();

});