# **Project Chameleon**

### Video Demo: https://www.youtube.com/watch?v=8ecZ4XLgRDw
### Blog Post: 


## Setup Steps

1. **Create or Use Your Google Account**
   - Ensure you have a Google account. If not, sign up for one.

2. **Access Google Apps Script**
   - Navigate to Google Apps Script [https://script.google.com/home/](https://script.google.com/home/).

3. **Start a New Project**
   Click on the **+ New Project** button.

4. **Name Your Project**
   - In the top header, next to the Apps Script logo, rename the project from “Untitled Project” to something meaningful, like **Chameleon**.

5. **Enable Google Calendar API**
   - In the left-hand sidebar, locate the **Services** tab and click the **+** icon.
   - In the popup, find and select **Google Calendar API** from the list. Leave other fields as-is and click **Add**.

6. **Add the Script Code**
   - In the **Code.gs** file, replace the existing code with the content from this repository’s `Code.gs` file.
   - Save your changes using the **floppy disk icon** on the toolbar or with shortcuts:
     - **Mac:** `Cmd + S`
     - **Windows:** `Ctrl + S`

7. **Note/Disclaimer - Read Before Proceeding**
   **Important Note:** Running this script will modify your Google Calendar.
   - All existing events without attendees will have their titles updated with a 🎧 emoji at the start and their color changed.
   - Future events you create without attendees will automatically follow the same behavior.

8. **Authorize and Run the Script**
   - In the toolbar, click the **▶ Run** button.
   - If this is your first time running the script, you’ll be prompted to authorize access to your Google Calendar. Follow the instructions to grant the necessary permissions.

9. **Enjoy the Automation!**
   Once authorized, the script will be active. Your calendar is now smarter and more organized—enjoy! 🎉

