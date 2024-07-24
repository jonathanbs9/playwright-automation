import { test, expect } from '@playwright/test';
var hks;

const errorMessages = {
    deviceNotSupported: "device_not_supported",
    invalidDeviceInfo: "invalid_device_info",
    userNotLoggedIn: "User Not logged in"
}

const errorCodes = {
    errorParams: "error_params",
    errorDeviceInfo: "invalid_device_info",
    usrUsr1: "USR_USR_00001"
}

const generateDeviceID = () => {
    return "PLYAUT" + Math.floor(Math.random() * (999999999 - 111111111 + 1) + 111111111);
}

const services = {
    login: "services/user/login?",
    attach: "services/device/attach?",
    list: "services/device/list?"
}

const constructServiceURL = (queryParams: Record<string, string>): string => {
    const baseURL = 'https://aws-us-east-1-cchile-cvideo-mfw-iptv-prd.clarovideo.net/';
    const service = "services/device/attach?";
    const queryString = new URLSearchParams(queryParams).toString();
    return `${baseURL}${service}${queryString}`;
}

const constructServiceDeviceListURL = (queryParamsList: Record<string, string>): string => {
    const baseURL = 'https://aws-us-east-1-cchile-cvideo-mfw-iptv-prd.clarovideo.net/';
    const service = services.list;
    const queryString = new URLSearchParams(queryParamsList).toString();
    return `${baseURL}${service}${queryString}`;
}

const constructServiceLoginURL = (queryParamsLogin: Record<string, string>): string => {
    const baseURL = 'https://aws-us-east-1-cchile-cvideo-mfw-iptv-prd.clarovideo.net/';
    const service = services.login;
    const queryStringLogin = new URLSearchParams(queryParamsLogin).toString();

    return `${baseURL}${service}${queryStringLogin}`;
}

const queryParams = {
    device_type: "html5",
    device_manufacturer: "windows",
    device_category: "web",
    device_model: "html5",
    api_version: "v5.92",
    authpt: "12e4i8l6a581a",
    authpn: "amco",
    region: "chile",
    HKS: generateDeviceID() + "6633fa59938eb",
    group_id: "599582",
    device_id: generateDeviceID(),
    device_name: "DeviceTest",
    device_so: "device_so"
}

const queryParamsList = {
    HKS: "",
    api_version: "v5.92",
    region: "chile",
    authpt: "12e4i8l6a581a",
    authpn: "amco",
}

const queryParamsLogin = {
    HKS: "HKSRANDOM1234",
    api_version: "v5.93",
    region: "chile",
    device_manufacturer: "windows",
    device_category: "web",
    device_model: "html5",
    device_type: "html5",
    device_name: "AutomationPlaywrigth",
    device_id: generateDeviceID(),
    authpt: "12e4i8l6a581a",
    authpn: "amco",
    username: "amcopruebas.aut.clply+amco_100@gmail.com",
    password: "Player123"
}

