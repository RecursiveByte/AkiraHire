import os

LINKEDIN_CLIENT_ID = os.getenv("LINKEDIN_CLIENT_ID")
LINKEDIN_CLIENT_SECRET = os.getenv("LINKEDIN_CLIENT_SECRET")
LINKEDIN_REDIRECT_URI = os.getenv("LINKEDIN_REDIRECT_URI")

LINKEDIN_AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization"
LINKEDIN_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken"
LINKEDIN_USERINFO_URL = "https://api.linkedin.com/v2/userinfo"

LINKEDIN_ASSETS_URL = "https://api.linkedin.com/v2/assets?action=registerUpload"
LINKEDIN_POSTS_URL = "https://api.linkedin.com/v2/ugcPosts"

LINKEDIN_OAUTH_SCOPES = "openid%20profile%20email%20w_member_social"

DEFAULT_POST_VISIBILITY = "CONNECTIONS"