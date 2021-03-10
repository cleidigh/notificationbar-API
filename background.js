// Defining a onButtonClicked listener
messenger.notificationbar.onButtonClicked.addListener((windowId, notificationId, buttonId) => {
  console.log(`Listener #1 sees: button ${buttonId} clicked in notification ${notificationId} in window ${windowId}.`);
    if (["btn-keep"].includes(buttonId)) {
    console.log("Box will not close, as long as one listener returns {close:false}.");
    return {close: false};
  }
});

// Defining another onButtonClicked listener
messenger.notificationbar.onButtonClicked.addListener((windowId, notificationId, buttonId) => {
  console.log(`Listener #2 sees: button ${buttonId} clicked in notification ${notificationId} in window ${windowId}.`);
  if (["btn-direct"].includes(buttonId)) {
    console.log("Box will close as long no listener returns {close:false}.");
  }
});

// Defining a onDismissed listener
messenger.notificationbar.onDismissed.addListener((windowId, notificationId) => {
  console.log(`notification ${notificationId} in window ${windowId} was dismissed`);
});

// Defining a onClosed listener
messenger.notificationbar.onClosed.addListener((windowId, notificationId, closedByUser) => {
  console.log(`notification ${notificationId} in window ${windowId} was closed by user: ${closedByUser}`);
});



async function addBoxes(window) {
  // adding a top box
  await messenger.notificationbar.create({
    windowId: window.windowId,
    label: "Sample notification top 1",
    placement: "top",
    priority: messenger.notificationbar.PRIORITY_WARNING_HIGH,
    style: {
      "color": "blue",
      "font-weight": "bold",
      "font-style": "italic",
      "background-color": "green",
    },
    buttons: [
      {
        id: "btn-direct",
        label: "Close",
        accesskey: "o",
      },
      {
        id: "btn-keep",
        label: "Stay!"
      }
    ]
  });
  
  // adding a default box
  await messenger.notificationbar.create({
    windowId: window.id,
    priority: messenger.notificationbar.PRIORITY_CRITICAL_HIGH,
    label: "Sample notification default 2",
    buttons: [
      {
        id: "btn",
        label: "Close",
        accesskey: "d",
      }
    ]
  });

  // a bottom box
  await messenger.notificationbar.create({
    windowId: window.id,
    label: "Sample notification bottom 1",
    icon: "icon.png",
    placement: "bottom",    
  });
}



// add boxes to all future windows
messenger.windows.onCreated.addListener(addBoxes);

// add boxes to all existing windows
messenger.windows.getAll()
  .then(windows => {
    for (let window of windows) {
      addBoxes(window);
    }
  });
  
  // open a custom window to see notification bars there as well
  messenger.windows.create({
                height: 200,
                width: 510,
                type: "popup"
            })
