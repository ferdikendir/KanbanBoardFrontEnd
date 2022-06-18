export class EndPoint{
    public static readonly LOGIN = "auth/login";
    public static readonly LOGOUT = "logout";

    public static readonly GET_ALL_PROJECT = "project/getall";
    public static readonly GET_ALL_USER_BY_PROJECT_ID = "project/getalluserbyprojectid";
    public static readonly ADD_PROJECT = "project/addproject";

    public static readonly ADD_USER_TO_PROJECT = "project/addusertoproject";

    public static readonly GET_ALL_TASK_BY_PROJECT_ID = "tasklist/getalltaskbyprojectid";
    public static readonly GET_ALL_TASK_LIST_HEADER = "tasklistheader/getall";
    public static readonly ADD_NEW_TASK_LIST_HEADER = "tasklistheader/addheader";
    public static readonly GET_ALL_TASK_LIST_HEADER_BY_PROJECT_ID = "tasklistheader/getallheaderbyprojectid";
    public static readonly ADD_HEADER_TO_PROJECT = "tasklistheader/addheadertoproject";
    public static readonly UPDATE_CARD = "card/updatecard";
    public static readonly ADD_CARD = "card/addcard";
    public static readonly MOVE_CARD = "card/movecard";
    public static readonly UPDATE_TASK_LIST_HEADER = "tasklistheader/updatetasklistheader";
    public static readonly UPDATE_TASK_LİST = "tasklist/updatetasklist";

    public static readonly UPDATE_PROFİLE = "user/updateprofile";
    public static readonly DELETE_CARD = "card/deletecard";
}