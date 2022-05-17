export type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiResponse<T> {
  statusCode: number;
  responseObj?: T;
  error?: string;
}
const isError = (error: unknown): error is Error => error instanceof Error;

export class BaseService {
  /**
   * Function to call and parse external API
   *
   * @protected
   * @template
   * @param {string} baseUrl - base URL for API
   * @param {string} route - API route
   * @param {RequestMethod} method - Calling method
   * @param {Record} headers - Request headers
   * @param {URLSearchParams} [urlParams] - Query parameters to pass in API
   * @param {Record<string, unknown>} [requestData] - body parameters to pass in API
   * @param {boolean} [skipReadingResponseBody] - is response body required to be skipped (in case of getting 204 or 200 with no response)
   * @param {boolean} [isText] - is type of response body text?
   * @returns {Promise<T>} - Promise with defined datatype
   * @memberof BaseService
   */
  protected async callApi<T>(
    baseUrl: string,
    route: string,
    method: RequestMethod,
    headers: Record<string, string>,
    urlParams?: URLSearchParams,
    // TODO: fix this type
    /* remember to remove this one above too: eslint-disable @typescript-eslint/explicit-module-boundary-types */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestData?: any,
    skipReadingResponseBody?: boolean,
    isText?: boolean
  ): Promise<T> {
    try {
      let body: string | undefined;
      const url = `${baseUrl}/${route}${
        urlParams ? `?${urlParams.toString()}` : ""
      }`;

      if (requestData) {
        if (method === "GET") {
          return await this.response({
            statusCode: 500,
            error: "Invalid request, GET requests cannot have a body",
          });
        }
        // eslint-disable-next-line no-param-reassign
        headers["Content-Type"] =
          method === "PATCH"
            ? "application/json-patch+json"
            : "application/json";
        body = JSON.stringify(requestData);
      }

      const res = await fetch(url, {
        method,
        headers,
        body,
      });
      if (res.ok) {
        try {
          if (skipReadingResponseBody) {
            return await this.response({
              statusCode: res.status,
            });
          }
          if (isText) {
            const resData = (await res.text()) as unknown as T;
            return await this.response({
              statusCode: res.status,
              responseObj: resData,
            });
          }

          // if api returns no content
          if (res.status === 204) {
            return await this.response({
              statusCode: res.status,
            });
          }

          const resData = (await res.json()) as T;
          return await this.response({
            statusCode: res.status,
            responseObj: resData,
          });
        } catch (err) {
          return this.response({
            statusCode: res.status,
            error: "failed to parse response returned by server",
          });
        }
      } else {
        return await this.response({
          statusCode: res.status,
          error: `${res.status} - ${res.statusText || "failed to call api"}`,
        });
      }
    } catch (err) {
      let errorMessage = "failed to call api";
      if (isError(err)) {
        errorMessage = `${errorMessage} - ${err.message}`;
      }
      return this.response({
        statusCode: 500,
        error: errorMessage,
      });
    }
  }

  /**
   * Function to manage promises returns from API calling
   *
   * @protected
   * @template T
   * @param {ApiResponse<T>} response
   * @returns {Promise<T>}
   * @memberof BaseService
   */
  // eslint-disable-next-line class-methods-use-this
  protected response<T>(response: ApiResponse<T>): Promise<T> {
    if (response.statusCode === 401) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        statusCode: response.statusCode,
        error: "Session is expired, please refresh you page",
      });
    }
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return Promise.resolve(response.responseObj as T);
    }
    if (response.responseObj) {
      return Promise.resolve(response.responseObj);
    }
    return Promise.reject(response);
  }
}
