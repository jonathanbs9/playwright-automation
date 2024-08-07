import { test, expect } from '@playwright/test';

test.describe('Valid VOD getmedia', () => {
  const endpoint = 'https://aws-us-east-1-cchile-cvideo-mfw-iptv-prd.clarovideo.net/'
  const serviceGetmedia = "services/player/getmedia"

  const errorMessages = {
    invalidParameters: "Invalid parameters",
    invalidUserToken: "Invalid user_token",
    unsupportedDevice: "Unsupported device",
    userNotLoggedId: "User Not logged in",
    tokensDoesntMatch: "Tokens doesn't match",
    contentWasntPurchased: "This content wasn't purchased"
  }

  const errorCodes = {
    plyDev1: "PLY_DEV_00001",
    plyDev2: "PLY_DEV_00002",
    plyPly4: "PLY_PLY_00004",
    plyPly7: "PLY_PLY_00007",
    usrUsr1: "USR_USR_00001",
    usrJWT2: "USR_JWT_00002"
  }

  test("Alternative Path - Invalid parameters - Empty HKS", async ({ request }) => {
    const response = await request.get(`${endpoint}${serviceGetmedia}?api_version=v5.95&region=argentina&device_manufacturer=windows&device_category=web&device_model=html5&device_type=html5&device_name=web_Ply_Aut&device_id=PLYAUT412141385&authpt=12e4i8l6a581a&authpn=amco&stream_type=smooth_streaming&user_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTM5OTA2NDEsImV4cCI6MTcxOTE3NDk0MSwidXNyIjp7InVzZXJfaWQiOiI1MzUxNjc0MyIsInVzZXJfdHlwZSI6IkNBUk5PVklQIiwidXNlcm5hbWUiOiJiZi5hcmdlbnRpbmEuaHViY29ycG1vY2suOTA4MTc1MjIwNDgzQGdtYWlsLmNvbSIsImVtYWlsIjoiYmYuYXJnZW50aW5hLmh1YmNvcnBtb2NrLjkwODE3NTIyMDQ4M0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJub21icmVQcnVlYmEiLCJsYXN0bmFtZSI6ImFwZWxsaWRvUHJ1ZWJhIiwiY291bnRyeV9jb2RlIjoiQVIiLCJyZWdpb24iOiJhcmdlbnRpbmEiLCJhY2NlcHRlZF90ZXJtcyI6MSwiZ2FtaWZpY2F0aW9uX2lkIjoiNjQ4MDgzZmFjZjBjODc0MDg4MjJmMWIzIiwicGFyZW50X2lkIjoiNTM1MTY3NDMiLCJhY2NvdW50IjoiODg3OTU5Njc4MTgyMzM3ODAiLCJwZ19nYXRld2F5IjoiaHViZ2F0ZSIsImFkbWluIjp0cnVlLCJ3Z19pZCI6IjI3In19.jdnFrZ9vGx9bbAbLzN2OEmVL4XniMVg3MN7GdD4GN2c&payway_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTY1NTc5NDIsImlzcyI6InBheXdheVwvbGluZWFsY2hhbm5lbHMiLCJwZ3MiOnsidXNlciI6IjUzNTE2MzIxIiwicGFyZW50IjoiNTM1MTYzMjEiLCJvZmZlciI6IjE0MzMwNTUwIiwicHVyY2hhc2UiOiI3OTg1NDc0MjEiLCJwcm9kdWN0dHlwZSI6IlBMQVlfVFYiLCJwbGF5Ijp7ImVuYWJsZWQiOnRydWUsImRldmljZXMiOm51bGwsInN0cmVhbXMiOm51bGx9LCJkbCI6eyJlbmFibGVkIjpudWxsLCJkZXZpY2VzIjpudWxsLCJleHAiOm51bGx9LCJucHZyIjp7InN0b3JhZ2UiOiIyMDAiLCJ0aW1lc2hpZnQiOiIyNCJ9LCJvYmplY3QiOiIyNzAwIiwiZ3JvdXBzIjpbIjc5MTQ0NCIsIjc5MTQzOSIsIjc5MTQzOCIsIjc5MTM4MiIsIjc5MTQzMSIsIjc5MTQxNSIsIjc5MTM4MCIsIjc5MTM2NSIsIjc5MTM2NCIsIjc5MTQxMSIsIjc5MTM5MyIsIjc5MTM5MSIsIjc5MTM3NiIsIjc5MTM3NSIsIjc5MTM3MyIsIjc5MTM3MiIsIjc5MTM3MSIsIjc5MTM1NCIsIjc5MTM1MyIsIjc5MTM1MSIsIjc5MTM0NiIsIjc5MTMzOCIsIjc5MTMzNCIsIjc5MTMzMiIsIjc5MTMzMSIsIjc5MTMzMCIsIjc5MTMyNyIsIjc5MTMyMiIsIjc5MTMyMSIsIjc5MTMyMCIsIjc5MTMxOSIsIjc5MTMxOCIsIjc5MTMxMyIsIjc5MTMxMCIsIjc5MTMwOSIsIjc5MTMwNyIsIjc5MTMwNiIsIjc5MTMwMyIsIjc5MTMwMSIsIjc5MTI5MyIsIjc5MTI4OCIsIjc5MTI1MCIsIjc5MTI0NyIsIjc5MTI0NiIsIjc5MTI0NSIsIjc5MTI5MSIsIjc5MTI4MCIsIjc5MTI3NCIsIjc5MTI3MCIsIjc5MTI2OSIsIjc5MTI2OCIsIjc5MTI2NyIsIjc5MTI2NSIsIjc5MTI2NCIsIjc5MTI2MCIsIjc5MTI1OSIsIjc5MTIzNiIsIjc5MTIzNSIsIjc5MTIyMCIsIjc5MTIxMCIsIjc5MTIwOSIsIjc5MTA1MyIsIjc5MTAzNiIsIjc4NTM3NCIsIjc4NTMwMCIsIjc4NTI5OSIsIjc4NTI4OSIsIjc4NTI4OCIsIjc4NTI2NyIsIjc4NTI2NiIsIjc4NTI2NSIsIjc4NTI0OSIsIjc4NTIxMSIsIjc4NTIxMCIsIjc4NTIwOSIsIjc4NDY5OSIsIjc4NDY4MSIsIjc4NDY0NSIsIjc4NDY0NCIsIjc4NDY0MyIsIjc4NDU3NyIsIjc4NDU3NSIsIjc4Mzg4NyIsIjc4Mzg4NiIsIjc4Mzg4NSIsIjc4MzgzMiIsIjc4MzgzMSIsIjc4MzgxMyIsIjc3NTMzMiIsIjc3NDA0MyIsIjc3NDA0MiIsIjc3MjEzOSIsIjc2NzQ5OSIsIjc2NjIxMiIsIjc2NjI1OSIsIjc2NjI0MyIsIjc2NjI0MiIsIjc2NjI0MSIsIjc2NjIyOSIsIjc2NjIyNSIsIjc2NjIwNyIsIjc2NjIwNiIsIjc2NjIwNSIsIjc2NjIwNCIsIjc2NjIwMyIsIjc2NjE2OSIsIjc2NjE2NyIsIjc2NjEzNyIsIjc2NjEzNiIsIjc2NDUxMSIsIjc2NDE4OCIsIjc2NDE4NiIsIjc2NDE4NSIsIjc2NDE4NCIsIjc2NDE4MiIsIjc2NDE4MSIsIjc2NDE2OCIsIjc2NDE1MiIsIjc2NDE1MCIsIjc2NDEyMyIsIjc2NDEyMiIsIjc2NDExMyIsIjc2MzQ3NiIsIjc2MzQ3NCIsIjc2MzM0NyIsIjc2MzM0NiIsIjc2MjM1OCIsIjc2MjMyMSIsIjc2MjMyMCIsIjc2MjMwOSIsIjc2MjI4OSIsIjc2MjI4OCIsIjc2MjMzOSIsIjc2MjMzOCIsIjc2MjMxOCIsIjc2MjMwNiIsIjc2MjMwNSIsIjc2MjMwNCIsIjc2MjMwMyIsIjc2MjMwMSIsIjc2MjMwMCIsIjc2MjI5OCIsIjc2MjI4NiIsIjc2MjI4NSIsIjc2MjI4NCIsIjc2MjI4MyIsIjc2MjI4MSIsIjc2MjI4MCIsIjc2MjI3OCIsIjc2MjI3NyIsIjc2MjI3NiIsIjc2MjI3NSIsIjc2MjI3NCIsIjc2MjI3MyIsIjc2MjI3MCIsIjc2MjI2OSIsIjc2MjI2NyIsIjc2MjI2NiIsIjc2MjI2NSIsIjc2MjI2NCIsIjc2MjI2MyIsIjc2MjI2MiIsIjc2MjI2MSIsIjc2MjI2MCIsIjc2MjI1OSIsIjc2MjI1OCIsIjc2MjI1NSIsIjc2MjI1NCIsIjc2MjI1MyIsIjc2MjI1MiIsIjc2MjI1MCIsIjc2MjI0NyIsIjc2MjI0NiIsIjc2MjI0NSIsIjc2MjI0MyIsIjc2MjI0MSIsIjc2MjI0MCIsIjc2MjIzOSIsIjc2MjIzOCIsIjc2MjIzNyIsIjc2MjIzNiIsIjc2MjIzNCIsIjc2MjIzMyIsIjc2MjIzMCIsIjc2MjIyOSIsIjc2MjIyOCIsIjc2MjIyNyIsIjc2MjIyNiIsIjc2MjIyNSIsIjc2MjIyMyIsIjc2MjIyMiIsIjc2MjIxNyIsIjc2MjIxNiIsIjc2MjIxMyIsIjc2MjIxMiIsIjc2MjIxMSIsIjc2MjIxMCIsIjc2MjIwOSIsIjc2MjIwNyIsIjc2MjIwNiIsIjc2MjIwNSIsIjc2MjIwNCIsIjc2MjE5NiIsIjc2MjE5NSIsIjc2MjE5NCJdfX0.OUmMdi04jfPW_PpGU37op3N0oDH5vY0VcJnMOfgWAk0&group_id=599582`)
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.status).toBe(400)
    expect(responseBody.errors[0].message).toEqual(errorMessages.invalidParameters)
    expect(responseBody.errors[0].code).toEqual(errorCodes.plyDev1)
    expect(responseBody.errors[0]).toHaveProperty("exception")
  })

  test("Alternative Path - Invalid parameters - Empty stream_type", async ({ request }) => {
    const response = await request.get(`${endpoint}${serviceGetmedia}?HKS=PLYAUT40483446066297daf62676&api_version=v5.95&region=argentina&device_manufacturer=windows&device_category=web&device_model=html5&device_type=html5&device_name=web_Ply_Aut&device_id=PLYAUT404834460&authpt=12e4i8l6a581a&authpn=amco&user_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTM5OTQ4ODMsImV4cCI6MTcxOTE3OTE4MywidXNyIjp7InVzZXJfaWQiOiI1MzUxNjc0MyIsInVzZXJfdHlwZSI6IkNBUk5PVklQIiwidXNlcm5hbWUiOiJiZi5hcmdlbnRpbmEuaHViY29ycG1vY2suOTA4MTc1MjIwNDgzQGdtYWlsLmNvbSIsImVtYWlsIjoiYmYuYXJnZW50aW5hLmh1YmNvcnBtb2NrLjkwODE3NTIyMDQ4M0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJub21icmVQcnVlYmEiLCJsYXN0bmFtZSI6ImFwZWxsaWRvUHJ1ZWJhIiwiY291bnRyeV9jb2RlIjoiQVIiLCJyZWdpb24iOiJhcmdlbnRpbmEiLCJhY2NlcHRlZF90ZXJtcyI6MSwiZ2FtaWZpY2F0aW9uX2lkIjoiNjQ4MDgzZmFjZjBjODc0MDg4MjJmMWIzIiwicGFyZW50X2lkIjoiNTM1MTY3NDMiLCJhY2NvdW50IjoiODg3OTU5Njc4MTgyMzM3ODAiLCJwZ19nYXRld2F5IjoiaHViZ2F0ZSIsImFkbWluIjp0cnVlLCJ3Z19pZCI6IjI3In19.5SyVjp1l5crdRfx8XbrbW8B_MRubIQOACCPI8oadFcE&payway_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTQwODA5ODcsImlzcyI6InBheXdheVwvcHVyY2hhc2VidXR0b25pbmZvIiwicGdzIjp7InVzZXIiOiI1MzUxNjc0MyIsInBhcmVudCI6IjUzNTE2NzQzIiwib2ZmZXIiOiIxNDMzMDU2MCIsInB1cmNoYXNlIjoiNzk4NTQ3NzAzIiwib2JqZWN0IjoiOTgwMCIsImdyb3VwcyI6WyI1OTk1ODIiXSwicGxheSI6eyJlbmFibGVkIjp0cnVlLCJkZXZpY2VzIjo1LCJzdHJlYW1zIjo1fSwiZGwiOnsiZW5hYmxlZCI6ZmFsc2UsImRldmljZXMiOm51bGwsImV4cCI6bnVsbH0sIm5wdnIiOnsic3RvcmFnZSI6bnVsbCwidGltZXNoaWZ0IjpudWxsfX19.vxovhjKSwaRQSuynaue5zGK2AN2ANOmab4FlLS94Nm4&group_id=599582`)
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.status).toBe(400)
    expect(responseBody.errors[0].message).toEqual("Invalid Parameters")
    expect(responseBody.errors[0].code).toEqual(errorCodes.plyPly4)
    expect(responseBody.errors[0]).toHaveProperty("exception")
  })

  test("Alternative Path - Unsupported device - Empty device manufacturer", async ({ request }) => {
    const response = await request.get(`${endpoint}${serviceGetmedia}?HKS=PLYAUT11160529666296ab7537ca&api_version=v5.95&region=argentina&device_category=web&device_model=html5&device_type=html5&device_name=web_Ply_Aut&device_id=PLYAUT412141385&authpt=12e4i8l6a581a&authpn=amco&stream_type=smooth_streaming&user_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTM5OTA2NDEsImV4cCI6MTcxOTE3NDk0MSwidXNyIjp7InVzZXJfaWQiOiI1MzUxNjc0MyIsInVzZXJfdHlwZSI6IkNBUk5PVklQIiwidXNlcm5hbWUiOiJiZi5hcmdlbnRpbmEuaHViY29ycG1vY2suOTA4MTc1MjIwNDgzQGdtYWlsLmNvbSIsImVtYWlsIjoiYmYuYXJnZW50aW5hLmh1YmNvcnBtb2NrLjkwODE3NTIyMDQ4M0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJub21icmVQcnVlYmEiLCJsYXN0bmFtZSI6ImFwZWxsaWRvUHJ1ZWJhIiwiY291bnRyeV9jb2RlIjoiQVIiLCJyZWdpb24iOiJhcmdlbnRpbmEiLCJhY2NlcHRlZF90ZXJtcyI6MSwiZ2FtaWZpY2F0aW9uX2lkIjoiNjQ4MDgzZmFjZjBjODc0MDg4MjJmMWIzIiwicGFyZW50X2lkIjoiNTM1MTY3NDMiLCJhY2NvdW50IjoiODg3OTU5Njc4MTgyMzM3ODAiLCJwZ19nYXRld2F5IjoiaHViZ2F0ZSIsImFkbWluIjp0cnVlLCJ3Z19pZCI6IjI3In19.jdnFrZ9vGx9bbAbLzN2OEmVL4XniMVg3MN7GdD4GN2c&payway_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTY1NTc5NDIsImlzcyI6InBheXdheVwvbGluZWFsY2hhbm5lbHMiLCJwZ3MiOnsidXNlciI6IjUzNTE2MzIxIiwicGFyZW50IjoiNTM1MTYzMjEiLCJvZmZlciI6IjE0MzMwNTUwIiwicHVyY2hhc2UiOiI3OTg1NDc0MjEiLCJwcm9kdWN0dHlwZSI6IlBMQVlfVFYiLCJwbGF5Ijp7ImVuYWJsZWQiOnRydWUsImRldmljZXMiOm51bGwsInN0cmVhbXMiOm51bGx9LCJkbCI6eyJlbmFibGVkIjpudWxsLCJkZXZpY2VzIjpudWxsLCJleHAiOm51bGx9LCJucHZyIjp7InN0b3JhZ2UiOiIyMDAiLCJ0aW1lc2hpZnQiOiIyNCJ9LCJvYmplY3QiOiIyNzAwIiwiZ3JvdXBzIjpbIjc5MTQ0NCIsIjc5MTQzOSIsIjc5MTQzOCIsIjc5MTM4MiIsIjc5MTQzMSIsIjc5MTQxNSIsIjc5MTM4MCIsIjc5MTM2NSIsIjc5MTM2NCIsIjc5MTQxMSIsIjc5MTM5MyIsIjc5MTM5MSIsIjc5MTM3NiIsIjc5MTM3NSIsIjc5MTM3MyIsIjc5MTM3MiIsIjc5MTM3MSIsIjc5MTM1NCIsIjc5MTM1MyIsIjc5MTM1MSIsIjc5MTM0NiIsIjc5MTMzOCIsIjc5MTMzNCIsIjc5MTMzMiIsIjc5MTMzMSIsIjc5MTMzMCIsIjc5MTMyNyIsIjc5MTMyMiIsIjc5MTMyMSIsIjc5MTMyMCIsIjc5MTMxOSIsIjc5MTMxOCIsIjc5MTMxMyIsIjc5MTMxMCIsIjc5MTMwOSIsIjc5MTMwNyIsIjc5MTMwNiIsIjc5MTMwMyIsIjc5MTMwMSIsIjc5MTI5MyIsIjc5MTI4OCIsIjc5MTI1MCIsIjc5MTI0NyIsIjc5MTI0NiIsIjc5MTI0NSIsIjc5MTI5MSIsIjc5MTI4MCIsIjc5MTI3NCIsIjc5MTI3MCIsIjc5MTI2OSIsIjc5MTI2OCIsIjc5MTI2NyIsIjc5MTI2NSIsIjc5MTI2NCIsIjc5MTI2MCIsIjc5MTI1OSIsIjc5MTIzNiIsIjc5MTIzNSIsIjc5MTIyMCIsIjc5MTIxMCIsIjc5MTIwOSIsIjc5MTA1MyIsIjc5MTAzNiIsIjc4NTM3NCIsIjc4NTMwMCIsIjc4NTI5OSIsIjc4NTI4OSIsIjc4NTI4OCIsIjc4NTI2NyIsIjc4NTI2NiIsIjc4NTI2NSIsIjc4NTI0OSIsIjc4NTIxMSIsIjc4NTIxMCIsIjc4NTIwOSIsIjc4NDY5OSIsIjc4NDY4MSIsIjc4NDY0NSIsIjc4NDY0NCIsIjc4NDY0MyIsIjc4NDU3NyIsIjc4NDU3NSIsIjc4Mzg4NyIsIjc4Mzg4NiIsIjc4Mzg4NSIsIjc4MzgzMiIsIjc4MzgzMSIsIjc4MzgxMyIsIjc3NTMzMiIsIjc3NDA0MyIsIjc3NDA0MiIsIjc3MjEzOSIsIjc2NzQ5OSIsIjc2NjIxMiIsIjc2NjI1OSIsIjc2NjI0MyIsIjc2NjI0MiIsIjc2NjI0MSIsIjc2NjIyOSIsIjc2NjIyNSIsIjc2NjIwNyIsIjc2NjIwNiIsIjc2NjIwNSIsIjc2NjIwNCIsIjc2NjIwMyIsIjc2NjE2OSIsIjc2NjE2NyIsIjc2NjEzNyIsIjc2NjEzNiIsIjc2NDUxMSIsIjc2NDE4OCIsIjc2NDE4NiIsIjc2NDE4NSIsIjc2NDE4NCIsIjc2NDE4MiIsIjc2NDE4MSIsIjc2NDE2OCIsIjc2NDE1MiIsIjc2NDE1MCIsIjc2NDEyMyIsIjc2NDEyMiIsIjc2NDExMyIsIjc2MzQ3NiIsIjc2MzQ3NCIsIjc2MzM0NyIsIjc2MzM0NiIsIjc2MjM1OCIsIjc2MjMyMSIsIjc2MjMyMCIsIjc2MjMwOSIsIjc2MjI4OSIsIjc2MjI4OCIsIjc2MjMzOSIsIjc2MjMzOCIsIjc2MjMxOCIsIjc2MjMwNiIsIjc2MjMwNSIsIjc2MjMwNCIsIjc2MjMwMyIsIjc2MjMwMSIsIjc2MjMwMCIsIjc2MjI5OCIsIjc2MjI4NiIsIjc2MjI4NSIsIjc2MjI4NCIsIjc2MjI4MyIsIjc2MjI4MSIsIjc2MjI4MCIsIjc2MjI3OCIsIjc2MjI3NyIsIjc2MjI3NiIsIjc2MjI3NSIsIjc2MjI3NCIsIjc2MjI3MyIsIjc2MjI3MCIsIjc2MjI2OSIsIjc2MjI2NyIsIjc2MjI2NiIsIjc2MjI2NSIsIjc2MjI2NCIsIjc2MjI2MyIsIjc2MjI2MiIsIjc2MjI2MSIsIjc2MjI2MCIsIjc2MjI1OSIsIjc2MjI1OCIsIjc2MjI1NSIsIjc2MjI1NCIsIjc2MjI1MyIsIjc2MjI1MiIsIjc2MjI1MCIsIjc2MjI0NyIsIjc2MjI0NiIsIjc2MjI0NSIsIjc2MjI0MyIsIjc2MjI0MSIsIjc2MjI0MCIsIjc2MjIzOSIsIjc2MjIzOCIsIjc2MjIzNyIsIjc2MjIzNiIsIjc2MjIzNCIsIjc2MjIzMyIsIjc2MjIzMCIsIjc2MjIyOSIsIjc2MjIyOCIsIjc2MjIyNyIsIjc2MjIyNiIsIjc2MjIyNSIsIjc2MjIyMyIsIjc2MjIyMiIsIjc2MjIxNyIsIjc2MjIxNiIsIjc2MjIxMyIsIjc2MjIxMiIsIjc2MjIxMSIsIjc2MjIxMCIsIjc2MjIwOSIsIjc2MjIwNyIsIjc2MjIwNiIsIjc2MjIwNSIsIjc2MjIwNCIsIjc2MjE5NiIsIjc2MjE5NSIsIjc2MjE5NCJdfX0.OUmMdi04jfPW_PpGU37op3N0oDH5vY0VcJnMOfgWAk0&group_id=599582`)
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.status).toBe(400)
    expect(responseBody.errors[0].message).toEqual(errorMessages.unsupportedDevice)
    expect(responseBody.errors[0].code).toEqual(errorCodes.plyDev2)
    expect(responseBody.errors[0]).toHaveProperty("exception")
  })

  test("Alternative Path - Unsupported device - Empty device category", async ({ request }) => {
    const response = await request.get(`${endpoint}${serviceGetmedia}?HKS=PLYAUT11160529666296ab7537ca&api_version=v5.95&region=argentina&device_manufacturer=windows&device_model=html5&device_type=html5&device_name=web_Ply_Aut&device_id=PLYAUT412141385&authpt=12e4i8l6a581a&authpn=amco&stream_type=smooth_streaming&user_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTM5OTA2NDEsImV4cCI6MTcxOTE3NDk0MSwidXNyIjp7InVzZXJfaWQiOiI1MzUxNjc0MyIsInVzZXJfdHlwZSI6IkNBUk5PVklQIiwidXNlcm5hbWUiOiJiZi5hcmdlbnRpbmEuaHViY29ycG1vY2suOTA4MTc1MjIwNDgzQGdtYWlsLmNvbSIsImVtYWlsIjoiYmYuYXJnZW50aW5hLmh1YmNvcnBtb2NrLjkwODE3NTIyMDQ4M0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJub21icmVQcnVlYmEiLCJsYXN0bmFtZSI6ImFwZWxsaWRvUHJ1ZWJhIiwiY291bnRyeV9jb2RlIjoiQVIiLCJyZWdpb24iOiJhcmdlbnRpbmEiLCJhY2NlcHRlZF90ZXJtcyI6MSwiZ2FtaWZpY2F0aW9uX2lkIjoiNjQ4MDgzZmFjZjBjODc0MDg4MjJmMWIzIiwicGFyZW50X2lkIjoiNTM1MTY3NDMiLCJhY2NvdW50IjoiODg3OTU5Njc4MTgyMzM3ODAiLCJwZ19nYXRld2F5IjoiaHViZ2F0ZSIsImFkbWluIjp0cnVlLCJ3Z19pZCI6IjI3In19.jdnFrZ9vGx9bbAbLzN2OEmVL4XniMVg3MN7GdD4GN2c&payway_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTY1NTc5NDIsImlzcyI6InBheXdheVwvbGluZWFsY2hhbm5lbHMiLCJwZ3MiOnsidXNlciI6IjUzNTE2MzIxIiwicGFyZW50IjoiNTM1MTYzMjEiLCJvZmZlciI6IjE0MzMwNTUwIiwicHVyY2hhc2UiOiI3OTg1NDc0MjEiLCJwcm9kdWN0dHlwZSI6IlBMQVlfVFYiLCJwbGF5Ijp7ImVuYWJsZWQiOnRydWUsImRldmljZXMiOm51bGwsInN0cmVhbXMiOm51bGx9LCJkbCI6eyJlbmFibGVkIjpudWxsLCJkZXZpY2VzIjpudWxsLCJleHAiOm51bGx9LCJucHZyIjp7InN0b3JhZ2UiOiIyMDAiLCJ0aW1lc2hpZnQiOiIyNCJ9LCJvYmplY3QiOiIyNzAwIiwiZ3JvdXBzIjpbIjc5MTQ0NCIsIjc5MTQzOSIsIjc5MTQzOCIsIjc5MTM4MiIsIjc5MTQzMSIsIjc5MTQxNSIsIjc5MTM4MCIsIjc5MTM2NSIsIjc5MTM2NCIsIjc5MTQxMSIsIjc5MTM5MyIsIjc5MTM5MSIsIjc5MTM3NiIsIjc5MTM3NSIsIjc5MTM3MyIsIjc5MTM3MiIsIjc5MTM3MSIsIjc5MTM1NCIsIjc5MTM1MyIsIjc5MTM1MSIsIjc5MTM0NiIsIjc5MTMzOCIsIjc5MTMzNCIsIjc5MTMzMiIsIjc5MTMzMSIsIjc5MTMzMCIsIjc5MTMyNyIsIjc5MTMyMiIsIjc5MTMyMSIsIjc5MTMyMCIsIjc5MTMxOSIsIjc5MTMxOCIsIjc5MTMxMyIsIjc5MTMxMCIsIjc5MTMwOSIsIjc5MTMwNyIsIjc5MTMwNiIsIjc5MTMwMyIsIjc5MTMwMSIsIjc5MTI5MyIsIjc5MTI4OCIsIjc5MTI1MCIsIjc5MTI0NyIsIjc5MTI0NiIsIjc5MTI0NSIsIjc5MTI5MSIsIjc5MTI4MCIsIjc5MTI3NCIsIjc5MTI3MCIsIjc5MTI2OSIsIjc5MTI2OCIsIjc5MTI2NyIsIjc5MTI2NSIsIjc5MTI2NCIsIjc5MTI2MCIsIjc5MTI1OSIsIjc5MTIzNiIsIjc5MTIzNSIsIjc5MTIyMCIsIjc5MTIxMCIsIjc5MTIwOSIsIjc5MTA1MyIsIjc5MTAzNiIsIjc4NTM3NCIsIjc4NTMwMCIsIjc4NTI5OSIsIjc4NTI4OSIsIjc4NTI4OCIsIjc4NTI2NyIsIjc4NTI2NiIsIjc4NTI2NSIsIjc4NTI0OSIsIjc4NTIxMSIsIjc4NTIxMCIsIjc4NTIwOSIsIjc4NDY5OSIsIjc4NDY4MSIsIjc4NDY0NSIsIjc4NDY0NCIsIjc4NDY0MyIsIjc4NDU3NyIsIjc4NDU3NSIsIjc4Mzg4NyIsIjc4Mzg4NiIsIjc4Mzg4NSIsIjc4MzgzMiIsIjc4MzgzMSIsIjc4MzgxMyIsIjc3NTMzMiIsIjc3NDA0MyIsIjc3NDA0MiIsIjc3MjEzOSIsIjc2NzQ5OSIsIjc2NjIxMiIsIjc2NjI1OSIsIjc2NjI0MyIsIjc2NjI0MiIsIjc2NjI0MSIsIjc2NjIyOSIsIjc2NjIyNSIsIjc2NjIwNyIsIjc2NjIwNiIsIjc2NjIwNSIsIjc2NjIwNCIsIjc2NjIwMyIsIjc2NjE2OSIsIjc2NjE2NyIsIjc2NjEzNyIsIjc2NjEzNiIsIjc2NDUxMSIsIjc2NDE4OCIsIjc2NDE4NiIsIjc2NDE4NSIsIjc2NDE4NCIsIjc2NDE4MiIsIjc2NDE4MSIsIjc2NDE2OCIsIjc2NDE1MiIsIjc2NDE1MCIsIjc2NDEyMyIsIjc2NDEyMiIsIjc2NDExMyIsIjc2MzQ3NiIsIjc2MzQ3NCIsIjc2MzM0NyIsIjc2MzM0NiIsIjc2MjM1OCIsIjc2MjMyMSIsIjc2MjMyMCIsIjc2MjMwOSIsIjc2MjI4OSIsIjc2MjI4OCIsIjc2MjMzOSIsIjc2MjMzOCIsIjc2MjMxOCIsIjc2MjMwNiIsIjc2MjMwNSIsIjc2MjMwNCIsIjc2MjMwMyIsIjc2MjMwMSIsIjc2MjMwMCIsIjc2MjI5OCIsIjc2MjI4NiIsIjc2MjI4NSIsIjc2MjI4NCIsIjc2MjI4MyIsIjc2MjI4MSIsIjc2MjI4MCIsIjc2MjI3OCIsIjc2MjI3NyIsIjc2MjI3NiIsIjc2MjI3NSIsIjc2MjI3NCIsIjc2MjI3MyIsIjc2MjI3MCIsIjc2MjI2OSIsIjc2MjI2NyIsIjc2MjI2NiIsIjc2MjI2NSIsIjc2MjI2NCIsIjc2MjI2MyIsIjc2MjI2MiIsIjc2MjI2MSIsIjc2MjI2MCIsIjc2MjI1OSIsIjc2MjI1OCIsIjc2MjI1NSIsIjc2MjI1NCIsIjc2MjI1MyIsIjc2MjI1MiIsIjc2MjI1MCIsIjc2MjI0NyIsIjc2MjI0NiIsIjc2MjI0NSIsIjc2MjI0MyIsIjc2MjI0MSIsIjc2MjI0MCIsIjc2MjIzOSIsIjc2MjIzOCIsIjc2MjIzNyIsIjc2MjIzNiIsIjc2MjIzNCIsIjc2MjIzMyIsIjc2MjIzMCIsIjc2MjIyOSIsIjc2MjIyOCIsIjc2MjIyNyIsIjc2MjIyNiIsIjc2MjIyNSIsIjc2MjIyMyIsIjc2MjIyMiIsIjc2MjIxNyIsIjc2MjIxNiIsIjc2MjIxMyIsIjc2MjIxMiIsIjc2MjIxMSIsIjc2MjIxMCIsIjc2MjIwOSIsIjc2MjIwNyIsIjc2MjIwNiIsIjc2MjIwNSIsIjc2MjIwNCIsIjc2MjE5NiIsIjc2MjE5NSIsIjc2MjE5NCJdfX0.OUmMdi04jfPW_PpGU37op3N0oDH5vY0VcJnMOfgWAk0&group_id=599582`)
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.status).toBe(400)
    expect(responseBody.errors[0].message).toEqual(errorMessages.unsupportedDevice)
    expect(responseBody.errors[0].code).toEqual(errorCodes.plyDev2)
    expect(responseBody.errors[0]).toHaveProperty("exception")
  })

  test("Alternative Path - User not logged In - Empty user token", async ({ request }) => {
    const response = await request.get(`${endpoint}${serviceGetmedia}?HKS=PLYAUT40483446066297daf62676&api_version=v5.95&region=argentina&device_manufacturer=windows&device_category=web&device_model=html5&device_type=html5&device_name=web_Ply_Aut&device_id=PLYAUT404834460&authpt=12e4i8l6a581a&authpn=amco&stream_type=smooth_streaming&payway_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTQwODA5ODcsImlzcyI6InBheXdheVwvcHVyY2hhc2VidXR0b25pbmZvIiwicGdzIjp7InVzZXIiOiI1MzUxNjc0MyIsInBhcmVudCI6IjUzNTE2NzQzIiwib2ZmZXIiOiIxNDMzMDU2MCIsInB1cmNoYXNlIjoiNzk4NTQ3NzAzIiwib2JqZWN0IjoiOTgwMCIsImdyb3VwcyI6WyI1OTk1ODIiXSwicGxheSI6eyJlbmFibGVkIjp0cnVlLCJkZXZpY2VzIjo1LCJzdHJlYW1zIjo1fSwiZGwiOnsiZW5hYmxlZCI6ZmFsc2UsImRldmljZXMiOm51bGwsImV4cCI6bnVsbH0sIm5wdnIiOnsic3RvcmFnZSI6bnVsbCwidGltZXNoaWZ0IjpudWxsfX19.vxovhjKSwaRQSuynaue5zGK2AN2ANOmab4FlLS94Nm4&group_id=599582`)
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.status).toBe(401)
    expect(responseBody.errors[0].message).toBe(errorMessages.userNotLoggedId)
    expect(responseBody.errors[0].code).toBe(errorCodes.usrUsr1)
    expect(responseBody.errors[0]).toHaveProperty("exception")
  })

  test("Alternative Path - Invalid Parameters - Empty Group ID", async ({ request }) => {
    const response = await request.get(`${endpoint}${serviceGetmedia}?HKS=PLYAUT40483446066297daf62676&api_version=v5.95&region=argentina&device_manufacturer=windows&device_category=web&device_model=html5&device_type=html5&device_name=web_Ply_Aut&device_id=PLYAUT404834460&authpt=12e4i8l6a581a&authpn=amco&stream_type=hls&user_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTM5OTQ4ODMsImV4cCI6MTcxOTE3OTE4MywidXNyIjp7InVzZXJfaWQiOiI1MzUxNjc0MyIsInVzZXJfdHlwZSI6IkNBUk5PVklQIiwidXNlcm5hbWUiOiJiZi5hcmdlbnRpbmEuaHViY29ycG1vY2suOTA4MTc1MjIwNDgzQGdtYWlsLmNvbSIsImVtYWlsIjoiYmYuYXJnZW50aW5hLmh1YmNvcnBtb2NrLjkwODE3NTIyMDQ4M0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJub21icmVQcnVlYmEiLCJsYXN0bmFtZSI6ImFwZWxsaWRvUHJ1ZWJhIiwiY291bnRyeV9jb2RlIjoiQVIiLCJyZWdpb24iOiJhcmdlbnRpbmEiLCJhY2NlcHRlZF90ZXJtcyI6MSwiZ2FtaWZpY2F0aW9uX2lkIjoiNjQ4MDgzZmFjZjBjODc0MDg4MjJmMWIzIiwicGFyZW50X2lkIjoiNTM1MTY3NDMiLCJhY2NvdW50IjoiODg3OTU5Njc4MTgyMzM3ODAiLCJwZ19nYXRld2F5IjoiaHViZ2F0ZSIsImFkbWluIjp0cnVlLCJ3Z19pZCI6IjI3In19.5SyVjp1l5crdRfx8XbrbW8B_MRubIQOACCPI8oadFcE&payway_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTQwODA5ODcsImlzcyI6InBheXdheVwvcHVyY2hhc2VidXR0b25pbmZvIiwicGdzIjp7InVzZXIiOiI1MzUxNjc0MyIsInBhcmVudCI6IjUzNTE2NzQzIiwib2ZmZXIiOiIxNDMzMDU2MCIsInB1cmNoYXNlIjoiNzk4NTQ3NzAzIiwib2JqZWN0IjoiOTgwMCIsImdyb3VwcyI6WyI1OTk1ODIiXSwicGxheSI6eyJlbmFibGVkIjp0cnVlLCJkZXZpY2VzIjo1LCJzdHJlYW1zIjo1fSwiZGwiOnsiZW5hYmxlZCI6ZmFsc2UsImRldmljZXMiOm51bGwsImV4cCI6bnVsbH0sIm5wdnIiOnsic3RvcmFnZSI6bnVsbCwidGltZXNoaWZ0IjpudWxsfX19.vxovhjKSwaRQSuynaue5zGK2AN2ANOmab4FlLS94Nm4`)
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.status).toBe(400)
    expect(responseBody.errors[0].message).toBe("Invalid Parameters")
    expect(responseBody.errors[0].code).toBe(errorCodes.plyPly4)
    expect(responseBody.errors[0]).toHaveProperty("exception")
    expect(isBase64(responseBody.errors[0].exception)).toBeTruthy
  })

  test("Alternative Path - Invalid Parameters - User Token Expired", async ({ request }) => {
    const response = await request.get(`${endpoint}${serviceGetmedia}?HKS=PLYAUT4080597736631c182e0c21&api_version=v5.95&region=argentina&device_manufacturer=windows&device_category=web&device_model=html5&device_type=html5&device_name=web_Ply_Aut&device_id=PLYAUT404834460&authpt=12e4i8l6a581a&authpn=amco&stream_type=smooth_streaming&user_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTQxMzY1MzQsImV4cCI6MTcwODMyMDgzNCwidXNyIjp7InVzZXJfaWQiOiI1MzUxNjc0MyIsInVzZXJfdHlwZSI6IkNBUk5PVklQIiwidXNlcm5hbWUiOiJiZi5hcmdlbnRpbmEuaHViY29ycG1vY2suOTA4MTc1MjIwNDgzQGdtYWlsLmNvbSIsImVtYWlsIjoiYmYuYXJnZW50aW5hLmh1YmNvcnBtb2NrLjkwODE3NTIyMDQ4M0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJub21icmVQcnVlYmEiLCJsYXN0bmFtZSI6ImFwZWxsaWRvUHJ1ZWJhIiwiY291bnRyeV9jb2RlIjoiQVIiLCJyZWdpb24iOiJhcmdlbnRpbmEiLCJhY2NlcHRlZF90ZXJtcyI6MSwiZ2FtaWZpY2F0aW9uX2lkIjoiNjQ4MDgzZmFjZjBjODc0MDg4MjJmMWIzIiwicGFyZW50X2lkIjoiNTM1MTY3NDMiLCJhY2NvdW50IjoiODg3OTU5Njc4MTgyMzM3ODAiLCJwZ19nYXRld2F5IjoiaHViZ2F0ZSIsImFkbWluIjp0cnVlLCJ3Z19pZCI6IjI3In19.likM3ijulflHPNNq2BKkVbvBeivrZGbZ0yY2G-iGeD4&group_id=599582`)
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.status).toBe(401)
    expect(responseBody.errors[0].message).toBe(errorMessages.invalidUserToken)
    expect(responseBody.errors[0].code).toBe(errorCodes.usrJWT2)
    expect(isBase64(responseBody.errors[0].exception)).toBeTruthy
  })

  test("Alternative Path - Invalid Parameters - Payway token has different Group ID", async ({ request }) => {
    const response = await request.get(`${endpoint}${serviceGetmedia}?HKS=PLYAUT3316212376631cb2688531&api_version=v5.95&region=argentina&device_manufacturer=windows&device_category=web&device_model=html5&device_type=html5&device_name=web_Ply_Aut&device_id=PLYAUT331621237&authpt=12e4i8l6a581a&authpn=amco&stream_type=hls&user_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTQ1MzkwMDIsImV4cCI6MTcxOTcyMzMwMiwidXNyIjp7InVzZXJfaWQiOiI1MzUxNjc0MyIsInVzZXJfdHlwZSI6IkNBUk5PVklQIiwidXNlcm5hbWUiOiJiZi5hcmdlbnRpbmEuaHViY29ycG1vY2suOTA4MTc1MjIwNDgzQGdtYWlsLmNvbSIsImVtYWlsIjoiYmYuYXJnZW50aW5hLmh1YmNvcnBtb2NrLjkwODE3NTIyMDQ4M0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJub21icmVQcnVlYmEiLCJsYXN0bmFtZSI6ImFwZWxsaWRvUHJ1ZWJhIiwiY291bnRyeV9jb2RlIjoiQVIiLCJyZWdpb24iOiJhcmdlbnRpbmEiLCJhY2NlcHRlZF90ZXJtcyI6MSwiZ2FtaWZpY2F0aW9uX2lkIjoiNjQ4MDgzZmFjZjBjODc0MDg4MjJmMWIzIiwicGFyZW50X2lkIjoiNTM1MTY3NDMiLCJhY2NvdW50IjoiODg3OTU5Njc4MTgyMzM3ODAiLCJwZ19nYXRld2F5IjoiaHViZ2F0ZSIsImFkbWluIjp0cnVlLCJ3Z19pZCI6IjI3In19.OWiF83O_YYQYKI9Ubm5D4_mjeqoBXgfsafWJjhH-cWc&payway_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE5MTQ2MjUxMDgsImlzcyI6InBheXdheS9wdXJjaGFzZWJ1dHRvbmluZm8iLCJwZ3MiOnsidXNlciI6IjUzNTE2NzQzIiwicGFyZW50IjoiNTM1MTY3NDMiLCJvZmZlciI6IjE0MzMwNTYwIiwicHVyY2hhc2UiOiI3OTg1NDc3MDMiLCJvYmplY3QiOiI5ODAwIiwiZ3JvdXBzIjpbIjY4OTQ0MiJdLCJwbGF5Ijp7ImVuYWJsZWQiOnRydWUsImRldmljZXMiOjUsInN0cmVhbXMiOjV9LCJkbCI6eyJlbmFibGVkIjpmYWxzZSwiZGV2aWNlcyI6bnVsbCwiZXhwIjpudWxsfSwibnB2ciI6eyJzdG9yYWdlIjpudWxsLCJ0aW1lc2hpZnQiOm51bGx9fX0.Jxc5NGqU7E_EG3P-ZMCUzrR5dVuo2q71FSuMz-SiSoM&group_id=599582`)
    //console.log(`${endpoint}${serviceGetmedia}?HKS=PLYAUT4080597736631c182e0c21&api_version=v5.95&region=argentina&device_manufacturer=windows&device_category=web&device_model=html5&device_type=html5&device_name=web_Ply_Aut&device_id=PLYAUT404834460&authpt=12e4i8l6a581a&authpn=amco&stream_type=smooth_streaming&user_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTQ1MzY1MzQsImV4cCI6MTcxOTcyMDgzNCwidXNyIjp7InVzZXJfaWQiOiI1MzUxNjc0MyIsInVzZXJfdHlwZSI6IkNBUk5PVklQIiwidXNlcm5hbWUiOiJiZi5hcmdlbnRpbmEuaHViY29ycG1vY2suOTA4MTc1MjIwNDgzQGdtYWlsLmNvbSIsImVtYWlsIjoiYmYuYXJnZW50aW5hLmh1YmNvcnBtb2NrLjkwODE3NTIyMDQ4M0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJub21icmVQcnVlYmEiLCJsYXN0bmFtZSI6ImFwZWxsaWRvUHJ1ZWJhIiwiY291bnRyeV9jb2RlIjoiQVIiLCJyZWdpb24iOiJhcmdlbnRpbmEiLCJhY2NlcHRlZF90ZXJtcyI6MSwiZ2FtaWZpY2F0aW9uX2lkIjoiNjQ4MDgzZmFjZjBjODc0MDg4MjJmMWIzIiwicGFyZW50X2lkIjoiNTM1MTY3NDMiLCJhY2NvdW50IjoiODg3OTU5Njc4MTgyMzM3ODAiLCJwZ19nYXRld2F5IjoiaHViZ2F0ZSIsImFkbWluIjp0cnVlLCJ3Z19pZCI6IjI3In19.GbuEDMGfLhKz_Th2fHVwGgKGtET9pd2P2r2Ri8TE3Jw&payway_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTQ2MjI2MzksImlzcyI6InBheXdheS9wdXJjaGFzZWJ1dHRvbmluZm8iLCJwZ3MiOnsidXNlciI6IjUzNTE2NzQzIiwicGFyZW50IjoiNTM1MTY3NDMiLCJvZmZlciI6IjE0MzMwNTYwIiwicHVyY2hhc2UiOiI3OTg1NDc3MDMiLCJvYmplY3QiOiI5ODAwIiwiZ3JvdXBzIjpbIjEyMzQ1NiJdLCJwbGF5Ijp7ImVuYWJsZWQiOnRydWUsImRldmljZXMiOjUsInN0cmVhbXMiOjV9LCJkbCI6eyJlbmFibGVkIjpmYWxzZSwiZGV2aWNlcyI6bnVsbCwiZXhwIjpudWxsfSwibnB2ciI6eyJzdG9yYWdlIjpudWxsLCJ0aW1lc2hpZnQiOm51bGx9fX0.aXK_7XAzklkcOEWJRo8ecZZQHEWipyfCMHOPjaerZVE&group_id=599582`)
    const responseBody = JSON.parse(await response.text())

    //console.log(responseBody)

    expect(response.status()).toBe(200)
    expect(responseBody.status).toBe(400)
    expect(responseBody.errors[0].message).toBe(errorMessages.invalidParameters)
    expect(responseBody.errors[0].code).toBe(errorCodes.plyDev1)
    expect(isBase64(responseBody.errors[0].exception)).toBeTruthy
  })

  test("Alternative Path - Invalid Parameters - JWT Play enabled is false", async ({ request }) => {
    const response = await request.get(`${endpoint}${serviceGetmedia}?HKS=PLYAUT3316212376631cb2688531&api_version=v5.95&region=argentina&device_manufacturer=windows&device_category=web&device_model=html5&device_type=html5&device_name=web_Ply_Aut&device_id=PLYAUT331621237&authpt=12e4i8l6a581a&authpn=amco&stream_type=hls&user_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTQ1MzkwMDIsImV4cCI6MTcxOTcyMzMwMiwidXNyIjp7InVzZXJfaWQiOiI1MzUxNjc0MyIsInVzZXJfdHlwZSI6IkNBUk5PVklQIiwidXNlcm5hbWUiOiJiZi5hcmdlbnRpbmEuaHViY29ycG1vY2suOTA4MTc1MjIwNDgzQGdtYWlsLmNvbSIsImVtYWlsIjoiYmYuYXJnZW50aW5hLmh1YmNvcnBtb2NrLjkwODE3NTIyMDQ4M0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJub21icmVQcnVlYmEiLCJsYXN0bmFtZSI6ImFwZWxsaWRvUHJ1ZWJhIiwiY291bnRyeV9jb2RlIjoiQVIiLCJyZWdpb24iOiJhcmdlbnRpbmEiLCJhY2NlcHRlZF90ZXJtcyI6MSwiZ2FtaWZpY2F0aW9uX2lkIjoiNjQ4MDgzZmFjZjBjODc0MDg4MjJmMWIzIiwicGFyZW50X2lkIjoiNTM1MTY3NDMiLCJhY2NvdW50IjoiODg3OTU5Njc4MTgyMzM3ODAiLCJwZ19nYXRld2F5IjoiaHViZ2F0ZSIsImFkbWluIjp0cnVlLCJ3Z19pZCI6IjI3In19.OWiF83O_YYQYKI9Ubm5D4_mjeqoBXgfsafWJjhH-cWc&payway_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE5MTQ2MjUxMDgsImlzcyI6InBheXdheS9wdXJjaGFzZWJ1dHRvbmluZm8iLCJwZ3MiOnsidXNlciI6IjUzNTE2NzQzIiwicGFyZW50IjoiNTM1MTY3NDMiLCJvZmZlciI6IjE0MzMwNTYwIiwicHVyY2hhc2UiOiI3OTg1NDc3MDMiLCJvYmplY3QiOiI5ODAwIiwiZ3JvdXBzIjpbIjU5OTU4MiJdLCJwbGF5Ijp7ImVuYWJsZWQiOmZhbHNlLCJkZXZpY2VzIjo1LCJzdHJlYW1zIjo1fSwiZGwiOnsiZW5hYmxlZCI6ZmFsc2UsImRldmljZXMiOm51bGwsImV4cCI6bnVsbH0sIm5wdnIiOnsic3RvcmFnZSI6bnVsbCwidGltZXNoaWZ0IjpudWxsfX19.YwpIyk8PWZ72wK1FEtzx0RJ5e3noQh1BeLPVzTQ_k98&group_id=599582`)
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.status).toBe(400)
    expect(responseBody.errors[0].message).toBe(errorMessages.contentWasntPurchased)
    expect(responseBody.errors[0].code).toBe(errorCodes.plyPly7)
    expect(isBase64(responseBody.errors[0].exception)).toBeTruthy
  })

})

// Función para validar si un string es base64
function isBase64(str) {
  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
}