from dataclasses import dataclass

from database.models.connected_account import ProviderType
from integration.linkedin.config.constants import LINKEDIN_INTEGRATION_NAME
from integration.google_form.constants.google import GOOGLE_FORM_INTEGRATION_NAME

@dataclass(frozen=True)
class SupportedIntegration:
    id: str
    name: str
    provider: ProviderType
    integration_name: str


SUPPORTED_INTEGRATIONS = [
    SupportedIntegration(
        id="google_forms",
        name="Google Forms",
        provider=ProviderType.GOOGLE,
        integration_name=GOOGLE_FORM_INTEGRATION_NAME,
    ),
    SupportedIntegration(
        id="linkedin_posts",
        name="LinkedIn Posts",
        provider=ProviderType.LINKEDIN,
        integration_name=LINKEDIN_INTEGRATION_NAME,
    ),
]