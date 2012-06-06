$(function() {
  onLoaded(function() {
    // hideNoWifi();
    $('#results-area').find('.results').each(function(i, results) {
      addWifiButton(results);
      $(results).find('.nonstops').click();
    })
  });
});

function findNoWifi(results, onEach) {
  $(results).find('.routing').each(function(i, e) {
    if($(e).find('.wifi').length === 0) return onEach(e);
  });
}

function hideNoWifi(results) {
  findNoWifi(results, function(e) {
    $(e).hide();
  });
}

function showNoWifi(results) {
  findNoWifi(results, function(e) {
    $(e).show();
  });
}

function toggleNoWifi(wifiButton, results) {
  if( $(wifiButton).hasClass('selected')) {
    $(wifiButton).removeClass('selected');
    showNoWifi(results);
  } else {
    $(wifiButton).addClass('selected');
    hideNoWifi(results);
  }
}

function rand() {
  return Math.random().toString().substring(2);
}

function getButtonHTML() {
  return '<div id="wifi-' + rand() + '" class="lightbutton selected" style=""> WiFi </div>';
}

function addWifiButton(results) {
  var wifiButton = $(getButtonHTML());
  var lastButton = $(results).find('.filters-inner').find('.nonstops');
  if(lastButton.length === 0) lastButton = $(results).find('.filters-inner').find('.airlines');
  $(lastButton).after(wifiButton);
  hideNoWifi(results);
  wifiButton.click(function() {
    toggleNoWifi(wifiButton, results);
  });
}

function onLoaded(callback) {
  if($('#results-area').find('.results-table').find('.full-name').length !== 0) return callback();
  setTimeout(function() {
    onLoaded(callback);
  }, 200);
}

function findVisibleResults() {
  return $('#results-area').find('.results-table');
}