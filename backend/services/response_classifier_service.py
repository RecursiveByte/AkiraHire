from enum import Enum


class ResponseDecision(str, Enum):
    YES = "yes"
    NO = "no"
    UNCLEAR = "unclear"


class ResponseClassifierService:

    YES_WORDS: set[str] = {"yes", "y", "yeah", "yep", "sure", "ok", "okay", "confirm"}
    NO_WORDS: set[str] = {"no", "n", "nope", "nah"}

    @staticmethod
    def classify(message: str) -> ResponseDecision:
        normalized = message.strip().lower()

        if normalized in ResponseClassifierService.YES_WORDS:
            return ResponseDecision.YES

        if normalized in ResponseClassifierService.NO_WORDS:
            return ResponseDecision.NO

        return ResponseDecision.UNCLEAR