test.describe('Device', () => {

    test.only("Should Login and get user_token, HKS ... ", async ({ request }) => {
        const url = constructServiceLoginURL({ ...queryParamsLogin });

        const response = await request.get(url);
        var responseBody = await response.json()
        expect(responseBody.response).toHaveProperty("session_stringvalue")
        expect(typeof responseBody.response.session_stringvalue).toBe('string')
        hks = responseBody.response.session_stringvalue;
    })

    test("Device Attach - Alternative Path - Empty device type", async ({ request }) => {
        const url = constructServiceURL({ ...queryParams, device_type: "" });
        const response = await request.get(url);
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200)
        expect(responseBody.status).toBe(1)
        expect(responseBody.msg).toBe("ERROR")
        expect(responseBody.errors.error[0]).toBe(errorMessages.deviceNotSupported)
        expect(responseBody.errors.code).toBe(errorCodes.errorParams)
    })

    test("Device Attach - Alternative Path - Empty device manufacturer", async ({ request }) => {
        const url = constructServiceURL({ ...queryParams, device_manufacturer: "" });
        const response = await request.get(url);
        const responseBody = JSON.parse(await response.text());


        expect(response.status()).toBe(200)
        expect(responseBody.status).toBe(1)
        expect(responseBody.msg).toBe("ERROR")
        expect(responseBody.errors.error[0]).toBe(errorMessages.deviceNotSupported)
        expect(responseBody.errors.code).toBe(errorCodes.errorParams)
    })

    test("Device Attach - Alternative Path - Empty device category", async ({ request }) => {
        const url = constructServiceURL({ ...queryParams, device_category: "" });
        const response = await request.get(url);
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200)
        expect(responseBody.status).toBe(1)
        expect(responseBody.msg).toBe("ERROR")
        expect(responseBody.errors.error[0]).toBe(errorMessages.deviceNotSupported)
        expect(responseBody.errors.code).toBe(errorCodes.errorParams)
    })

    test("Device Attach - Alternative Path - Empty device model", async ({ request }) => {
        const url = constructServiceURL({ ...queryParams, device_model: "" });
        const response = await request.get(url);
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200)
        expect(responseBody.status).toBe(1)
        expect(responseBody.msg).toBe("ERROR")
        expect(responseBody.errors.error[0]).toBe(errorMessages.deviceNotSupported)
        expect(responseBody.errors.code).toBe(errorCodes.errorParams)
    })

    test("Device Attach - Alternative Path - Empty device SO", async ({ request }) => {
        const url = constructServiceURL({ ...queryParams, device_so: "" });
        const response = await request.get(url);
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200)
        expect(responseBody.status).toBe(1)
        expect(responseBody.msg).toBe("ERROR")
        expect(responseBody.errors.error[0]).toBe(errorMessages.invalidDeviceInfo)
        expect(responseBody.errors.code).toBe(errorCodes.errorDeviceInfo)
    })

    test("Device Attach - Alternative Path - Empty device ID", async ({ request }) => {
        const url = constructServiceURL({ ...queryParams, device_id: "" });
        const response = await request.get(url);
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200)
        expect(responseBody.status).toBe(1)
        expect(responseBody.msg).toBe("ERROR")
        expect(responseBody.errors.error[0]).toBe(errorMessages.invalidDeviceInfo)
        expect(responseBody.errors.code).toBe(errorCodes.errorDeviceInfo)
    })

    test("Device Attach - Alternative Path - Empty group ID", async ({ request }) => {
        const url = constructServiceURL({ ...queryParams, group_id: "" });
        const response = await request.get(url);
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200)
        expect(responseBody.status).toBe(1)
        expect(responseBody.msg).toBe("ERROR")
        expect(responseBody.errors.error[0]).toBe(errorMessages.invalidDeviceInfo)
        expect(responseBody.errors.code).toBe(errorCodes.errorDeviceInfo)
    })

    test("Device List - Alternative Path - Empty HKS", async ({ request }) => {
        const url = constructServiceDeviceListURL({ ...queryParamsList, HKS: "" });
        const response = await request.get(url);
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.status).toBe(401)
        expect(responseBody.errors[0].message).toBe(errorMessages.userNotLoggedIn)
        expect(responseBody.errors[0].code).toBe(errorCodes.usrUsr1)
        expect(isBase64(responseBody.errors[0].exception)).toBeTruthy
    })

    test("Device List - Alternative Path - Invalid HKS", async ({ request }) => {
        const url = constructServiceDeviceListURL({ ...queryParamsList, HKS: generateDeviceID() });
        const response = await request.get(url);
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.status).toBe(401)
        expect(responseBody.errors[0].message).toBe(errorMessages.userNotLoggedIn)
        expect(responseBody.errors[0].code).toBe(errorCodes.usrUsr1)
        expect(isBase64(responseBody.errors[0].exception)).toBeTruthy
    })

    test.only("Device List - Happy Path - Empty region", async ({ request }) => {
        // HKS tiene que provenir de un login válido
        console.log(hks)
        const url = constructServiceDeviceListURL({ ...queryParamsList, HKS: hks });
        const response = await request.get(url);
        const responseBody = JSON.parse(await response.text())
        console.log(url)
        console.log(responseBody)

        expect(response.status()).toBe(200)
        expect(responseBody.status).toBe(200)
        expect(responseBody.response).toHaveProperty("devices")
        expect(Array.isArray(responseBody.devices)).toBeTruthy

    })


    /*
    test("Device Attach - Happy Path - Empty device name", async ({ request }) => {
        const url = constructServiceURL({ ...queryParams, device_name: "" });
        const response = await request.get(url);
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200)
        expect(responseBody).toHaveProperty('response')
        expect(responseBody).toHaveProperty('purchase');
        expect(responseBody).toBe("0");
        expect(responseBody).toBe("OK");
    })
    
    test("Device Attach - Happy Path - Empty region (optional)", async ({ request }) => {
        const url = constructServiceURL({ ...queryParams, region: "" });
        const response = await request.get(url);
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200)
        expect(responseBody).toHaveProperty('response')
        expect(responseBody).toHaveProperty('purchase');
        expect(responseBody).toBe("0");
        expect(responseBody).toBe("OK");
    })*/

    test("Device Attach - Happy Path - Empty HKS (optional)", async ({ request }) => {
        const url = constructServiceURL({ ...queryParams, HKS: "" });
        const response = await request.get(url);
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200)
        expect(responseBody).toHaveProperty('response')
        expect(responseBody).toHaveProperty('purchase');
        expect(responseBody).toBe("0");
        expect(responseBody).toBe("OK");
    })

    /*test("CRUD For Device - Attach - List - Detach", async ({ request }) => {
        const responseAttach = await request.get(`${endpoint}${service}attach?device_type=html5&device_manufacturer=windows&device_model=html5&api_version=v5.92&authpt=12e4i8l6a581a&authpn=amco&region=argentina&HKS=PLYAUT9598155296633fa59938eb&group_id=599582&device_id=PLYAUT9879&device_name=oldname&device_so=device_so`)
        const responseAttachBody = JSON.parse(await responseAttach.text())

        expect(responseAttach.status()).toBe(200)
        expect(responseAttachBody.status).toBe("0")
        expect(responseAttachBody.msg).toBe("OK")

        const responseList = await request.get(`${endpoint}${service}list?HKS=PLYAUT9598155296633fa59938eb&api_version=v5.92&region=argentina&authpt=12e4i8l6a581a&authpn=amco`)
        const responseListBody = JSON.parse(await responseList.text())

        expect(responseAttach.status()).toBe(200)
        expect(responseListBody.status).toBe(200)
        expect(responseListBody.response.devices[0].real_device_id).toBe(deviceID)

    })
    */
})

// Función para validar si un string es base64
function isBase64(str) {
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}