using Newtonsoft.Json;

namespace container_relocate.Util
{
    /// <summary>
    /// JSend is a specification for a simple, no-frills, JSON based format for application-level communication.
    /// </summary>
    public static class JSend
    {
        /// <summary>
        /// All went well, and (usually) some data was returned.
        /// </summary>
        /// <param name="data">Acts as the wrapper for any data returned by the API call.
        /// If the call returns no data (as in the last example), data should be set to null.</param>
        /// <returns>A basic JSend-compliant success response</returns>
        public static string Success(object data)
        {
            return $"{{\"status\":\"success\",\"data\":{JsonConvert.SerializeObject(data)}}}";
        }

        /// <summary>
        /// There was a problem with the data submitted, or some pre-condition of the API call wasn't satisfied
        /// </summary>
        /// <param name="data">Provides the wrapper for the details of why the request failed.  If the reasons for
        /// failure correspond to POST values, the response object's keys SHOULD correspond to those POST values.</param>
        /// <returns>A basic JSend-compliant fail response</returns>
        public static string Fail(object data)
        {
            return $"{{\"status\":\"fail\",\"data\":{JsonConvert.SerializeObject(data)}}}";
        }

        /// <summary>
        /// An error occurred in processing the request, i.e. an exception was thrown	
        /// </summary>
        /// <param name="message">A meaningful, end-user-readable (or at the least log-worthy) message, 
        /// explaining what went wrong.</param>
        /// <returns>A basic JSend-compliant error response</returns>
        public static string Error(string message)
        {
            return $"{{\"status\":\"error\",\"message\":\"{message}\"}}";
        }
    }
}