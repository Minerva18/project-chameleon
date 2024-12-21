// Enter the Google email address of the user whose calendar you want to configure with this script.
const userEmail = '<GMAIL_ADDRESS_HERE>';

// Sets up a trigger to call the 'updateEvents' function whenever an event in the specified calendar is updated.
function setupTrigger() {
  ScriptApp.newTrigger('updateEvents') // Creates a new trigger for the function 'updateEvents'
    .forUserCalendar(userEmail) // Associates the trigger with the user's calendar
    .onEventUpdated() // Specifies the trigger to activate when an event is updated
    .create(); // Creates the trigger
}

// Updates events in the specified calendar, adding an emoji and changing the event color for personal tasks.
function updateEvents(e) {
  // Fetch the calendar object by its ID
  const calendar = CalendarApp.getCalendarById(userEmail);

  // Access user properties to retrieve or store sync tokens
  const userProperties = PropertiesService.getUserProperties();
  let calSyncToken = userProperties.getProperty('CAL_SYNC_TOKEN'); // Get the last sync token

  const calendarId = 'primary'; // Specifies the primary calendar
  const now = new Date(); // Current date and time
  let tomorrow = new Date(); // Initialize tomorrow's date
  tomorrow.setDate(tomorrow.getDate() + 1); // Increment by one day to represent tomorrow

  // Master options for fetching events within the next 24 hours
  let masterEventOptions = {
    timeMin: now.toISOString(), // Start time: now
    timeMax: tomorrow.toISOString(), // End time: 24 hours from now
    singleEvents: true, // Retrieve only single events (not recurring)
  };

  let eventOptions = {};

  // If a sync token exists, use it to fetch only updated events; otherwise, fetch all within the time range
  if (calSyncToken) {
    eventOptions.syncToken = calSyncToken;
  } else {
    eventOptions = masterEventOptions;
  }

  // Fetch the events using the Google Calendar API
  let events = Calendar.Events.list(calendarId, eventOptions);

  // If no sync token is returned (e.g., on initial setup), fetch events using the master options
  if (!events.nextSyncToken) {
    events = Calendar.Events.list(calendarId, masterEventOptions);
  }

  // Save the new sync token for subsequent updates
  userProperties.setProperty('CAL_SYNC_TOKEN', events.nextSyncToken);

  if (events.items) {
    // Filter out cancelled events, events not created by the user, and events with attendees
    let ownEvents = events.items.filter(evt => evt.status != 'cancelled' && evt?.creator?.self && !evt.hasOwnProperty('attendees'));

    if (ownEvents.length > 0) {
      Logger.log('created own tasks'); // Log the number of personal events found

      // Process each event: prepend an emoji to the title and change its color
      ownEvents.forEach((evt, idx) => {
        const currentEvent = calendar.getEventById(evt.iCalUID); // Retrieve the event by its iCalUID
        let currentTitle = currentEvent.getTitle(); // Get the current title

        // Add the 🎧 emoji to the title if it isn't already present
        if (!currentTitle.includes('🎧')) {
          currentEvent.setTitle('🎧 ' + currentEvent.getTitle());
        }

        // Set the event color to pale blue
        currentEvent.setColor(CalendarApp.EventColor.PALE_BLUE);
      });
    }
  }
}
