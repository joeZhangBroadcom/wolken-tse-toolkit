// Default Color Rules for Wolken Toolkit
// This file contains the default coloring rules that can be loaded externally
window.DEFAULT_COLOR_RULES = [
    {
        "id": "slo_overdue",
        "name": "🔥 SLO Overdue",
        "enabled": true,
        "priority": 1,
        "columnToColor": "SLODueDate",
        "column": "SLODueDate",
        "dataType": "datetime",
        "conditions": [
            {
                "uniqueId": "1",
                "conditionId": "1",
                "column": "SLODueDate",
                "dataType": "datetime",
                "operator": "is_overdue",
                "group": "1",
                "logicOperator": "AND"
            },
            {
                "uniqueId": "2",
                "conditionId": "2",
                "column": "SLODueDate",
                "dataType": "datetime",
                "operator": "is_empty",
                "group": "1"
            }
        ],
        "logicalExpression": "(Condition 1 AND Condition 2)",
        "groupLogic": {
            "1_2": "OR"
        },
        "logicOperators": ["AND"],
        "styling": {
            "backgroundColor": "#f44336",
            "textColor": "#ffffff",
            "fontWeight": "bold",
            "icon": "⚠️",
            "iconPosition": "left",
            "customIcon": ""
        }
    },
    {
        "id": "slo_critical_overdue",
        "name": "🔥 SLO Critical P1 Overdue",
        "enabled": true,
        "priority": 2,
        "columnToColor": "SLODueDate",
        "column": "SLODueDate",
        "dataType": "datetime",
        "conditions": [
            {
                "uniqueId": "1",
                "conditionId": "1",
                "column": "SLODueDate",
                "dataType": "datetime",
                "operator": "is_overdue",
                "group": "1"
            },
            {
                "uniqueId": "2",
                "conditionId": "2",
                "column": "SeverityLevel",
                "dataType": "text",
                "operator": "equals",
                "group": "1",
                "value": "p1",
                "caseSensitive": false,
                "logicOperator": "AND"
            }
        ],
        "logicalExpression": "(Condition 1 AND Condition 2)",
        "groupLogic": {
            "1_2": "OR"
        },
        "logicOperators": ["AND"],
        "styling": {
            "backgroundColor": "#ff1744",
            "textColor": "#ffffff",
            "fontWeight": "bold",
            "icon": "🔥",
            "iconPosition": "left",
            "customIcon": ""
        }
    },
    {
        "id": "slo_warning",
        "name": "🟠 SLO Warning < 30 minutes",
        "enabled": true,
        "priority": 3,
        "columnToColor": "SLODueDate",
        "column": "SLODueDate",
        "dataType": "datetime",
        "conditions": [
            {
                "uniqueId": "1",
                "conditionId": "1",
                "column": "SLODueDate",
                "dataType": "datetime",
                "operator": "less_than_future",
                "group": "1",
                "value": "30",
                "unit": "minutes",
                "logicOperator": "OR"
            },
            {
                "uniqueId": "2",
                "conditionId": "2",
                "column": "SLOActualDate",
                "dataType": "datetime",
                "operator": "is_empty",
                "group": "1"
            }
        ],
        "logicalExpression": "(Condition 1 OR Condition 2)",
        "groupLogic": {
            "1_2": "OR"
        },
        "logicOperators": ["OR"],
        "styling": {
            "backgroundColor": "#ff9800",
            "textColor": "#ffffff",
            "fontWeight": "normal",
            "icon": "",
            "iconPosition": "left",
            "customIcon": ""
        }
    },
    {
        "id": "slo_responded_late",
        "name": "🟣 SLO Responded Late",
        "enabled": true,
        "priority": 5,
        "columnToColor": "SLOActualDate",
        "column": "SLOActualDate",
        "dataType": "datetime",
        "conditions": [
            {
                "uniqueId": "1",
                "conditionId": "1",
                "column": "SLOActualDate",
                "dataType": "datetime",
                "operator": "after_column",
                "group": "1",
                "compareColumn": "SLODueDate"
            }
        ],
        "logicalExpression": "Condition 1",
        "groupLogic": {
            "1_2": "OR"
        },
        "logicOperators": [],
        "styling": {
            "backgroundColor": "#9c27b0",
            "textColor": "#ffffff",
            "fontWeight": "normal",
            "icon": "",
            "iconPosition": "left",
            "customIcon": ""
        }
    },
    {
        "id": "case_owner_empty",
        "name": "🟡 Case Owner Missing",
        "enabled": true,
        "priority": 6,
        "columnToColor": "assignedUserName",
        "column": "assignedUserName",
        "dataType": "text",
        "conditions": [
            {
                "uniqueId": "1",
                "conditionId": "1",
                "column": "assignedUserName",
                "dataType": "text",
                "operator": "is_empty",
                "group": "1",
                "caseSensitive": false
            }
        ],
        "logicalExpression": "Condition 1",
        "groupLogic": {
            "1_2": "OR"
        },
        "logicOperators": [],
        "styling": {
            "backgroundColor": "#ffeb3b",
            "textColor": "#000000",
            "fontWeight": "normal",
            "icon": "",
            "iconPosition": "left",
            "customIcon": ""
        }
    },
    {
        "id": "nad_missing_after_response",
        "name": "🔴 NAD Missing or overdue",
        "enabled": true,
        "priority": 7,
        "columnToColor": "nextActionDate",
        "column": "nextActionDate",
        "dataType": "datetime",
        "conditions": [
            {
                "uniqueId": "1",
                "conditionId": "1",
                "column": "nextActionDate",
                "dataType": "datetime",
                "operator": "is_empty",
                "group": "1",
                "logicOperator": "AND"
            },
            {
                "uniqueId": "2",
                "conditionId": "2",
                "column": "nextActionDate",
                "dataType": "datetime",
                "operator": "is_not_empty",
                "group": "1"
            },
            {
                "uniqueId": "3",
                "conditionId": "3",
                "column": "nextActionDate",
                "dataType": "datetime",
                "operator": "is_overdue",
                "group": "2"
            }
        ],
        "logicalExpression": "(Condition 1 AND Condition 2) OR Condition 3",
        "groupLogic": {
            "1_2": "OR"
        },
        "logicOperators": ["AND", "AND"],
        "styling": {
            "backgroundColor": "#f44336",
            "textColor": "#ffffff",
            "fontWeight": "bold",
            "icon": "🔥",
            "iconPosition": "left",
            "customIcon": ""
        }
    },
    {
        "id": "nad_warning",
        "name": "🟡 NAD Warning < 3 Hours",
        "enabled": true,
        "priority": 9,
        "columnToColor": "nextActionDate",
        "column": "nextActionDate",
        "dataType": "datetime",
        "conditions": [
            {
                "uniqueId": "1",
                "conditionId": "1",
                "column": "nextActionDate",
                "dataType": "datetime",
                "operator": "less_than_future",
                "group": "1",
                "value": "3",
                "unit": "hours"
            }
        ],
        "logicalExpression": "Condition 1",
        "groupLogic": {
            "1_2": "OR"
        },
        "logicOperators": [],
        "styling": {
            "backgroundColor": "#ffeb3b",
            "textColor": "#000000",
            "fontWeight": "normal",
            "icon": "",
            "iconPosition": "left",
            "customIcon": ""
        }
    },
    {
        "id": "nad_future",
        "name": "🟢 NAD Green > 3 hours",
        "enabled": true,
        "priority": 10,
        "columnToColor": "nextActionDate",
        "column": "nextActionDate",
        "dataType": "datetime",
        "conditions": [
            {
                "uniqueId": "1",
                "conditionId": "1",
                "column": "nextActionDate",
                "dataType": "datetime",
                "operator": "more_than_future",
                "group": "1",
                "value": "3",
                "unit": "hours"
            }
        ],
        "logicalExpression": "Condition 1",
        "groupLogic": {
            "1_2": "OR"
        },
        "logicOperators": [],
        "styling": {
            "backgroundColor": "#4caf50",
            "textColor": "#ffffff",
            "fontWeight": "normal",
            "icon": "✅",
            "iconPosition": "left",
            "customIcon": ""
        }
    },
    {
        "id": "status_customer_responded",
        "name": "🟡 Open Responded",
        "enabled": true,
        "priority": 11,
        "columnToColor": "requestStatus",
        "column": "requestStatus",
        "dataType": "text",
        "conditions": [
            {
                "uniqueId": "1",
                "conditionId": "1",
                "column": "requestStatus",
                "dataType": "text",
                "operator": "contains",
                "group": "1",
                "value": "Customer Responded",
                "caseSensitive": false,
                "logicOperator": "OR"
            },
            {
                "uniqueId": "2",
                "conditionId": "2",
                "column": "requestStatus",
                "dataType": "text",
                "operator": "contains",
                "group": "1",
                "value": "open-engineering",
                "caseSensitive": false
            }
        ],
        "logicalExpression": "(Condition 1 OR Condition 2)",
        "groupLogic": {
            "1_2": "OR"
        },
        "logicOperators": ["OR"],
        "styling": {
            "backgroundColor": "#ffeb3b",
            "textColor": "#000000",
            "fontWeight": "normal",
            "icon": "📌",
            "iconPosition": "left",
            "customIcon": ""
        }
    },
    {
        "id": "status_severity1_uplift",
        "name": "🔥 Severity 1 Uplift",
        "enabled": true,
        "priority": 13,
        "columnToColor": "requestStatus",
        "column": "requestStatus",
        "dataType": "text",
        "conditions": [
            {
                "uniqueId": "1",
                "conditionId": "1",
                "column": "requestStatus",
                "dataType": "text",
                "operator": "equals",
                "group": "1",
                "value": "Open-Severity 1 Uplift",
                "caseSensitive": false
            }
        ],
        "logicalExpression": "Condition 1",
        "groupLogic": {
            "1_2": "OR"
        },
        "logicOperators": [],
        "styling": {
            "backgroundColor": "#ff1744",
            "textColor": "#ffffff",
            "fontWeight": "bold",
            "icon": "🆘",
            "iconPosition": "left",
            "customIcon": ""
        }
    },
    {
        "id": "status_reviewing_customer_response",
        "name": "🟣 Reviewing Customer Response",
        "enabled": true,
        "priority": 14,
        "columnToColor": "requestStatus",
        "column": "requestStatus",
        "dataType": "text",
        "conditions": [
            {
                "uniqueId": "1",
                "conditionId": "1",
                "column": "requestStatus",
                "dataType": "text",
                "operator": "equals",
                "group": "1",
                "value": "Soft Closed-Reviewing Customer Response",
                "caseSensitive": false
            }
        ],
        "logicalExpression": "Condition 1",
        "groupLogic": {
            "1_2": "OR"
        },
        "logicOperators": [],
        "styling": {
            "backgroundColor": "#8e24aa",
            "textColor": "#ffffff",
            "fontWeight": "normal",
            "icon": "📌",
            "iconPosition": "left",
            "customIcon": ""
        }
    },
    {
        "id": "status_soft_closed_fresh",
        "name": "🟢 Soft Closed (Fresh)",
        "enabled": true,
        "priority": 15,
        "columnToColor": "requestStatus",
        "column": "requestStatus",
        "dataType": "text",
        "conditions": [
            {
                "uniqueId": "1",
                "conditionId": "1",
                "column": "requestStatus",
                "dataType": "text",
                "operator": "contains",
                "group": "1",
                "value": "Soft Closed-Solution",
                "caseSensitive": false,
                "logicOperator": "AND"
            },
            {
                "uniqueId": "2",
                "conditionId": "2",
                "column": "requestStatus",
                "dataType": "text",
                "operator": "less_than_ago",
                "group": "1",
                "value": "6",
                "caseSensitive": false
            }
        ],
        "logicalExpression": "(Condition 1 AND Condition 2)",
        "groupLogic": {
            "1_2": "OR"
        },
        "logicOperators": ["AND"],
        "styling": {
            "backgroundColor": "#4caf50",
            "textColor": "#ffffff",
            "fontWeight": "normal",
            "icon": "⭐",
            "iconPosition": "left",
            "customIcon": ""
        }
    },
    {
        "id": "status_soft_closed_warning",
        "name": "🟠 Soft Closed (Warning)",
        "enabled": true,
        "priority": 16,
        "columnToColor": "requestStatus",
        "column": "requestStatus",
        "dataType": "text",
        "conditions": [
            {
                "uniqueId": "1",
                "conditionId": "1",
                "column": "requestStatus",
                "dataType": "text",
                "operator": "contains",
                "group": "1",
                "value": "Soft Closed-Solution",
                "caseSensitive": false,
                "logicOperator": "AND"
            },
            {
                "uniqueId": "2",
                "conditionId": "2",
                "column": "requestStatus",
                "dataType": "text",
                "operator": "more_than_ago",
                "group": "1",
                "value": "6",
                "caseSensitive": false,
                "logicOperator": "AND"
            },
            {
                "uniqueId": "3",
                "conditionId": "3",
                "column": "requestStatus",
                "dataType": "text",
                "operator": "less_than_ago",
                "group": "1",
                "value": "7",
                "caseSensitive": false
            }
        ],
        "logicalExpression": "(Condition 1 AND Condition 2 AND Condition 3)",
        "groupLogic": {
            "1_2": "OR"
        },
        "logicOperators": ["AND", "AND"],
        "styling": {
            "backgroundColor": "#ff9800",
            "textColor": "#ffffff",
            "fontWeight": "normal",
            "icon": "",
            "iconPosition": "left",
            "customIcon": ""
        }
    },
    {
        "id": "status_soft_closed_overdue",
        "name": "🔴 Soft Closed (Overdue)",
        "enabled": true,
        "priority": 17,
        "columnToColor": "requestStatus",
        "column": "requestStatus",
        "dataType": "text",
        "conditions": [
            {
                "uniqueId": "1",
                "conditionId": "1",
                "column": "requestStatus",
                "dataType": "text",
                "operator": "contains",
                "group": "1",
                "value": "Soft Closed-Solution",
                "caseSensitive": false,
                "logicOperator": "AND"
            },
            {
                "uniqueId": "2",
                "conditionId": "2",
                "column": "requestStatus",
                "dataType": "text",
                "operator": "more_than_ago",
                "group": "1",
                "value": "7",
                "caseSensitive": false
            }
        ],
        "logicalExpression": "(Condition 1 AND Condition 2)",
        "groupLogic": {
            "1_2": "OR"
        },
        "logicOperators": ["AND"],
        "styling": {
            "backgroundColor": "#f44336",
            "textColor": "#ffffff",
            "fontWeight": "bold",
            "icon": "",
            "iconPosition": "left",
            "customIcon": ""
        }
    },
    {
        "id": "origin_partner",
        "name": "🟡 Partner Case",
        "enabled": true,
        "priority": 18,
        "columnToColor": "sourceDesc",
        "column": "sourceDesc",
        "dataType": "text",
        "conditions": [
            {
                "uniqueId": "1",
                "conditionId": "1",
                "column": "sourceDesc",
                "dataType": "text",
                "operator": "equals",
                "group": "1",
                "value": "Partner",
                "caseSensitive": false
            }
        ],
        "logicalExpression": "Condition 1",
        "groupLogic": {
            "1_2": "OR"
        },
        "logicOperators": [],
        "styling": {
            "backgroundColor": "#ffeb3b",
            "textColor": "#000000",
            "fontWeight": "normal",
            "icon": "",
            "iconPosition": "left",
            "customIcon": ""
        }
    },
    {
        "id": "age_no_se_engage",
        "name": "🟠 Old Case without SE Engagement",
        "enabled": true,
        "priority": 19,
        "columnToColor": "Age",
        "column": "createdOn",
        "dataType": "datetime",
        "conditions": [
            {
                "uniqueId": "1",
                "conditionId": "1",
                "column": "createdOn",
                "dataType": "datetime",
                "operator": "more_than_ago",
                "group": "1",
                "value": "30",
                "unit": "days",
                "logicOperator": "AND"
            },
            {
                "uniqueId": "2",
                "conditionId": "2",
                "column": "externalDefectCreated",
                "dataType": "boolean",
                "operator": "is_false",
                "group": "1"
            }
        ],
        "logicalExpression": "(Condition 1 AND Condition 2)",
        "groupLogic": {
            "1_2": "OR"
        },
        "logicOperators": ["AND"],
        "styling": {
            "backgroundColor": "#ff9800",
            "textColor": "#ffffff",
            "fontWeight": "normal",
            "icon": "",
            "iconPosition": "left",
            "customIcon": ""
        }
    }
];
