# AI collaboration note

I used ChatGPT to draft prompts, propose n8n node changes, assemble workflow exports, and help diagnose execution errors. I supplied the café policies, selected the customer and staff interfaces, configured the live integrations, and ran tests in Messenger, Youform, and Sheets.

Three examples show how I checked and improved the AI-assisted work:

- I moved booking details into one form after testing the original message-by-message intake.
- I reviewed actual Messenger replies and tightened the prompt to use natural Taglish and answer only the question asked. I also checked the output validator after an echoed question.
- I used execution output and Sheets records to trace invalid-slot notices and duplicates. I chose to allow changes only on pending bookings and keep approved records under staff control.

Local checks covered workflow wiring and logic. The reported live results came from my pilot tests. The evaluation distinguishes those results from the estimated baseline and unverified replay cases.

**Tools.** ChatGPT assisted with design, prompts, code, and diagnosis. Groq runs the deployed reply model using approved café facts. Image generation helped prepare the menu artwork, which I reviewed before use.

**Outputs I corrected.** I rejected unsolicited food recommendations on address replies and stiff Tagalog handoffs. I also replaced the duplicate rule that treated a changed arrival time as a separate booking. Execution logs and the original reservation row were the checks that showed the revised behavior.
