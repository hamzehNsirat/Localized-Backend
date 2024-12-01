module.exports = {
  E0001: {
    errorDescription: "Invalid Input",
    statusCode: 400,
    message: "The provided input is invalid.",
    errorCode: "E0001",
  },
  E0002: {
    errorDescription: "Authentication Failed",
    statusCode: 401,
    message: "Invalid username or password.",
    errorCode: "E0002",
  },
  E0003: {
    errorDescription: "Resource Not Found",
    statusCode: 404,
    message: "The requested resource does not exist.",
    errorCode: "E0003",
  },
  E0004: {
    errorDescription: "Internal Server Error",
    statusCode: 500,
    message: "An unexpected error occurred. Please try again later.",
    errorCode: "E0004",
  },
  E0005: {
    errorDescription: "Missing User Type",
    statusCode: 400,
    message: "User Type is required for this operation.",
    errorCode: "E0005",
  },
  E0006: {
    errorDescription: "Operation Failure",
    statusCode: 400,
    message: "Sign up operation has failed.",
    errorCode: "E0006",
  },
  E0007: {
    errorDescription: "Missing Data",
    statusCode: 400,
    message: "Username or Userpassword is missing.",
    errorCode: "E0007",
  },
  E0008: {
    errorDescription: "Operation Failure",
    statusCode: 400,
    message: "Sign in operation has failed.",
    errorCode: "E0008",
  },
  E0009: {
    errorDescription: "Operation Failure",
    statusCode: 400,
    message: "Error Signing out.",
    errorCode: "E0009",
  },
  E0010: {
    errorDescription: "Operation Failure",
    statusCode: 400,
    message: "Error Getting User Data.",
    errorCode: "E0010",
  },
  E0011: {
    errorDescription: "No Data",
    statusCode: 400,
    message: "No Data for this User was found",
    errorCode: "E0011",
  },
  E0012: {
    errorDescription: "Update Failure",
    statusCode: 400,
    message: "Updating User Data has failed",
    errorCode: "E0012",
  },
  E0013: {
    errorDescription: "Missing Data",
    statusCode: 400,
    message: "PageIndex and PageSize are Mandatory",
    errorCode: "E0013",
  },
  E0014: {
    errorDescription: "Fetch Failure",
    statusCode: 400,
    message: "Fetching User Data has failed",
    errorCode: "E0014",
  },
  E0013: {
    errorDescription: "Missing Data",
    statusCode: 400,
    message: "UserStatus is Mandatory",
    errorCode: "E0015",
  },
  E0014: {
    errorDescription: "Review Failure",
    statusCode: 400,
    message: "Reviewing User has failed",
    errorCode: "E0016",
  },
  E0013: {
    errorDescription: "Missing Data",
    statusCode: 400,
    message: "UserId is Mandatory",
    errorCode: "E0017",
  },
  E0014: {
    errorDescription: "Review Failure",
    statusCode: 400,
    message: "Deleting User has failed",
    errorCode: "E0018",
  },
  E0019: {
    errorDescription: "Submit Failure",
    statusCode: 400,
    message: "Submitting an Application has failed",
    errorCode: "E0019",
  },
  E0020: {
    errorDescription: "Missing Data",
    statusCode: 400,
    message: "Username is Mandatory for this Operation",
    errorCode: "E0020",
  },
  E0021: {
    errorDescription: "Check Failure",
    statusCode: 400,
    message: "Checking username Availability failed",
    errorCode: "E0021",
  },
  E0022: {
    errorDescription: "Missing Data",
    statusCode: 400,
    message: "Username or Email is Mandatory for this Operation",
    errorCode: "E0022",
  },
  E0023: {
    errorDescription: "Check Failure",
    statusCode: 400,
    message: "Checking Application Status failed",
    errorCode: "E0023",
  },
  E0023: {
    errorDescription: "Missing Data",
    statusCode: 400,
    message: "PageIndex must be bigger than 0, PageSize must exist",
    errorCode: "E0023",
  },
  E0024: {
    errorDescription: "Fetch Failure",
    statusCode: 400,
    message: "Fetching Applications failed",
    errorCode: "E0024",
  },
  E0025: {
    errorDescription: "Missing Data",
    statusCode: 400,
    message: "Application ID is Missing or Invalid",
    errorCode: "E0025",
  },
  E0026: {
    errorDescription: "Fetch Failure",
    statusCode: 400,
    message: "Fetching Application Data failed",
    errorCode: "E0026",
  },
  E0027: {
    errorDescription: "Missing Data",
    statusCode: 400,
    message: "Application ID and Status are Mandatory",
    errorCode: "E0027",
  },
  E0028: {
    errorDescription: "Update Failure",
    statusCode: 400,
    message: "Updating Application Status failed",
    errorCode: "E0028",
  },
  E0029: {
    errorDescription: "Missing Data",
    statusCode: 400,
    message: "Email is Mandatory",
    errorCode: "E0029",
  },
  E0030: {
    errorDescription: "Reset Failure",
    statusCode: 400,
    message: "Requesting Reset Password failed",
    errorCode: "E0030",
  },
  E0031: {
    errorDescription: "Missing Data",
    statusCode: 400,
    message: "newPassword and resetToken are Mandatory",
    errorCode: "E0031",
  },
  E0032: {
    errorDescription: "Reset Failure",
    statusCode: 400,
    message: "Resetting Password failed",
    errorCode: "E0032",
  },
  TOKEN_EXPIRED: {
    errorDescription: "Authentication Failure",
    statusCode: 400,
    message: "token is expired.",
    errorCode: "TOKEN_EXPIRED",
  },
  TOKEN_MISSING: {
    errorDescription: "Authentication Failure",
    statusCode: 400,
    message: "token is missing.",
    errorCode: "TOKEN_MISSING",
  },
  DEFAULT_ERROR: {
    errorDescription: "Unknown Error",
    statusCode: 500,
    message: "An unknown error occurred.",
    errorCode: "9999",
  },
};
