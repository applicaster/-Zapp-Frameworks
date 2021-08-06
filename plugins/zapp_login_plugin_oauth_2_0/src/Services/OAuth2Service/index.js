import { authorize, refresh, revoke } from "react-native-app-auth";

import {
  saveKeychainData,
  loadKeychainData,
  removeKeychainData,
} from "../KeychainService";

import { logger } from "../LoggerService";

export async function authorizeService(oAuthConfig, session_storage_key) {
  if (!oAuthConfig) {
    logger.error({
      message: `authorizeService: OAuthConfig not exist`,
      data: { oauth_config: oAuthConfig, session_storage_key },
    });

    return false;
  }
  try {
    const result = await authorize(oAuthConfig);
    saveKeychainData(result);
    logger.debug({
      message: `authorizeService: Success`,
      data: { oauth_config: oAuthConfig, result, session_storage_key },
    });

    return true;
  } catch (error) {
    await removeKeychainData(session_storage_key);
    logger.error({
      message: `authorizeService: Success`,
      data: { oauth_config: oAuthConfig, error, session_storage_key },
    });

    return false;
  }
}

export async function refreshService(
  oAuthConfig,
  refreshToken,
  session_storage_key
) {
  try {
    if (oAuthConfig && refreshToken) {
      const result = await refresh(oAuthConfig, { refreshToken });
      saveKeychainData(result, session_storage_key);
      logger.debug({
        message: `refreshService: Success`,
        data: { oauth_config: oAuthConfig, result, session_storage_key },
      });

      return result;
    }
    logger.error({
      message: `refreshService: oAuthConfig or refreshToken not exist`,
      data: { oauth_config: oAuthConfig, session_storage_key },
    });

    return false;
  } catch (error) {
    await removeKeychainData(session_storage_key);

    logger.error({
      message: `refreshService: Error`,
      data: { oauth_config: oAuthConfig, error, session_storage_key },
    });

    return false;
  }
}

export async function revokeService(oAuthConfig, session_storage_key) {
  try {
    const data = await loadKeychainData();
    const tokenToRevoke = data?.accessToken;

    if (oAuthConfig && tokenToRevoke) {
      const result = await revoke(oAuthConfig, {
        tokenToRevoke,
        includeBasicAuth: true,
        sendClientId: true,
      });
      logger.debug({
        message: `revokeService: Success`,
        data: {
          oauth_config: oAuthConfig,
          data: data,
          token_to_revoke: tokenToRevoke,
          result,
          session_storage_key,
        },
      });

      await removeKeychainData(session_storage_key);

      //TODO: In case logout we want to clear cache in the browser
      // const url =
      //   "https://applicaster-test.auth.us-east-1.amazoncognito.com/logout?client_id=3chiv791dnc9ljom3bi9aumvco&logout_uri=miami://oauth_test&response_type=code&state=STATE&scope=openid+profile+aws.cognito.signin.user.admin";
      // Linking.openURL(url);

      return true;
    }

    logger.error({
      message: `revokeService: oauth_config or tokenToRevoke not exists`,
      data: {
        oauth_config: oAuthConfig,
        token_to_revoke: tokenToRevoke,
        session_storage_key,
      },
    });

    return false;
  } catch (error) {
    logger.error({
      message: `revokeService: Error`,
      data: {
        oauth_config: oAuthConfig,
        error,
        session_storage_key,
      },
    });

    return false;
  }
}

export async function checkUserAuthorization(oAuthConfig, session_storage_key) {
  try {
    let data = await loadKeychainData();

    const idToken = data?.idToken;
    const accessTokenExpirationDate = data?.accessTokenExpirationDate;
    const refreshToken = data?.refreshToken;

    if (idToken && accessTokenExpirationDate && oAuthConfig) {
      if (isTokenValid(accessTokenExpirationDate)) {
        logger.debug({
          message: `checkUserAuthorization: Is user authorized: true`,
          data: {
            oauth_config: oAuthConfig,
            access_token_expiration_date: accessTokenExpirationDate,
            is_authorized: true,
            session_storage_key,
          },
        });

        return true;
      } else {
        if (refreshToken) {
          logger.debug({
            message: `checkUserAuthorization: Access token expired, try to call refreshService:`,
            data: {
              oauth_config: oAuthConfig,
              access_token_expiration_date: accessTokenExpirationDate,
              refresh_token: refreshToken,
              is_authorized: false,
              session_storage_key,
            },
          });

          const result = await refreshService(
            oAuthConfig,
            refreshToken,
            session_storage_key
          );
          return result;
        } else {
          logger.debug({
            message: `checkUserAuthorization: Access token expired, no refreshToken token exist, try to call authorizeService:`,
            data: {
              oauth_config: oAuthConfig,
              access_token_expiration_date: accessTokenExpirationDate,
              is_authorized: false,
              session_storage_key,
            },
          });

          const result = await authorizeService(
            oAuthConfig,
            session_storage_key
          );
          return result;
        }
      }
    } else {
      logger.debug({
        message: `checkUserAuthorization: idToken, accessTokenExpirationDate or oAuthConfig not exist`,
        data: {
          oauth_config: oAuthConfig,
          id_token: idToken,
          access_token_expiration_date: accessTokenExpirationDate,
          refresh_token: refreshToken,
        },
      });

      return false;
    }
  } catch (error) {
    logger.error({
      message: `checkUserAuthorization: Error`,
      data: {
        oauth_config: oAuthConfig,
        error,
      },
    });

    return false;
  }
}

function isTokenValid(tokenExpiredDate) {
  const tokenDate = new Date(tokenExpiredDate);
  const nowDate = new Date();
  const result = tokenDate > nowDate;
  logger.debug({
    message: `isTokenValid: ${result}`,
    data: {
      token_expired_date: tokenExpiredDate,
      result,
    },
  });

  return result;
}
