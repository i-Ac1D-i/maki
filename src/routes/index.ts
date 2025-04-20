import express from "express"

import { LoginWithCustomID } from "./client/LoginWithCustomID";
import { ReportDeviceInfo } from "./client/ReportDeviceInfo";
import { UpdateUserTitleDisplayName } from "./client/UpdateUserTitleDisplayName";
import { GetTime } from "./client/GetTime";
import { ExecuteFunction } from "./cloudScript/ExecuteFunction";
import { GetTitleData } from "./client/GetTitleData";
import { GetPlayerCombinedInfo } from "./client/GetPlayerCombinedInfo";


const app = express();
app.use(express.json());

// POST /Client/LoginWithCustomID
app.post("/Client/LoginWithCustomID", LoginWithCustomID);

// POST /Client/ReportDeviceInfo
app.post("/Client/ReportDeviceInfo", ReportDeviceInfo);

// POST /Client/UpdateUserTitleDisplayName
app.post("/Client/UpdateUserTitleDisplayName", UpdateUserTitleDisplayName);

// POST /Client/GetTime
app.post("/Client/GetTime", GetTime);

// POST /CloudScript/ExecuteFunction (handles LOGIN_AUTH, LOGIN_CHECK, GUILD_CHECK)
app.post("/CloudScript/ExecuteFunction", ExecuteFunction);

// POST /Client/GetTitleData
app.post("/Client/GetTitleData", GetTitleData);

// POST /Client/GetPlayerCombinedInfo
app.post("/Client/GetPlayerCombinedInfo", GetPlayerCombinedInfo);

export default app;
