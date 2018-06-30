$(document).ready(() => {

  const sideClass = () => {
    let wid = $(window).width();
    (wid > 768)?$('#sidebar').addClass('active'):$('#sidebar').removeClass('active');
  };

  $('#startDate').datepicker({
      uiLibrary: 'bootstrap4',
      iconsLibrary: 'fontawesome',
      minDate: new Date(1851, 8, 18),
      maxDate: () => {
          return $('#endDate').val();
      }
  });

  $('#endDate').datepicker({
      uiLibrary: 'bootstrap4',
      iconsLibrary: 'fontawesome',
      minDate: () => {
          return $('#startDate').val();
      }
  });

  $('#sidebarCollapse').on('click', () => {
    $('#sidebar').toggleClass('active');
  });

  $(window).resize(() => {
    sideClass();
  });

  sideClass();

});