class LinkedInNotConnectedError(Exception):
    def __init__(self, user_id: int):
        self.user_id = user_id
        super().__init__(f"No LinkedIn connection found for user_id={user_id}")


class LinkedInTokenExpiredError(Exception):
    def __init__(self, user_id: int):
        self.user_id = user_id
        super().__init__(f"LinkedIn access token expired for user_id={user_id}")


class LinkedInDraftNotFoundError(Exception):
    def __init__(self, draft_id: str):
        self.draft_id = draft_id
        super().__init__(f"Draft not found or expired: draft_id={draft_id}")