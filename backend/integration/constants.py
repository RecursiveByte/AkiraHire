from dataclasses import dataclass

from database.models.connected_account import ProviderType


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
        integration_name="google_forms",
    ),
    SupportedIntegration(
        id="linkedin_posts",
        name="LinkedIn Posts",
        provider=ProviderType.LINKEDIN,
        integration_name="linkedin_posts",
    ),
]