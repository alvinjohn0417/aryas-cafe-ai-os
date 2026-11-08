# Arya’s Cafe | Faster answers, clearer reservations

I built a Messenger support and reservation pilot for a simulated café as part of the 5-Day Remote AI OS Sprint. The goal was to handle repetitive questions quickly and collect complete booking requests while keeping seating decisions with staff.

I started with a Messenger bot that reads approved café information from Google Docs. It answers routine questions, sends menu images, and logs exceptions for staff. The first reservation flow asked for each detail in a separate message. Testing made that feel slow, so I replaced it with a Youform that submits all details together. n8n validates the request, writes it to Google Sheets, and gives staff a private approval form. Approval can trigger Messenger, Gmail, and Calendar notices.

In a ten-case pilot test, the bot gave six correct routine answers and routed four exceptions correctly. The routine cases had a median reported time of 5.11 seconds against a hypothetical 35-second manual estimate for the same questions. I also tested invalid slots, pending edits, and approved duplicates. Those tests led to natural Taglish handoffs, AM/PM dropdowns, Messenger recovery messages, and protection against overwriting ambiguous matches.

The pilot demonstrates how a small team can answer common questions and review reservations without editing the workflow. The next step is to measure actual staff effort and customer outcomes over two weeks, then prioritize the most frequent unresolved issue.

**Scope and trade-offs.** The pilot covers FAQs, menu delivery, handoff, and table request intake. It leaves seating, stock, allergy, payment, and order decisions to staff. Sheets gives staff a familiar queue and audit trail. Its separate read and write operations leave a concurrency limitation. A private approval form keeps operators out of the n8n editor. Moving intake to Youform reduced conversational steps but required a booking reference to connect the submission back to Messenger.

**AI and human judgment.** I used AI to draft prompts and workflow changes and to help diagnose failed executions. I chose the booking rules, decided which requests needed approval, reviewed customer-facing copy, and checked actual messages and sheet rows.

**Next two weeks.** In week one, review failed deliveries and unresolved handoffs daily. In week two, compare sampled answer quality, response time, booking outcomes, and staff effort. Use the most frequent observed failure to choose the next improvement. A staff-reviewed change request for approved bookings and stronger concurrent-write protection are candidates.
