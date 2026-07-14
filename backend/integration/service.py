from sqlalchemy.orm import Session

from integration.constants import SUPPORTED_INTEGRATIONS
from integration.connected_account_repository import ConnectedAccountRepository
from integration.exceptions import ConnectedAccountNotFoundException


class IntegrationService:

    @staticmethod
    def get_integrations(
        db: Session,
        user_id: int,
    ) -> list[dict]:

        connected = {
            (account.provider, account.integration_name): account.id
            for account in ConnectedAccountRepository.get_connected_accounts_by_user_id(
                db=db,
                user_id=user_id,
            )
        }


        return [
            {
                "id": connected.get(key),
                "name": integration.name,
                "provider": integration.provider.value,
                "connected": key in connected,
            }
            for integration in SUPPORTED_INTEGRATIONS
            for key in [(integration.provider, integration.integration_name)]
        ]

    @staticmethod
    def disconnect_account(
        db: Session,
        user_id: int,
        account_id: int,
    ) -> None:
        account = ConnectedAccountRepository.get_by_id_and_user(
            db=db,
            account_id=account_id,
            user_id=user_id,
        )

        if account is None:
            raise ConnectedAccountNotFoundException(account_id=account_id)

        ConnectedAccountRepository.delete(db=db, account=account)