ALLOCATION_PROMPT = """
Allocate the shortlisted candidates into interview slots.

Use the provided calendar events to determine occupied times.

Rules:
- Schedule candidates in the order provided.
- Use only free slots.
- Never overlap an existing calendar event.
- Never overlap two interviews.
- Stay within the provided working hours.
- Use the provided interview duration.
- Do not schedule before schedule_from.
- The scheduling window is 30 days from schedule_from.
- Use Asia/Kolkata timezone.
- If there are not enough free slots, leave the remaining candidates
  unscheduled.

Return the allocation in the required structured format.
"""